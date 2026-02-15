"use client";

import ArticleForm from "@/components/cms/artikel/ArticleForm";
import { useCreateContentMutation } from "@/redux/api/sublimeApi";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function ArticleAdd() {
  const router = useRouter();
  const [createContent, { isLoading }] = useCreateContentMutation();

  type CreateArticlePayload = {
    title: string;
    excerpt: string;
    body: string;
    type: "article";
    category: string;
    cover_image_url?: string;
    tags?: string[];
    is_published: boolean;
    is_featured: boolean;
    seo_title?: string;
    seo_description?: string;
  };

  const handleSubmit = async (data: CreateArticlePayload) => {
    try {
      await createContent({ ...data, type: "article" }).unwrap();
      toast.success("Artikel berhasil ditambahkan!");
      router.push("/cms/artikel");
    } catch (error: unknown) {
      let message = "Gagal menambahkan artikel";
      if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as { data?: unknown }).data === "object" &&
        (error as { data?: { message?: unknown } }).data?.message &&
        typeof (error as { data: { message: unknown } }).data.message ===
          "string"
      ) {
        message = (error as { data: { message: string } }).data.message;
      }
      toast.error(message);
    }
  };

  return (
    <div className="p-8 w-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Tambah Artikel Baru
          </h1>
          <p className="text-gray-500 mt-1">
            Tambahkan konten artikel edukasi baru
          </p>
        </div>
      </div>

      <ArticleForm
        title="Form Artikel Baru"
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
