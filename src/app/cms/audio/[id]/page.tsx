/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { use } from "react";
import AudioForm from "@/components/cms/audio/AudioForm";
import {
  useGetAudioByIdQuery,
  useUpdateAudioMutation,
} from "@/redux/api/sublimeApi";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useI18n } from "@/i18n";

export default function EditAudioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { t } = useI18n();
  const { data: audioData, isLoading: isFetching } = useGetAudioByIdQuery({
    id,
  });
  const [updateAudio, { isLoading: isUpdating }] = useUpdateAudioMutation();

  const handleSubmit = async (data: any) => {
    try {
      await updateAudio({ id, ...data }).unwrap();
      toast.success(t("audio_update_success"));
      router.push("/cms/audio");
    } catch (error: any) {
      console.error(error);
      toast.error(t("audio_update_failed"));
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
        <h1 className="text-2xl font-bold text-gray-900">
          {t("audio_edit_page_title")}
        </h1>
        <p className="text-gray-500 mt-1">{t("audio_edit_page_subtitle")}</p>
      </div>

      <AudioForm
        initialData={audioData?.data}
        onSubmit={handleSubmit}
        isLoading={isUpdating}
      />
    </div>
  );
}
