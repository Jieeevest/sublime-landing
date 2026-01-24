"use client";

import {
  useGetMyAffiliateQuery,
  useGetReferralsQuery,
  useGetWithdrawalsQuery,
  useRegisterAffiliateMutation,
  useRequestWithdrawalMutation,
  useGetMeQuery,
  useUpdateAffiliatePaymentInfoMutation,
} from "@/redux/api/sublimeApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { Share2, UserPlus, Gift, Copy } from "lucide-react";
import ShareReferralModal from "./ShareReferralModal";
import WithdrawalModal from "./WithdrawalModal";

export default function ReferralTab() {
  const { data: userData } = useGetMeQuery(undefined);
  const {
    data: affiliateData,
    isLoading: isLoadingAffiliate,
    refetch: refetchAffiliate,
  } = useGetMyAffiliateQuery(undefined);
  const { data: referralsData } = useGetReferralsQuery(
    {},
    { skip: !affiliateData?.data },
  );
  const { data: withdrawalsData, refetch: refetchWithdrawals } =
    useGetWithdrawalsQuery({}, { skip: !affiliateData?.data });

  const [registerAffiliate, { isLoading: isRegistering }] =
    useRegisterAffiliateMutation();
  const [requestWithdrawal, { isLoading: isWithdrawing }] =
    useRequestWithdrawalMutation();
  const [updatePaymentInfo, { isLoading: isUpdatingPayment }] =
    useUpdateAffiliatePaymentInfoMutation();

  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  // Fallback data
  const referralCode =
    userData?.data?.referral_code ||
    affiliateData?.data?.referralCode ||
    "LOADING...";

  const referralLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/register?ref=${referralCode}`
      : `https://strovia.com/register?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast.success("Kode referral berhasil disalin!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleRegister = async () => {
    try {
      await registerAffiliate({}).unwrap();
      toast.success("Berhasil mendaftar program affiliate!");
      refetchAffiliate();
    } catch (error) {
      console.error("Register affiliate error:", error);
      toast.error("Gagal mendaftar. Silakan coba lagi.");
    }
  };

  const handleWithdrawalRequest = () => {
    setIsWithdrawModalOpen(true);
  };

  const handleProcessWithdrawal = async (amount: number) => {
    try {
      await requestWithdrawal({ amount }).unwrap();
      // Toast is handled in the modal success step if needed, or we rely on the modal UI
      // But for sync logic:
      refetchWithdrawals();
      refetchAffiliate();
    } catch (error) {
      console.error("Withdrawal error:", error);
      toast.error("Gagal mengirim permintaan penarikan.");
      throw error; // Let modal handle error state if it wants
    }
  };

  const handleUpdateBank = async (data: any) => {
    try {
      await updatePaymentInfo(data).unwrap();
      toast.success("Informasi rekening berhasil disimpan");
      refetchAffiliate();
    } catch (error) {
      console.error("Update bank error:", error);
      toast.error("Gagal menyimpan rekening.");
    }
  };

  if (isLoadingAffiliate) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3197A5]"></div>
      </div>
    );
  }

  // If user is not an affiliate yet, show registration view
  if (!affiliateData?.data && !isLoadingAffiliate) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-4">
          Program Referral
        </h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Anda belum terdaftar sebagai affiliate. Bergabunglah sekarang untuk
          mulai mendapatkan komisi!
        </p>
        <button
          onClick={handleRegister}
          disabled={isRegistering}
          className="bg-[#3197A5] hover:bg-[#288a96] text-white px-6 py-3 rounded-full font-medium transition-colors disabled:opacity-50 flex items-center gap-2 mx-auto"
        >
          {isRegistering && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          Daftar Affiliate
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Top Section: Program Info & Balance (Height 307px) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[307px]">
        {/* Left Card: Program Info and Steps */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-xl font-bold text-[#1F1F1F] mb-2">
              Program Referral Strovia
            </h3>
            <p className="text-gray-500 text-sm mb-8">
              Undang teman dan dapatkan Rp25.000 untuk setiap pengguna yang
              mendaftar dan berlangganan melalui kode kamu.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center max-w-[160px] z-10">
              <div className="w-16 h-16 bg-[#E0F2F4] rounded-full flex items-center justify-center mb-4 text-[#3197A5]">
                <Share2 size={24} strokeWidth={2.5} />
              </div>
              <h4 className="text-xs font-bold text-[#1F1F1F] mb-1">
                Bagikan Kode Referral
              </h4>
              <p className="text-[10px] text-gray-400">
                Gunakan kode unik kamu untuk mengajak teman bergabung di
                Strovia.
              </p>
            </div>

            {/* Arrow 1 */}
            <div className="hidden md:block absolute left-[22%] top-[30px] w-[15%] text-[#3197A5]">
              <svg
                width="100%"
                height="2"
                viewBox="0 0 100 2"
                fill="none"
                preserveAspectRatio="none"
              >
                <line
                  x1="0"
                  y1="1"
                  x2="100"
                  y2="1"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              </svg>
              <div className="absolute right-0 -top-1.5">
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M1 1L5 5L1 9" />
                </svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center max-w-[160px] z-10">
              <div className="w-16 h-16 bg-[#E0F2F4] rounded-full flex items-center justify-center mb-4 text-[#3197A5]">
                <UserPlus size={24} strokeWidth={2.5} />
              </div>
              <h4 className="text-xs font-bold text-[#1F1F1F] mb-1">
                Teman Melakukan Pendaftaran
              </h4>
              <p className="text-[10px] text-gray-400">
                Temanmu membuat akun melalui link/kode kamu.
              </p>
            </div>

            {/* Arrow 2 */}
            <div className="hidden md:block absolute right-[22%] top-[30px] w-[15%] text-[#3197A5]">
              <svg
                width="100%"
                height="2"
                viewBox="0 0 100 2"
                fill="none"
                preserveAspectRatio="none"
              >
                <line
                  x1="0"
                  y1="1"
                  x2="100"
                  y2="1"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              </svg>
              <div className="absolute right-0 -top-1.5">
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M1 1L5 5L1 9" />
                </svg>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center max-w-[160px] z-10">
              <div className="w-16 h-16 bg-[#E0F2F4] rounded-full flex items-center justify-center mb-4 text-[#3197A5]">
                <Gift size={24} strokeWidth={2.5} />
              </div>
              <h4 className="text-xs font-bold text-[#1F1F1F] mb-1">
                Dapatkan Rp25.000
              </h4>
              <p className="text-[10px] text-gray-400">
                Dapatkan Rp25.000 setiap bulan selama temanmu tetap
                berlangganan.
              </p>
            </div>
          </div>
        </div>

        {/* Right Card: Balance & Code */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-[#1F1F1F]">
                Rp{" "}
                {Number(
                  affiliateData?.data?.total_earnings || 0,
                ).toLocaleString("id-ID")}
              </h3>
              <p className="text-xs text-gray-400">Saldo Referral</p>
            </div>
            <button
              onClick={handleWithdrawalRequest}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium rounded-full transition-colors"
              title="Tarik Dana"
            >
              Tarik Dana
            </button>
          </div>

          <div className="bg-white border border-dashed border-gray-200 rounded-xl p-4 mb-6 relative">
            <p className="text-[10px] text-gray-400 absolute top-2 left-4 bg-white px-1">
              Kode Referral
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-lg font-bold text-[#1F1F1F] tracking-wide">
                {referralCode}
              </span>
              <button
                onClick={handleCopy}
                className="text-[#3197A5] text-xs font-medium flex items-center gap-1 hover:text-[#288a96] transition-colors"
              >
                {copied ? "Copied" : "Copy"}
                {!copied && <Copy size={14} />}
              </button>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="w-full bg-[#3197A5] hover:bg-[#288a96] text-white py-3 rounded-xl font-medium text-sm transition-colors mt-auto"
          >
            Bagikan
          </button>
        </div>
      </div>

      {/* Bottom Section: Lists (Height 650px) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[650px]">
        {/* Referral List (Takes up 2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full overflow-hidden flex flex-col">
          <h4 className="text-lg font-bold text-[#1F1F1F] mb-6">
            Daftar Teman
          </h4>

          {/* Empty State */}
          {!referralsData?.data || referralsData.data.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center">
              {/* Placeholder Illustration */}
              <div className="w-32 h-32 bg-[#E0F2F4] rounded-full flex items-center justify-center mb-6 relative">
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#3197A5] rounded-full flex items-center justify-center text-white text-lg font-bold">
                  ?
                </div>
                <UserPlus size={48} className="text-[#3197A5]" />
              </div>
              <h5 className="text-sm font-bold text-[#1F1F1F] mb-1">
                Kamu belum memiliki peserta referral
              </h5>
              <p className="text-xs text-gray-400 max-w-xs mb-6">
                Ajak teman pertama kamu dan dapatkan Rp25.000 setiap bulan*.
              </p>
              <button
                onClick={handleShare}
                className="px-6 py-2.5 bg-[#3197A5] hover:bg-[#288a96] text-white rounded-full text-xs font-medium transition-colors"
              >
                Bagikan Kode Referral
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-sm text-left">
                <thead className="text-gray-400 text-xs bg-gray-50 rounded-lg">
                  <tr>
                    <th className="py-3 px-4 rounded-l-lg font-medium">Nama</th>
                    <th className="py-3 px-4 font-medium">Tanggal</th>
                    <th className="py-3 px-4 font-medium">Reward</th>
                    <th className="py-3 px-4 rounded-r-lg font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {referralsData.data.map((ref: any, idx: number) => (
                    <tr key={idx}>
                      <td className="py-4 px-4 font-medium text-[#1F1F1F]">
                        {ref.referredUser?.name || "User"}
                        <div className="text-xs text-gray-400 font-normal">
                          {ref.referredUser?.email}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-500">
                        {new Date(ref.created_at).toLocaleDateString("id-ID")}
                      </td>
                      <td className="py-4 px-4 text-[#3197A5] font-medium">
                        Rp{" "}
                        {(ref.commission_amount || 0).toLocaleString("id-ID")}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide ${
                            ref.status === "active" || ref.status === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {ref.status || "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Withdrawal History (Takes up 1 col) */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-bold text-[#1F1F1F]">
              Riwayat Pencairan
            </h4>
            <button
              onClick={handleWithdrawalRequest}
              className="text-sm text-[#3197A5] font-medium hover:underline"
            >
              Request Penarikan
            </button>
          </div>

          {!withdrawalsData?.data || withdrawalsData.data.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center">
              <div className="w-24 h-24 bg-[#E0F2F4] rounded-full flex items-center justify-center mb-6">
                {/* Receipt Icon placeholder */}
                <div className="w-12 h-14 border-2 border-[#3197A5] rounded bg-white flex flex-col items-center justify-center gap-1 relative">
                  <div className="w-6 h-1 bg-gray-200 rounded-full"></div>
                  <div className="w-6 h-1 bg-gray-200 rounded-full"></div>
                  <div className="absolute -right-2 -top-2 w-5 h-5 bg-[#3197A5] text-white flex items-center justify-center rounded-full text-[10px]">
                    x
                  </div>
                </div>
              </div>
              <h5 className="text-sm font-bold text-[#1F1F1F] mb-1">
                Belum ada riwayat pencairan
              </h5>
              <p className="text-xs text-gray-400 max-w-xs">
                Tarik dana referral kamu ketika saldo sudah mencukupi.
              </p>
            </div>
          ) : (
            <div className="space-y-4 flex-1 overflow-y-auto">
              {withdrawalsData.data.map((wd: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 border border-gray-100 rounded-xl"
                >
                  <div>
                    <p className="text-sm font-bold text-[#1F1F1F]">
                      Rp {wd.amount.toLocaleString("id-ID")}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(wd.createdAt).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-1 rounded-full ${
                      wd.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : wd.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {wd.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ShareReferralModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        referralLink={referralLink}
      />

      <WithdrawalModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        balance={Number(affiliateData?.data?.total_earnings || 0)}
        savedBank={affiliateData?.data?.paymentInfo}
        onUpdateBank={handleUpdateBank}
        onRequestWithdrawal={handleProcessWithdrawal}
        isLoadingAction={isUpdatingPayment || isWithdrawing}
      />
    </div>
  );
}
