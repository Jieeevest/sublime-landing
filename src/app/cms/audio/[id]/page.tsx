"use client";

import { use, useEffect } from "react";
import AudioForm from "@/components/cms/audio/AudioForm";
import {
  useGetAudioByIdQuery,
  useUpdateAudioMutation,
} from "@/redux/api/sublimeApi";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function EditAudioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: audioData, isLoading: isFetching } = useGetAudioByIdQuery({
    id,
  });
  const [updateAudio, { isLoading: isUpdating }] = useUpdateAudioMutation();

  const handleSubmit = async (data: any) => {
    try {
      await updateAudio({ id, ...data }).unwrap();
      toast.success("Audio berhasil diperbarui!");
      router.push("/cms/audio");
    } catch (error: any) {
      toast.error(error?.data?.message || "Gagal memperbarui audio");
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
        <h1 className="text-2xl font-bold text-gray-900">Edit Audio</h1>
        <p className="text-gray-500 mt-1">Perbarui detail konten audio</p>
      </div>

      <AudioForm
        title="Form Edit Audio"
        initialData={audioData?.data}
        onSubmit={handleSubmit}
        isLoading={isUpdating}
      />
    </div>
  );
}
