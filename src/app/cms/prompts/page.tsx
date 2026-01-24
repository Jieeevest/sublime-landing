"use client";

import { useState } from "react";
import ContentManagement from "@/components/cms/ContentManagement";
import { useRouter } from "next/navigation";
import {
  useGetPromptsQuery,
  useDeletePromptMutation,
} from "@/redux/api/sublimeApi";

const defaultImgSrc = "https://placehold.co/600x400?text=Prompt";

const breadcrumbs = [
  { title: "Home", href: "/cms" },
  { title: "Prompts", href: "/cms/prompts" },
];

export default function CmsPromptsPage() {
  const router = useRouter();
  const [isDeleted, setIsDeleted] = useState(false);

  const {
    data: promptsData,
    isLoading,
    refetch,
  } = useGetPromptsQuery({
    limit: 1000,
  });

  const [deletePrompt] = useDeletePromptMutation();

  // Mapping Prompts to ContentManagement format
  // Note: ContentManagement might expect 'imgSrc', so we provide a placeholder if prompts don't have images
  const content =
    promptsData?.data?.map((item: any) => ({
      id: item.id,
      title: item.title || item.name || "Untitled Prompt",
      description: item.content
        ? item.content.substring(0, 100) + "..."
        : "No content",
      imgSrc: defaultImgSrc,
      isCurrent: true, // Prompts usually don't have 'publish' status same as articles, assuming always active
      status: "active",
    })) || [];

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this prompt?")) {
      try {
        await deletePrompt(id).unwrap();
        setIsDeleted(true);
        setTimeout(() => setIsDeleted(false), 3000);
      } catch (err) {
        console.error("Failed to delete prompt:", err);
        alert("Delete failed");
      }
    }
  };

  const handleAdd = () => {
    router.push("/cms/prompts/add");
  };

  const handleEdit = (id: string) => {
    router.push(`/cms/prompts/${id}/edit`);
  };

  // Prompts might not be viewable on frontend in same way, so maybe just edit?
  const handleView = (id: string) => {
    handleEdit(id);
  };

  // Dummy handlePost since prompts might not use toggle publish in same way, or unimplemented
  const handlePost = async (id: string) => {
    console.log("Toggle publish prompt not implemented", id);
  };

  return (
    <div className="">
      <div className="px-10 py-8 bg-gradient-to-br from-white via-gray-50/30 to-[#1CA09A]/5 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              Prompt / Knowledge Base
            </h1>
            <p className="text-gray-600 text-base">
              Kelola prompt dan knowledge base AI
            </p>
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
            Tambah Prompt
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

      {isDeleted && (
        <div className="fixed bottom-10 right-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50 shadow-lg">
          <strong className="font-bold">Deleted!</strong>
          <span className="block sm:inline"> Prompt deleted successfully.</span>
        </div>
      )}
    </div>
  );
}
