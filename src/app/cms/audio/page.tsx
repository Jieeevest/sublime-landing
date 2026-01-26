"use client";

import { useState, useEffect } from "react";
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
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isPosted, setIsPosted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch audios using RTK Query
  const {
    data: contentsData,
    isLoading,
    refetch,
  } = useGetAdminAudiosQuery({
    limit: 50,
    search: debouncedSearch,
  });

  const [togglePublish] = useToggleAudioPublishMutation();
  const [deleteAudio] = useDeleteAudioMutation();

  const content =
    contentsData?.data?.map((item: any) => {
      const minutes = Math.floor(item.duration_seconds / 60);
      const seconds = item.duration_seconds % 60;
      const formattedDuration = `${minutes}:${seconds.toString().padStart(2, "0")}`;

      return {
        id: item.id,
        title: item.title,
        description: item.description || item.slug,
        category: item.category?.name || "-",
        duration: formattedDuration,
        imgSrc: item.thumbnail_url || defaultImgSrc,
        isCurrent: item.status === "published" || item.is_published,
        status: item.status || (item.is_published ? "published" : "draft"),
      };
    }) || [];

  // ... handlers ...
  const handlePost = async (id: string) => {
    // ... existing logic
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
    router.push(`/cms/audio/${id}`);
  };

  const handleView = (id: string) => {
    // Navigate to actual audio page or preview
    router.push(`/cms/audio/${id}/detail`);
  };

  return (
    <div className="">
      {/* Enhanced Page Header */}
      <div className="px-10 py-8 bg-gradient-to-br from-white via-gray-50/30 to-[#1CA09A]/5 border-b border-gray-200">
        <div className="flex justify-between items-center gap-4">
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

          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Cari audio..."
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
              Tambah Audio
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
