"use client";

import { useState, useEffect } from "react";
import ContentManagement from "@/components/cms/ContentManagement";
import Modal from "@/components/ui/Modal";
import { useRouter } from "next/navigation";
import {
  useGetAdminContentsQuery,
  useToggleContentPublishMutation,
  useDeleteContentMutation,
} from "@/redux/api/sublimeApi";

const defaultImgSrc =
  "https://i.pinimg.com/564x/39/2a/26/392a261b73dbcd361a0dac2e93a05284.jpg";

const breadcrumbs = [
  {
    title: "Home",
    href: "/cms",
  },
  {
    title: "Artikel",
    href: "/cms/artikel",
  },
];

export default function CmsArticlePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isPosted, setIsPosted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  // Modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch articles (type='article') using RTK Query
  const {
    data: contentsData,
    isLoading,
    refetch,
  } = useGetAdminContentsQuery({
    type: "article",
    limit: 50,
    search: debouncedSearch,
  });

  const [togglePublish] = useToggleContentPublishMutation();
  const [deleteContent] = useDeleteContentMutation();

  const content =
    contentsData?.data?.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description || item.slug,
      category: item.category || "-",
      imgSrc: item.cover_image_url || defaultImgSrc,
      isCurrent: item.status === "published" || item.is_published,
      status: item.status || (item.is_published ? "published" : "draft"),
    })) || [];

  const handlePost = async (id: string) => {
    // Action disabled as per request
  };

  const handleDelete = (id: string) => {
    setItemToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      await deleteContent(itemToDelete).unwrap();
      setIsDeleted(true);
      setTimeout(() => setIsDeleted(false), 3000);
    } catch (err) {
      console.error("Failed to delete content:", err);
      alert("Delete failed");
    } finally {
      setDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleAdd = () => {
    router.push("/cms/artikel/add");
  };

  const handleEdit = (id: string) => {
    router.push(`/cms/artikel/${id}/edit`);
  };

  const handleView = (id: string) => {
    // Navigate to actual article public page for now
    router.push(`/dashboard/artikel/${id}`);
  };

  return (
    <div className="">
      {/* Enhanced Page Header */}
      <div className="px-10 py-8 bg-gradient-to-br from-white via-gray-50/30 to-[#1CA09A]/5 border-b border-gray-200">
        <div className="flex justify-between items-center gap-4">
          <div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">Artikel</h1>
              <p className="text-gray-600 text-base">
                Kelola artikel dan konten edukasi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Cari artikel..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1CA09A]/20 focus:border-[#1CA09A] outline-none w-[300px]"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <button
              onClick={handleAdd}
              className="group flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#1CA09A] to-[#178F87] text-white hover:shadow-md hover:scale-105 transition-all duration-200 shadow-md whitespace-nowrap"
            >
              <svg
                className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Tambah Artikel
            </button>
          </div>
        </div>
      </div>
      <div className="px-10">
        {isLoading ? (
          <div className="py-10 text-center">Loading Data...</div>
        ) : (
          <ContentManagement
            handlePostTemplate={handlePost}
            handleDeleteTemplate={handleDelete}
            handleAddTemplate={handleAdd}
            handleEditTemplate={handleEdit}
            handleViewTemplate={handleView}
            contents={content}
            breadcrumbs={breadcrumbs}
            showPostAction={false}
          />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Hapus Artikel"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak
            dapat dibatalkan.
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
            >
              Batal
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors font-medium"
            >
              Hapus
            </button>
          </div>
        </div>
      </Modal>

      {/* Simple Alerts */}
      {isPosted && (
        <div className="fixed bottom-10 right-10 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50 shadow-lg">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Status updated successfully.</span>
        </div>
      )}
      {isDeleted && (
        <div className="fixed bottom-10 right-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50 shadow-lg">
          <strong className="font-bold">Deleted!</strong>
          <span className="block sm:inline">
            {" "}
            Article deleted successfully.
          </span>
        </div>
      )}
    </div>
  );
}
