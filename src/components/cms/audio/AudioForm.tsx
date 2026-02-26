"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useGetCategoriesQuery,
  useUploadAudioMutation,
  useUploadThumbnailMutation,
} from "@/redux/api/sublimeApi";
import { toast } from "react-hot-toast";
import { useI18n } from "@/i18n";

type FormState = {
  title: string;
  subtitle: string;
  description: string;
  category_id: string;
  is_premium: boolean;
  frequency: string;
  duration: string;
  audio_url: string;
  thumbnail_url: string;
};

interface AudioFormProps {
  initialData?: Partial<FormState>;
  onSubmit: (data: FormState) => Promise<void>;
  isLoading: boolean;
  title: string;
}

export default function AudioForm({
  initialData,
  onSubmit,
  isLoading,
  title,
}: AudioFormProps) {
  const router = useRouter();
  const { t } = useI18n();
  const { data: categoriesData } = useGetCategoriesQuery(undefined);
  const [uploadAudio] = useUploadAudioMutation();
  const [uploadThumbnail] = useUploadThumbnailMutation();

  const [formData, setFormData] = useState<FormState>({
    title: "",
    subtitle: "",
    description: "",
    category_id: "",
    is_premium: false,
    frequency: "",
    duration: "",
    audio_url: "",
    thumbnail_url: "",
  });

  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        subtitle: initialData.subtitle || "",
        description: initialData.description || "",
        category_id: initialData.category_id || "",
        is_premium: initialData.is_premium || false,
        frequency: initialData.frequency || "",
        duration: initialData.duration || "",
        audio_url: initialData.audio_url || "",
        thumbnail_url: initialData.thumbnail_url || "",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "audio" | "thumbnail",
  ) => {
    if (e.target.files && e.target.files[0]) {
      if (type === "audio") {
        setAudioFile(e.target.files[0]);
      } else {
        setThumbnailFile(e.target.files[0]);
      }
    }
  };

  const [audioError, setAudioError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Guard: audio_url is required — either from an uploaded file or existing URL
    if (!audioFile && !formData.audio_url) {
      setAudioError("File audio wajib diisi / Audio file is required");
      return;
    }

    setAudioError(null);
    setIsUploading(true);

    try {
      let currentAudioUrl = formData.audio_url;
      let currentThumbnailUrl = formData.thumbnail_url;

      // Upload Audio if changed
      if (audioFile) {
        const audioFormData = new FormData();
        audioFormData.append("file", audioFile);
        const audioRes = await uploadAudio(audioFormData).unwrap();
        currentAudioUrl = audioRes.data.audio_url;
        // Auto-populate duration from upload response if not already set
        if (audioRes.data.duration_seconds && !formData.duration) {
          const mins = Math.floor(audioRes.data.duration_seconds / 60);
          const secs = String(audioRes.data.duration_seconds % 60).padStart(
            2,
            "0",
          );
          setFormData((prev) => ({ ...prev, duration: `${mins}:${secs}` }));
        }
      }

      // Upload Thumbnail if changed
      if (thumbnailFile) {
        const thumbFormData = new FormData();
        thumbFormData.append("file", thumbnailFile);
        const thumbRes = await uploadThumbnail(thumbFormData).unwrap();
        currentThumbnailUrl = thumbRes.data.thumbnail_url;
      }

      const payload = {
        ...formData,
        audio_url: currentAudioUrl,
        thumbnail_url: currentThumbnailUrl,
        is_published: true,
      };

      console.log("[AudioForm] Submitting payload:", payload);

      if (!payload.audio_url) {
        toast.error(
          "audio_url kosong. Pastikan file audio sudah dipilih dan terupload.",
        );
        return;
      }

      await onSubmit(payload);
    } catch (error) {
      console.error("Form submission error:", error);
      const message = (error as { data?: { message?: string } })?.data?.message;
      toast.error(message ?? t("audio_form_submit_failed"));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">{title}</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              {t("audio_form_label_title")}
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              placeholder={t("audio_form_placeholder_title")}
            />
          </div>

          {/* Subtitle */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              {t("audio_form_label_subtitle")}
            </label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              placeholder={t("audio_form_placeholder_subtitle")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              {t("audio_form_label_category")}
            </label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white"
            >
              <option value="">{t("audio_form_select_category")}</option>
              {categoriesData?.data?.map(
                (cat: { id: string; name: string }) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ),
              )}
            </select>
          </div>

          {/* Frequency */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              {t("audio_form_label_frequency")}
            </label>
            <input
              type="text"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              placeholder={t("audio_form_placeholder_frequency")}
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            {t("audio_form_label_description")}
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
            placeholder={t("audio_form_placeholder_description")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Audio File */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              {t("audio_form_label_audio_file")}
            </label>
            <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => handleFileChange(e, "audio")}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary hover:file:bg-primary-100"
              />
              {formData.audio_url && !audioFile && (
                <p className="text-xs text-gray-500 mt-2 truncate">
                  {t("audio_form_current")}: {formData.audio_url}
                </p>
              )}
              {audioError && (
                <p className="text-xs text-red-500 mt-2 font-medium">
                  {audioError}
                </p>
              )}
            </div>
          </div>

          {/* Thumbnail File */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              {t("audio_form_label_thumbnail")}
            </label>
            <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "thumbnail")}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary hover:file:bg-primary-100"
              />
              {formData.thumbnail_url && !thumbnailFile && (
                <div className="mt-2">
                  <img
                    src={formData.thumbnail_url}
                    alt={t("audio_form_alt_current_thumbnail")}
                    className="h-10 w-10 object-cover rounded"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 Md:grid-cols-2 gap-6">
          {/* Duration */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              {t("audio_form_label_duration")}
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              placeholder={t("audio_form_placeholder_duration")}
            />
          </div>

          {/* Premium Checkbox */}
          <div className="flex items-center gap-3 pt-8">
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full border border-gray-200">
              <input
                type="checkbox"
                name="is_premium"
                id="is_premium"
                checked={formData.is_premium}
                onChange={handleChange}
                className="absolute w-6 h-6 opacity-0 z-10 cursor-pointer"
              />
              <label
                htmlFor="is_premium"
                className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${formData.is_premium ? "bg-primary" : "bg-gray-200"}`}
              ></label>
              <div
                className={`absolute left-0 top-0 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform transform ${formData.is_premium ? "translate-x-full border-primary" : ""}`}
              ></div>
            </div>
            <label
              htmlFor="is_premium"
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              {t("audio_form_label_premium")}
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            {t("audio_form_button_cancel")}
          </button>
          <button
            type="submit"
            disabled={isLoading || isUploading}
            className="px-6 py-2.5 bg-primary text-white rounded-full font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {(isLoading || isUploading) && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {t("audio_form_button_save")}
          </button>
        </div>
      </form>
    </div>
  );
}
