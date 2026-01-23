"use client";

import ContentEditorArticle from "@/components/cms/ContentEditorArticle";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateContentMutation } from "@/redux/api/sublimeApi";

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
    title: "Add Content",
    href: "/cms/artikel/add",
  },
];

export default function ArticleAdd() {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
  const [createContent, { isLoading }] = useCreateContentMutation();

  const [data, setData] = useState({
    title: "",
    imageUrl: "",
    referenceLink: "",
    description: "",
    tags: [] as string[],
    publish_date: "",
    file_upload: [] as any[],
  });

  const isFormValid = () => {
    // Basic validation
    return !!data.title && !!data.publish_date;
  };

  useEffect(() => {
    setIsValid(isFormValid());
  }, [data]);

  const handleChange = (key: string, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveContent = async () => {
    try {
      const payload = {
        title: data.title,
        status: "published", // Default to published or draft as needed
        thumbnail_url: data.imageUrl,
        type: "article", // Important: set type to article
        // Mapping blurb/description
        description: data.description,
        // We might want a 'content' field too, assuming ContentEditorArticle provides 'description' for body
        // Reference link if API supports it in metadata or dedicated field
        metadata: {
          reference_link: data.referenceLink,
          publish_date: data.publish_date,
        },
        tags: data.tags,
      };

      await createContent(payload).unwrap();

      // Navigate back
      setTimeout(() => {
        router.push("/cms/artikel");
      }, 1000);
    } catch (error) {
      console.error("Failed to create article:", error);
      // Handle error (show toast etc)
    }
  };

  return (
    <>
      <ContentEditorArticle
        payload={data}
        handleChange={handleChange}
        onSave={handleSaveContent}
        type={"add"}
        breadcrumbs={breadcrumbs}
        isFormValid={isValid}
        showImageUpload={true}
        showAdditionalFiles={false}
        showTags={false} // Enable if you want tags
        showReferenceLink={true}
        descriptionLabel={"Konten Artikel"}
      />
    </>
  );
}
