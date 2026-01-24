"use client";

import { useState } from "react";
import ContentManagement from "@/components/cms/ContentManagement";
import { useRouter } from "next/navigation";
import {
  useGetAdminAudiosQuery,
  useToggleAudioPublishMutation,
  useDeleteAudioMutation,
} from "@/redux/api/sublimeApi";

const defaultImgSrc =
  "https://i.pinimg.com/564x/39/2a/26/392a261b73dbcd361a0dac2e93a05284.jpg";

const breadcrumbs = [
  {
    title: "Home",
    href: "/cms",
  },
  {
    title: "Audio",
    href: "/cms/audio",
  },
];

export default function CmsAudioPage() {
  const router = useRouter();
  const [isPosted, setIsPosted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  // Fetch audios using RTK Query
  const {
    data: contentsData,
    isLoading,
    refetch,
  } = useGetAdminAudiosQuery({
    limit: 1000,
  });

  const [togglePublish] = useToggleAudioPublishMutation();
  const [deleteAudio] = useDeleteAudioMutation();

  const content =
    contentsData?.data?.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description || item.slug,
      imgSrc: item.thumbnail_url || defaultImgSrc,
      isCurrent: item.status === "published", // Assuming 'published' is the status for active/public
      status: item.status,
      // Additional fields if ContentManagement supports them
    })) || [];

  const handlePost = async (id: string) => {
    const item = content.find((i: any) => i.id === id);
    const isCurrentlyPosted = item?.isCurrent;

    if (
      confirm(
        isCurrentlyPosted ? "Unpublish this audio?" : "Publish this audio?",
      )
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
    if (confirm("Are you sure you want to delete this audio?")) {
      try {
        await deleteAudio(id).unwrap();
        setIsDeleted(true);
        setTimeout(() => setIsDeleted(false), 3000);
      } catch (err) {
        console.error("Failed to delete content:", err);
        alert("Delete failed");
      }
    }
  };

  const handleAdd = () => {
    router.push("/cms/audio/add");
  };

  const handleEdit = (id: string) => {
    router.push(`/cms/audio/${id}/edit`);
  };

  const handleView = (id: string) => {
    // Navigate to actual audio page or preview
    router.push(`/dashboard/audio/${id}`);
  };

  return (
    <div className="">
      {/* Enhanced Page Header */}
      <div className="px-10 py-8 bg-gradient-to-br from-white via-gray-50/30 to-[#1CA09A]/5 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">
                Audio Management
              </h1>
              <p className="text-gray-600 text-base">
                Kelola konten audio dan track
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
            Tambah Audio
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
          <span className="block sm:inline"> Audio deleted successfully.</span>
        </div>
      )}
    </div>
  );
}
