/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AudioForm from "@/components/cms/audio/AudioForm";
import { useCreateAudioMutation } from "@/redux/api/sublimeApi";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useI18n } from "@/i18n";

export default function AddAudioPage() {
  const router = useRouter();
  const [createAudio, { isLoading }] = useCreateAudioMutation();
  const { t } = useI18n();

  const handleSubmit = async (data: any) => {
    try {
      await createAudio(data).unwrap();
      toast.success(t("audio_add_success"));
      router.push("/cms/audio");
    } catch (error: any) {
      console.error(error);
      toast.error(t("audio_add_failed"));
    }
  };

  return (
    <div className="p-8 w-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t("audio_add_page_title")}
          </h1>
          <p className="text-gray-500 mt-1">{t("audio_add_page_subtitle")}</p>
        </div>
      </div>

      <AudioForm
        title={t("audio_form_new_title")}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
