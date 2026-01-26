"use client";

import AudioForm from "@/components/cms/audio/AudioForm";
import { useCreateAudioMutation } from "@/redux/api/sublimeApi";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function AddAudioPage() {
  const router = useRouter();
  const [createAudio, { isLoading }] = useCreateAudioMutation();

  const handleSubmit = async (data: any) => {
    try {
      await createAudio(data).unwrap();
      toast.success("Audio berhasil ditambahkan!");
      router.push("/cms/audio");
    } catch (error: any) {
      toast.error(error?.data?.message || "Gagal menambahkan audio");
    }
  };

  return (
    <div className="p-8 w-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Tambah Audio Baru
          </h1>
          <p className="text-gray-500 mt-1">
            Tambahkan konten audio baru ke perpustakaan
          </p>
        </div>
      </div>

      <AudioForm
        title="Form Audio Baru"
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
