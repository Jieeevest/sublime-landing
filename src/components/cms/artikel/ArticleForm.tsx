"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useUploadThumbnailMutation,
  useGetContentCategoriesQuery,
} from "@/redux/api/sublimeApi";
import { toast } from "react-hot-toast";

interface ArticleFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
  title: string;
}

export default function ArticleForm({
  initialData,
  onSubmit,
  isLoading,
  title,
}: ArticleFormProps) {
  const router = useRouter();
  const [uploadThumbnail] = useUploadThumbnailMutation();
  const { data: categoriesData } = useGetContentCategoriesQuery(undefined);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    body: "",
    category: "",
    cover_image_url: "",
    tags: "", // Managing as comma-separated string for input
    is_published: true,
    is_featured: false,
    seo_title: "",
    seo_description: "",
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        excerpt: initialData.excerpt || "",
        body: initialData.body || "",
        category: initialData.category?.name || initialData.category || "",
        cover_image_url:
          initialData.cover_image_url ||
          initialData.thumbnail_url ||
          initialData.cover_image ||
          "",
        tags: Array.isArray(initialData.tags)
          ? initialData.tags.join(", ")
          : "",
        is_published: initialData.is_published ?? true,
        is_featured: initialData.is_featured ?? false,
        seo_title: initialData.seo_title || "",
        seo_description: initialData.seo_description || "",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let currentCoverUrl = formData.cover_image_url;

      // Upload Thumbnail if changed
      if (thumbnailFile) {
        const thumbFormData = new FormData();
        thumbFormData.append("file", thumbnailFile);
        const thumbRes = await uploadThumbnail(thumbFormData).unwrap();
        currentCoverUrl = thumbRes.data.thumbnail_url;
      }

      // Format tags
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const payload = {
        title: formData.title,
        excerpt: formData.excerpt,
        body: formData.body,
        type: "article",
        category: formData.category,
        cover_image_url: currentCoverUrl,
        tags: tagsArray,
        is_published: formData.is_published,
        is_featured: formData.is_featured,
        seo_title: formData.seo_title,
        seo_description: formData.seo_description,
      };

      await onSubmit(payload);
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast.error(
        error?.data?.message || "Terjadi kesalahan saat menyimpan article",
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">{title}</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Judul Artikel
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              placeholder="Judul Artikel..."
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Kategori
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white"
            >
              <option value="">Pilih Kategori</option>
              <option value="General">General</option>
              <option value="Health">Health</option>
              <option value="Tips">Tips</option>
              <option value="Technology">Technology</option>
              <option value="Education">Education</option>

              {categoriesData?.data?.map((cat: any, index: number) => {
                const catName =
                  typeof cat === "string"
                    ? cat
                    : cat.name || cat.title || cat.label || "Unknown";

                const catKey =
                  typeof cat === "object" && cat.id ? cat.id : index;

                // Avoid duplicates if API returns same as static
                if (
                  [
                    "General",
                    "Health",
                    "Tips",
                    "Technology",
                    "Education",
                  ].includes(catName)
                )
                  return null;

                return (
                  <option key={catKey} value={catName}>
                    {catName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Excerpt */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Excerpt (Ringkasan Singkat)
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows={3}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
            placeholder="Ringkasan singkat artikel..."
          />
        </div>

        {/* Body */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Konten Artikel (Body)
          </label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            rows={15}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none font-mono text-sm"
            placeholder="Tulis konten artikel di sini (Markdown atau HTML support)..."
          />
        </div>

        {/* Cover Image */}
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Cover Image
            </label>
            <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary hover:file:bg-primary-100"
              />
              {formData.cover_image_url && !thumbnailFile && (
                <div className="mt-2">
                  <img
                    src={formData.cover_image_url}
                    alt="Current cover"
                    className="h-32 w-auto object-cover rounded"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Tags (Pisahkan dengan koma)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            placeholder="Contoh: kesehatan, mental, tips"
          />
        </div>

        {/* SEO Section */}
        <div className="border-t border-gray-200 pt-6 mt-2">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Pengaturan SEO
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                SEO Title
              </label>
              <input
                type="text"
                name="seo_title"
                value={formData.seo_title}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                placeholder="Judul untuk mesin pencari"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                SEO Description
              </label>
              <textarea
                name="seo_description"
                value={formData.seo_description}
                onChange={handleChange}
                rows={2}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                placeholder="Deskripsi untuk meta tag..."
              />
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-8 pt-2">
          {/* Featured Toggle */}
          <div className="flex items-center gap-3">
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full border border-gray-200">
              <input
                type="checkbox"
                name="is_featured"
                id="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
                className="absolute w-6 h-6 opacity-0 z-10 cursor-pointer"
              />
              <label
                htmlFor="is_featured"
                className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${formData.is_featured ? "bg-yellow-400" : "bg-gray-200"}`}
              ></label>
              <div
                className={`absolute left-0 top-0 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform transform ${formData.is_featured ? "translate-x-full border-yellow-400" : ""}`}
              ></div>
            </div>
            <label
              htmlFor="is_featured"
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              Featured Article
            </label>
          </div>

          {/* Published Toggle */}
          <div className="flex items-center gap-3">
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full border border-gray-200">
              <input
                type="checkbox"
                name="is_published"
                id="is_published"
                checked={formData.is_published}
                onChange={handleChange}
                className="absolute w-6 h-6 opacity-0 z-10 cursor-pointer"
              />
              <label
                htmlFor="is_published"
                className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${formData.is_published ? "bg-green-500" : "bg-gray-200"}`}
              ></label>
              <div
                className={`absolute left-0 top-0 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform transform ${formData.is_published ? "translate-x-full border-green-500" : ""}`}
              ></div>
            </div>
            <label
              htmlFor="is_published"
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              Publish
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isLoading || isUploading}
            className="px-6 py-2.5 bg-primary text-white rounded-full font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {(isLoading || isUploading) && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            Simpan Artikel
          </button>
        </div>
      </form>
    </div>
  );
}
