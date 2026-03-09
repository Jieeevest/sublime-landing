/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  useGetAdminAffiliatesQuery,
  useProcessAffiliatePayoutMutation,
} from "@/redux/api/sublimeApi";
import { useI18n } from "@/i18n";
import { toast } from "react-hot-toast";

export default function CmsAffiliatesPage() {
  const { t } = useI18n();
  const [confirmState, setConfirmState] = useState<{
    message: string;
    onConfirm: () => Promise<void>;
    confirmLabel?: string;
    destructive?: boolean;
  } | null>(null);
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const {
    data: affiliatesData,
    isLoading,
    refetch,
  } = useGetAdminAffiliatesQuery({
    limit: 50,
  });
  const [processPayout] = useProcessAffiliatePayoutMutation();

  const affiliates = affiliatesData?.data || [];

  const handlePayout = async (id: string) => {
    setConfirmState({
      message: t("affiliates_payout_confirm"),
      confirmLabel: t("common_ok"),
      onConfirm: async () => {
        try {
          await processPayout({ id }).unwrap();
          toast.success(t("affiliates_payout_success"));
          refetch();
        } catch (e) {
          console.error(e);
          toast.error(t("affiliates_payout_failed"));
        }
      },
    });
  };

  const closeConfirm = () => {
    if (isConfirmLoading) return;
    setConfirmState(null);
  };

  const handleConfirmAction = async () => {
    if (!confirmState) return;
    setIsConfirmLoading(true);
    await confirmState.onConfirm();
    setIsConfirmLoading(false);
    setConfirmState(null);
  };

  return (
    <div className="p-10 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            {t("affiliates_title")}
          </h1>
          <p className="text-gray-600">{t("affiliates_subtitle")}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">{t("affiliates_table_user")}</th>
                <th className="px-6 py-4">
                  {t("affiliates_table_referral_code")}
                </th>
                <th className="px-6 py-4">
                  {t("affiliates_table_total_referrals")}
                </th>
                <th className="px-6 py-4">
                  {t("affiliates_table_commission")}
                </th>
                <th className="px-6 py-4">{t("affiliates_table_balance")}</th>
                <th className="px-6 py-4">{t("affiliates_table_actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8">
                    {t("common_loading")}
                  </td>
                </tr>
              ) : affiliates.length > 0 ? (
                affiliates.map((aff: any, idx: number) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {aff.user?.name || t("unknown")}
                      <div className="text-xs text-gray-400 font-normal">
                        {aff.user?.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-gray-600">
                      {aff.referralCode}
                    </td>
                    <td className="px-6 py-4">{aff.totalReferrals || 0}</td>
                    <td className="px-6 py-4 text-green-600 font-medium">
                      Rp {aff.totalCommission?.toLocaleString("id-ID") || 0}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-800">
                      Rp {aff.balance?.toLocaleString("id-ID") || 0}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handlePayout(aff.id)}
                        className="text-[#3197A5] hover:text-[#288a96] font-bold text-xs hover:underline"
                      >
                        {t("affiliates_payout_process")}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">
                    {t("affiliates_none")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {confirmState && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-16 sm:pt-20">
          <button
            type="button"
            aria-label="Close confirmation modal"
            onClick={closeConfirm}
            className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
          />
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl border border-[#EFE7EB]"
          >
            <div className="px-5 py-4 border-b border-[#EFE7EB]">
              <p className="text-sm font-semibold text-gray-700">strovia.app</p>
            </div>
            <div className="px-5 py-5">
              <p className="text-sm text-[#3D3D3D]">{confirmState.message}</p>
            </div>
            <div className="px-5 pb-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeConfirm}
                disabled={isConfirmLoading}
                className="px-5 py-2 text-sm font-medium rounded-full bg-[#F9E7EC] text-[#7C4A57] hover:bg-[#F3D8E0] transition-colors disabled:opacity-60"
              >
                {t("form_cancel_button")}
              </button>
              <button
                type="button"
                onClick={handleConfirmAction}
                disabled={isConfirmLoading}
                className={`px-6 py-2 text-sm font-semibold rounded-full border transition-colors disabled:opacity-60 ${
                  confirmState.destructive
                    ? "bg-[#8F3C4F] text-white border-[#8F3C4F] hover:bg-[#7E3143]"
                    : "bg-[#1CA09A] text-white border-[#1CA09A] hover:bg-[#178F87]"
                }`}
              >
                {isConfirmLoading
                  ? t("common_loading")
                  : (confirmState.confirmLabel ?? t("common_ok"))}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
