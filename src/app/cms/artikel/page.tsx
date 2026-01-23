"use client";

import { useState } from "react";
import ContentManagement from "@/components/cms/ContentManagement";
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
  const [isPosted, setIsPosted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  // Fetch articles (type='article') using RTK Query
  const {
    data: contentsData,
    isLoading,
    refetch,
  } = useGetAdminContentsQuery({
    type: "article",
    limit: 1000,
  });

  const [togglePublish] = useToggleContentPublishMutation();
  const [deleteContent] = useDeleteContentMutation();

  // Note: Breadcrumbs Context usage removed to simplify dependency if context missing
  // useBreadcrumbs(breadcrumbs);

  const content =
    contentsData?.data?.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description || item.slug,
      imgSrc: item.thumbnail_url || defaultImgSrc,
      isCurrent: item.status === "published",
      status: item.status,
    })) || [];

  const handlePost = async (id: string) => {
    const item = content.find((i: any) => i.id === id);
    const isCurrentlyPosted = item?.isCurrent;

    if (
      confirm(isCurrentlyPosted ? "Unpost this article?" : "Post this article?")
    ) {
      try {
        await togglePublish(id).unwrap();
        setIsPosted(true);
        setTimeout(() => setIsPosted(false), 3000);
      } catch (err) {
        console.error("Failed to toggle status:", err);
        alert("Action failed");
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteContent(id).unwrap();
        setIsDeleted(true);
        setTimeout(() => setIsDeleted(false), 3000);
      } catch (err) {
        console.error("Failed to delete content:", err);
        alert("Delete failed");
      }
    }
  };

  const handleAdd = () => {
    router.push("/cms/artikel/add");
  };

  const handleEdit = (id: string) => {
    router.push(`/cms/artikel/${id}/edit`);
  };

  const handleView = (id: string) => {
    router.push(`/dashboard/artikel`);
  };

  return (
    <div className="">
      {/* Enhanced Page Header */}
      <div className="px-10 py-8 bg-gradient-to-br from-white via-gray-50/30 to-[#1CA09A]/5 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">Artikel</h1>
              <p className="text-gray-600 text-base">
                Kelola artikel dan konten edukasi
              </p>
            </div>
          </div>
          <button
            onClick={handleAdd}
            className="group flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#1CA09A] to-[#178F87] text-white hover:shadow-md hover:scale-105 transition-all duration-200 shadow-md"
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
          />
        )}
      </div>

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
