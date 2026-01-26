"use client";

import { use } from "react";
import ArticleForm from "@/components/cms/artikel/ArticleForm";
import {
  useGetContentByIdQuery,
  useUpdateContentMutation,
} from "@/redux/api/sublimeApi";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function ArticleEdit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  // Fetch article data
  const { data: contentData, isLoading: isFetching } =
    useGetContentByIdQuery(id);
  const [updateContent, { isLoading: isUpdating }] = useUpdateContentMutation();

  const handleSubmit = async (data: any) => {
    try {
      await updateContent({
        id,
        ...data,
        type: "article", // Ensure type is preserved
      }).unwrap();
      toast.success("Artikel berhasil diperbarui!");
      router.push("/cms/artikel");
    } catch (error: any) {
      toast.error(error?.data?.message || "Gagal memperbarui artikel");
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-8 w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Artikel</h1>
        <p className="text-gray-500 mt-1">Perbarui konten artikel</p>
      </div>

      <ArticleForm
        title="Form Edit Artikel"
        initialData={contentData?.data}
        onSubmit={handleSubmit}
        isLoading={isUpdating}
      />
    </div>
  );
}
