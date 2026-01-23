"use client";

import ContentEditorArticle from "@/components/cms/ContentEditorArticle";
import { use, useEffect, useState } from "react";
import {
  useGetContentByIdQuery,
  useUpdateContentMutation,
  useToggleContentPublishMutation,
} from "@/redux/api/sublimeApi";

const breadcrumbs = [
  {
    title: "Home",
    href: "/cms",
  },
  {
    title: "Artikel",
    href: "/cms/artikel",
  },
  {
    title: "Edit Content",
    href: "#",
  },
];

export default function ArticleEdit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // RTK Query hooks
  const {
    data: contentData,
    isLoading: isLoadingContent,
    refetch,
  } = useGetContentByIdQuery(id);
  const [updateContent, { isLoading: isUpdating }] = useUpdateContentMutation();
  const [togglePublish] = useToggleContentPublishMutation();

  const [data, setData] = useState({
    title: "",
    referenceLink: "",
    description: "",
    imageUrl: "",
    tags: [] as { id: string; name: string }[],
    publish_date: "",
    file_upload: [] as any[],
    status: "draft",
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const [isPosted, setIsPosted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<any>(null);

  const isFormValid = () => {
    // Basic validation
    return !!data.title && !!data.publish_date;
  };

  useEffect(() => {
    setIsValid(isFormValid());
  }, [data]);

  // Load data into state when fetched
  useEffect(() => {
    if (contentData?.data) {
      const currentItem = contentData.data;
      setData({
        title: currentItem.title || "",
        referenceLink: currentItem.metadata?.reference_link || "",
        description: currentItem.description || "",
        imageUrl: currentItem.thumbnail_url || "",
        tags:
          currentItem.tags?.map((tag: string) => ({ id: tag, name: tag })) ||
          [],
        publish_date:
          currentItem.metadata?.publish_date || new Date().toISOString(), // Fallback
        file_upload: [], // Handle additional files if schema has them
        status: currentItem.status || "draft",
      });
    }
  }, [contentData]);

  const handleChange = (key: string, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveTemplate = async () => {
    if (!confirm("Do you want to save the changes?")) return;

    try {
      await updateContent({
        id,
        title: data.title,
        description: data.description,
        thumbnail_url: data.imageUrl,
        metadata: {
          reference_link: data.referenceLink,
          publish_date: data.publish_date,
        },
        tags: data.tags.map((t) => t.name),
      }).unwrap();
      setIsUpdate(true);
      setTimeout(() => setIsUpdate(false), 3000);
      refetch();
    } catch (err) {
      console.error("Failed to update", err);
      setError({
        title: "Update Failed",
        description: "Could not save changes.",
      });
      setTimeout(() => setError(null), 3000);
    }
  };

  const handlePostTemplate = async () => {
    if (
      !confirm(
        `Do you want to ${data.status === "published" ? "unpost" : "post"} this article?`,
      )
    )
      return;

    try {
      await togglePublish(id).unwrap();
      setIsPosted(true);
      setTimeout(() => setIsPosted(false), 3000);
      refetch();
    } catch (err) {
      console.error("Failed to toggle publish", err);
      setError({
        title: "Action Failed",
        description: "Could not change publish status.",
      });
      setTimeout(() => setError(null), 3000);
    }
  };

  if (isLoadingContent)
    return <div className="p-10 text-center">Loading Content...</div>;

  return (
    <>
      <ContentEditorArticle
        payload={data}
        handleChange={handleChange}
        onSave={handleSaveTemplate}
        onPost={handlePostTemplate}
        type={"edit"}
        breadcrumbs={breadcrumbs}
        isFormValid={isValid}
        showImageUpload={true}
        showAdditionalFiles={false}
        showTags={false}
        showReferenceLink={true}
        descriptionLabel={"Konten Artikel"}
      />
      {isUpdate && (
        <div className="fixed bottom-10 right-10 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded z-50 shadow-lg">
          <strong>Updated!</strong> Changes saved.
        </div>
      )}
      {isPosted && (
        <div className="fixed bottom-10 right-10 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50 shadow-lg">
          <strong>Success!</strong> Status updated.
        </div>
      )}
      {error && (
        <div className="fixed bottom-10 right-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50 shadow-lg">
          <strong>Error:</strong> {error.description}
        </div>
      )}
    </>
  );
}
