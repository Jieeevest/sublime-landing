"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import type { StylesConfig } from "react-select";
import { Clock3, FileAudio, FileText, HardDrive, ImagePlus, Send } from "lucide-react";
import * as yup from "yup";
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
  lyrics: string;
  category_id: string;
  is_premium: boolean;
  frequency: string;
  duration: string;
  audio_url: string;
  thumbnail_url: string;
};

type AudioFormInitialData = Partial<FormState> & {
  duration_seconds?: number;
};

interface AudioFormProps {
  initialData?: AudioFormInitialData;
  onSubmit: (data: FormState) => Promise<void>;
  isLoading: boolean;
}

type SelectOption = {
  value: string;
  label: string;
};

const formatDuration = (seconds: number) => {
  const safeSeconds = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const totalSeconds = Math.round(safeSeconds);
  const mins = Math.floor(totalSeconds / 60);
  const secs = String(totalSeconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
};

const formatFileSize = (bytes: number) => {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size.toFixed(size >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
};

const parseDurationToSeconds = (value: string) => {
  const [minsRaw, secsRaw] = value.split(":");
  const mins = Number.parseInt(minsRaw ?? "0", 10);
  const secs = Number.parseInt(secsRaw ?? "0", 10);

  if (!Number.isFinite(mins) || !Number.isFinite(secs)) return 0;
  return Math.max(0, mins * 60 + secs);
};

const getAudioDurationFromFile = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const audioElement = new Audio();
    const objectUrl = URL.createObjectURL(file);
    audioElement.preload = "metadata";
    audioElement.onloadedmetadata = () => {
      const parsedDuration = formatDuration(audioElement.duration);
      URL.revokeObjectURL(objectUrl);
      resolve(parsedDuration);
    };
    audioElement.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to read audio metadata"));
    };
    audioElement.src = objectUrl;
  });

const getSelectStyles = (hasError: boolean): StylesConfig<SelectOption, false> => ({
  control: (base, state) => ({
    ...base,
    minHeight: 42,
    borderRadius: 8,
    borderColor: hasError
      ? "#EF4444"
      : state.isFocused
        ? "#3197A5"
        : "#D1D5DB",
    boxShadow: hasError
      ? "0 0 0 2px rgba(239, 68, 68, 0.15)"
      : state.isFocused
        ? "0 0 0 2px rgba(49, 151, 165, 0.2)"
        : "none",
    "&:hover": {
      borderColor: hasError
        ? "#EF4444"
        : state.isFocused
          ? "#3197A5"
          : "#D1D5DB",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0 12px",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9CA3AF",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 8,
    overflow: "hidden",
  }),
});

const audioFormSchema = yup.object({
  title: yup.string().trim().required("Title is required"),
  subtitle: yup.string().trim().required("Subtitle is required"),
  description: yup.string().trim().required("Description is required"),
  lyrics: yup.string().trim(),
  category_id: yup.string().trim().required("Category is required"),
  frequency: yup.string().trim().required("Frequency is required"),
  duration: yup.string().trim().required("Duration is required"),
  audio_url: yup.string().test({
    name: "audio-required",
    message: "Audio file is required",
    test(value) {
      const hasAudioFile = Boolean(this.options.context?.hasAudioFile);
      return hasAudioFile || Boolean(value?.trim());
    },
  }),
  thumbnail_url: yup.string().test({
    name: "thumbnail-required",
    message: "Thumbnail is required",
    test(value) {
      const hasThumbnailFile = Boolean(this.options.context?.hasThumbnailFile);
      return hasThumbnailFile || Boolean(value?.trim());
    },
  }),
});

export default function AudioForm({
  initialData,
  onSubmit,
  isLoading,
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
    lyrics: "",
    category_id: "",
    is_premium: true,
    frequency: "528Hz",
    duration: "",
    audio_url: "",
    thumbnail_url: "",
  });

  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingAudioFile, setIsUploadingAudioFile] = useState(false);
  const [submitMode, setSubmitMode] = useState<"draft" | "publish">("publish");
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        subtitle: initialData.subtitle || "",
        description: initialData.description || "",
        lyrics: initialData.lyrics || "",
        category_id: initialData.category_id || "",
        is_premium: true,
        frequency: initialData.frequency || "528Hz",
        duration:
          initialData.duration ||
          (initialData.duration_seconds
            ? formatDuration(initialData.duration_seconds)
            : ""),
        audio_url: initialData.audio_url || "",
        thumbnail_url: initialData.thumbnail_url || "",
      });
      setThumbnailPreview(initialData.thumbnail_url || "");
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormState;
    setErrors((prev) => ({ ...prev, [fieldName]: undefined }));

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "audio" | "thumbnail",
  ) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (type === "audio") {
        setAudioFile(selectedFile);
        setErrors((prev) => ({ ...prev, audio_url: undefined }));
        getAudioDurationFromFile(selectedFile)
          .then((parsedDuration) => {
            setFormData((prev) => ({ ...prev, duration: parsedDuration }));
            setErrors((prev) => ({ ...prev, duration: undefined }));
          })
          .catch(() => {
            // Keep previous duration; validation will handle missing duration.
          });
      } else {
        setThumbnailFile(selectedFile);
        setErrors((prev) => ({ ...prev, thumbnail_url: undefined }));
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            setThumbnailPreview(reader.result);
          }
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const formDataToValidate = { ...formData };

    if (audioFile && !formDataToValidate.duration) {
      try {
        const parsedDuration = await getAudioDurationFromFile(audioFile);
        formDataToValidate.duration = parsedDuration;
        setFormData((prev) => ({ ...prev, duration: parsedDuration }));
      } catch {
        // Let yup handle missing duration.
      }
    }

    try {
      await audioFormSchema.validate(formDataToValidate, {
        abortEarly: false,
        context: {
          hasAudioFile: Boolean(audioFile),
          hasThumbnailFile: Boolean(thumbnailFile),
        },
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const nextErrors: Partial<Record<keyof FormState, string>> = {};

        if (error.inner.length > 0) {
          for (const err of error.inner) {
            if (!err.path) continue;
            const key = err.path as keyof FormState;
            if (!nextErrors[key]) {
              nextErrors[key] = err.message;
            }
          }
        } else if (error.path) {
          nextErrors[error.path as keyof FormState] = error.message;
        }

        setErrors(nextErrors);
      }
      toast.error("Please complete required fields.");
      return;
    }

    setIsUploading(true);

    try {
      let currentAudioUrl = formData.audio_url;
      let currentThumbnailUrl = formData.thumbnail_url;
      let currentDuration = formDataToValidate.duration;

      // Upload Audio if changed
      if (audioFile) {
        setIsUploadingAudioFile(true);
        const audioFormData = new FormData();
        audioFormData.append("file", audioFile);
        const audioRes = await uploadAudio(audioFormData).unwrap();
        currentAudioUrl = audioRes.data.audio_url;
        if (audioRes.data.duration_seconds) {
          currentDuration = formatDuration(audioRes.data.duration_seconds);
          setFormData((prev) => ({ ...prev, duration: currentDuration }));
        }
        setIsUploadingAudioFile(false);
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
        is_premium: true,
        lyrics: formData.lyrics?.trim() || "",
        duration: currentDuration,
        duration_seconds: parseDurationToSeconds(currentDuration),
        audio_url: currentAudioUrl,
        thumbnail_url: currentThumbnailUrl,
        is_published: submitMode === "publish",
      };

      console.log("[AudioForm] Submitting payload:", payload);

      if (!payload.audio_url) {
        setErrors((prev) => ({ ...prev, audio_url: "Audio file is required" }));
        toast.error(
          "audio_url kosong. Pastikan file audio sudah dipilih dan terupload.",
        );
        return;
      }

      if (!payload.thumbnail_url) {
        setErrors((prev) => ({ ...prev, thumbnail_url: "Thumbnail is required" }));
        toast.error("Thumbnail is required.");
        return;
      }

      await onSubmit(payload);
    } catch (error) {
      console.error("Form submission error:", error);
      const message = (error as { data?: { message?: string } })?.data?.message;
      toast.error(message ?? t("audio_form_submit_failed"));
    } finally {
      setIsUploadingAudioFile(false);
      setIsUploading(false);
    }
  };

  const categoryOptions: SelectOption[] =
    categoriesData?.data?.map((cat: { id: string; name: string }) => ({
      value: cat.id,
      label: cat.name,
    })) || [];

  const selectedCategory =
    categoryOptions.find((opt) => opt.value === formData.category_id) ?? null;
  const currentAudioName =
    audioFile?.name || formData.audio_url.split("/").pop() || "";
  const currentAudioSize = audioFile ? formatFileSize(audioFile.size) : "-";

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Audio File */}
          <div className="flex flex-col gap-2 md:order-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              {t("audio_form_label_audio_file")}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div
              className={`border border-dashed rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer ${
                errors.audio_url ? "border-red-500" : "border-gray-300"
              }`}
            >
              <input
                id="audio-file-input"
                type="file"
                accept="audio/*,audio/mpeg,.mp3,.mpeg"
                onChange={(e) => handleFileChange(e, "audio")}
                className="sr-only"
              />
              <div className="flex flex-wrap items-center gap-3">
                <label
                  htmlFor="audio-file-input"
                  className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                >
                  <FileAudio className="h-4 w-4" />
                  Choose Audio
                </label>
                <p className="text-sm text-gray-500 truncate">
                  {currentAudioName || "No file chosen"}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                  <Clock3 className="h-3 w-3" />
                  Duration: {formData.duration || "--"}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                  <HardDrive className="h-3 w-3" />
                  Size: {currentAudioName ? currentAudioSize : "--"}
                </span>
              </div>
              {isUploadingAudioFile && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#1CA09A]/10 px-3 py-1 text-xs font-medium text-[#136F6B]">
                  <svg
                    className="animate-spin h-4 w-4"
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  {t("audio_uploading_audio")}
                </div>
              )}
              {errors.audio_url && (
                <p className="text-xs text-red-500 mt-2 font-medium">
                  {errors.audio_url}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  {t("audio_form_label_title")}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`px-4 py-2 border rounded-lg outline-none ${
                    errors.title
                      ? "border-red-500 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  }`}
                  placeholder={t("audio_form_placeholder_title")}
                />
                {errors.title && (
                  <p className="text-xs text-red-500 font-medium">{errors.title}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  {t("audio_form_label_subtitle")}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  className={`px-4 py-2 border rounded-lg outline-none ${
                    errors.subtitle
                      ? "border-red-500 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  }`}
                  placeholder={t("audio_form_placeholder_subtitle")}
                />
                {errors.subtitle && (
                  <p className="text-xs text-red-500 font-medium">
                    {errors.subtitle}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  {t("audio_form_label_category")}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <Select
                  options={categoryOptions}
                  value={selectedCategory}
                  onChange={(option) => {
                    setFormData((prev) => ({
                      ...prev,
                      category_id: option?.value || "",
                    }));
                    setErrors((prev) => ({ ...prev, category_id: undefined }));
                  }}
                  placeholder={t("audio_form_select_category")}
                  className="text-sm"
                  classNamePrefix="react-select"
                  styles={getSelectStyles(Boolean(errors.category_id))}
                />
                {errors.category_id && (
                  <p className="text-xs text-red-500 font-medium">
                    {errors.category_id}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  {t("audio_form_label_frequency")}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className={`px-4 py-2 border rounded-lg outline-none ${
                    errors.frequency
                      ? "border-red-500 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  }`}
                  placeholder={t("audio_form_placeholder_frequency")}
                />
                {errors.frequency && (
                  <p className="text-xs text-red-500 font-medium">
                    {errors.frequency}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Thumbnail File */}
          <div className="flex flex-col gap-2 md:order-1 md:col-span-1">
            <label className="text-sm font-medium text-gray-700">
              {t("audio_form_label_thumbnail")}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="w-full">
              <input
                id="thumbnail-file-input"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "thumbnail")}
                className="sr-only"
              />
              <label
                htmlFor="thumbnail-file-input"
                className={`group relative block aspect-[16/11] w-full overflow-hidden rounded-xl border cursor-pointer ${
                  errors.thumbnail_url
                    ? "border-red-500"
                    : "border-gray-300 hover:border-primary/50"
                }`}
              >
                {thumbnailPreview ? (
                  <img
                    src={thumbnailPreview}
                    alt={t("audio_form_alt_current_thumbnail")}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gray-100 text-gray-500">
                    <ImagePlus className="h-8 w-8 mb-2" />
                    <p className="text-sm font-medium">Upload Thumbnail</p>
                    <p className="text-xs text-gray-400 mt-1">PNG/JPG</p>
                  </div>
                )}
                {thumbnailPreview && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-800">
                      Upload New Image
                    </span>
                  </div>
                )}
              </label>
              {errors.thumbnail_url && (
                <p className="text-xs text-red-500 mt-2 font-medium">
                  {errors.thumbnail_url}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            {t("audio_form_label_description")}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`px-4 py-2 border rounded-lg outline-none resize-none ${
              errors.description
                ? "border-red-500 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
            }`}
            placeholder={t("audio_form_placeholder_description")}
          />
          {errors.description && (
            <p className="text-xs text-red-500 font-medium">
              {errors.description}
            </p>
          )}
        </div>

        {/* Lyrics */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            {t("audio_form_label_lyrics")}
          </label>
          <textarea
            name="lyrics"
            value={formData.lyrics}
            onChange={handleChange}
            rows={6}
            className={`px-4 py-2 border rounded-lg outline-none resize-y ${
              errors.lyrics
                ? "border-red-500 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
            }`}
            placeholder={t("audio_form_placeholder_lyrics")}
          />
          {errors.lyrics && (
            <p className="text-xs text-red-500 font-medium">{errors.lyrics}</p>
          )}
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
            onClick={() => setSubmitMode("draft")}
            disabled={isLoading || isUploading || isUploadingAudioFile}
            className="px-6 py-2.5 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Save as Draft
          </button>
          <button
            type="submit"
            onClick={() => setSubmitMode("publish")}
            disabled={isLoading || isUploading || isUploadingAudioFile}
            className="px-6 py-2.5 bg-primary text-white rounded-full font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {(isLoading || isUploading || isUploadingAudioFile) && (
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
            {!isLoading && !isUploading && !isUploadingAudioFile && (
              <Send className="h-4 w-4" />
            )}
            {isUploadingAudioFile
              ? t("audio_uploading_audio")
              : "Save & Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}
