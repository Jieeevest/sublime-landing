"use client";

import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";

type Props = {
  value?: string;
  onChange: (html: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  minHeight?: number;
};

type QuillInstance = {
  root: HTMLElement;
  clipboard: { dangerouslyPasteHTML: (html: string) => void };
  on: (event: string, cb: () => void) => void;
};

export default function RichTextEditor({
  value = "",
  onChange,
  placeholder,
  readOnly = false,
  className,
  minHeight = 260,
}: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<QuillInstance | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const QuillModule = await import("quill");
      const modDefault = (QuillModule as { default?: unknown }).default;
      type QuillConstructor = new (
        el: Element,
        opts: Record<string, unknown>,
      ) => QuillInstance;
      const QuillCtor = (modDefault ??
        (QuillModule as unknown)) as QuillConstructor;
      if (!mounted || !editorRef.current) return;

      const toolbar: unknown[] = [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["link", "image", "video"],
        ["clean"],
      ];

      const options: Record<string, unknown> = {
        theme: "snow",
        readOnly,
        placeholder,
        modules: { toolbar },
      };

      quillRef.current = new QuillCtor(editorRef.current, options);

      if (value) {
        quillRef.current.clipboard.dangerouslyPasteHTML(value);
      }

      quillRef.current.on("text-change", () => {
        const html = quillRef.current!.root.innerHTML as string;
        onChange(html);
      });
    })();

    return () => {
      mounted = false;
      quillRef.current = null;
    };
  }, []);

  useEffect(() => {
    const q = quillRef.current;
    if (!q) return;
    const normalize = (html: string) =>
      html.replace(/<p><br><\/p>/g, "").trim();
    const current = normalize(q.root.innerHTML || "");
    const incoming = normalize(value || "");
    if (incoming !== current) {
      q.clipboard.dangerouslyPasteHTML(value || "");
    }
  }, [value]);

  return (
    <div className={className}>
      <div
        ref={editorRef}
        style={{ minHeight }}
        className="prose max-w-none text-gray-800"
      />
    </div>
  );
}
