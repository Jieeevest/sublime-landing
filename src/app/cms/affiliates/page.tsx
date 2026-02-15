/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useGetAdminAffiliatesQuery,
  useProcessAffiliatePayoutMutation,
} from "@/redux/api/sublimeApi";
import { useI18n } from "@/i18n";
import { toast } from "react-hot-toast";

export default function CmsAffiliatesPage() {
  const { t } = useI18n();
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
    if (!confirm(t("affiliates_payout_confirm"))) return;
    try {
      await processPayout({ id }).unwrap();
      toast.success(t("affiliates_payout_success"));
      refetch();
    } catch (e) {
      console.error(e);
      toast.error(t("affiliates_payout_failed"));
    }
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
    </div>
  );
}
