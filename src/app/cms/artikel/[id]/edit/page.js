"use client";
import ContentEditorArticle from "@/components/atoms/cms/ContentEditorArticle";
import CustomAlert from "@/components/atoms/cms/CustomAlert";
import fetchApi from "@/helpers/fetchApi";
import { ConfirmationDialog } from "@/helpers";
import { useContentDetail, useContents } from "@/hooks/cms/contents";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { formatErrorMessage, formatErrorTitle } from "@/utils/errorFormatter";

const breadcrumbs = [
  {
    title: "Home",
    href: "/cms/home-page",
  },
  {
    title: "Riset dan Inovasi",
    href: "/cms/home-page/riset-dan-inovasi",
  },
  {
    title: "Inovasi",
    href: "/cms/home-page/riset-dan-inovasi/inovasi",
  },
  {
    title: "Edit Content",
    href: "/cms/home-page/riset-dan-inovasi/inovasi/edit",
  },
];

export default function InovasiEdit() {
  const router = useParams();
  const { id } = router;
  const { contentsDetail, contentsDetailMutate } = useContentDetail(id);
  const { contentsMutate } = useContents("inovasi", "", 1, 10);
  const [data, setData] = useState({
    title: "",
    referenceLink: "",
    description: "",
    imageUrl: "",
    tags: [],
    publish_date: "",
    file_upload: [],
  });
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [isPosted, setIsPosted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(null);

  const isFormValid = () => {
    const mandatoryFields = ["title", "publish_date"];
    return mandatoryFields.every((field) => {
      const value = data?.[field];
      if (field === "publish_date") {
        if (!value) return false;
        if (typeof value === "string") return value.trim() !== "";
        return !isNaN(new Date(value).getTime());
      }
      return typeof value === "string" && value.trim() !== "";
    });
  };

  useEffect(() => {
    setIsValid(isFormValid());
  }, [data]);

  useEffect(() => {
    if (contentsDetail?.data) {
      const currentItem = contentsDetail?.data;
      setData({
        title: currentItem?.title,
        referenceLink: currentItem?.reference_link,
        description: currentItem?.description,
        imageUrl: currentItem?.file_upload || "",
        tags: currentItem?.tags?.map((tag) => ({ id: tag, name: tag })) || [],
        publish_date: currentItem?.publish_date || "",
        file_upload:
          currentItem?.additional_files?.map((url) => ({
            file_url: url,
            fileName: url.split("/").pop(),
          })) || [],
        status:
          currentItem?.status === "published" ? "published" : "unpublished",
      });
    }
  }, [contentsDetail]);

  useEffect(() => {
    setData({ ...data, id });
  }, [id]);

  const handleChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const handleConfirm = () => {
    if (confirmAction) {
      confirmAction();
    }
    setConfirmDialogOpen(false);
    setConfirmAction(null);
    setConfirmMessage("");
  };

  const handleSaveTemplate = async () => {
    setConfirmMessage("Do you want to save the changes to this content?");
    setConfirmAction(() => async () => {
      setConfirmDialogOpen(false);
      try {
        const response = await fetchApi(
          "PUT",
          process.env.NEXT_PUBLIC_API_URL_BACKEND + "/cms/contents",
          {
            id,
            title: data?.title || "",
            image_caption: data?.imageCaption || "",
            file_upload: data?.imageUrl || "",
            category: "inovasi",
            blurb: data?.blurb || "",
            description: data?.description || "",
            reference_link: data?.referenceLink || "",
            tags: data?.tags?.map((tag) => tag.name || tag) || [],
            publish_date: data?.publish_date || "",
            additional_files:
              data?.file_upload?.map(
                (file) => file.file_url || file.url || file.fileUrl || file
              ) || [],
          },
          { isHide: false, message: "Inovasi berhasil diupdate!" }
        );

        if (response && !response.is_error) {
          contentsDetailMutate();
          contentsMutate();
          setIsUpdate(true);
        } else {
          const statusCode = response?.statusCode || response?.status_code;
          setError({
            title: formatErrorTitle(statusCode, "update"),
            description: formatErrorMessage(response?.message, statusCode),
            statusCode: statusCode,
          });
        }
      } catch (err) {
        const statusCode = err?.status || err?.statusCode;
        setError({
          title: statusCode
            ? formatErrorTitle(statusCode, "update")
            : "Network Error",
          description: formatErrorMessage(err?.message, statusCode),
          statusCode: statusCode,
        });
      }
    });
    setConfirmDialogOpen(true);
  };

  const handlePostTemplate = async (id) => {
    setConfirmMessage(
      `Do you want to ${data?.status === "published" ? "unpost" : "post"} this content?`
    );
    setConfirmAction(() => async () => {
      setConfirmDialogOpen(false);
      try {
        const response = await fetchApi(
          "PUT",
          `${process.env.NEXT_PUBLIC_API_URL_BACKEND}/cms/contents/status/${id}`,
          {},
          {
            isHide: false,
            message:
              data?.status === "published"
                ? "Inovasi berhasil di-unpost!"
                : "Inovasi berhasil di-post!",
          }
        );

        if (response && !response.is_error) {
          contentsDetailMutate();
          setIsPosted(true);
        } else {
          const statusCode = response?.statusCode || response?.status_code;
          const action = data?.status === "published" ? "unpost" : "post";
          setError({
            title: formatErrorTitle(statusCode, action),
            description: formatErrorMessage(response?.message, statusCode),
            statusCode: statusCode,
          });
        }
      } catch (err) {
        const statusCode = err?.status || err?.statusCode;
        const action = data?.status === "published" ? "unpost" : "post";
        setError({
          title: statusCode
            ? formatErrorTitle(statusCode, action)
            : "Network Error",
          description: formatErrorMessage(err?.message, statusCode),
          statusCode: statusCode,
        });
      }
    });
    setConfirmDialogOpen(true);
  };

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
        descriptionLabel={"Short Description (optional)"}
      />
      {isUpdate && (
        <CustomAlert
          title="Data Updated Successfully"
          description="Your changes have been saved"
          withConfirmButton={false}
          onConfirm={() => setIsUpdate(false)}
          onClose={() => setIsUpdate(false)}
        />
      )}
      {isPosted && (
        <CustomAlert
          title={`Data ${data?.status == "published" ? "Posted" : "Unposted"} Successfully`}
          description={`Your data has been successfully ${data?.status === "published" ? "Posted" : "Unposted"}`}
          withConfirmButton={false}
          onConfirm={() => setIsPosted(false)}
          onClose={() => setIsPosted(false)}
        />
      )}
      {error && (
        <CustomAlert
          title={error.statusCode ? `${error.title}` : error.title}
          description={error.description}
          withConfirmButton={false}
          onConfirm={() => setError(null)}
          onClose={() => setError(null)}
        />
      )}
      <ConfirmationDialog
        message={confirmMessage}
        onConfirm={handleConfirm}
        onClose={() => setConfirmDialogOpen(false)}
        isOpen={isConfirmDialogOpen}
      />
    </>
  );
}
