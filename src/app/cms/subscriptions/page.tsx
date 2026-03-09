"use client";

import { useState } from "react";
import {
  useGetAdminSubscriptionsQuery,
  useGetAdminPlansQuery,
  useDeletePlanMutation,
} from "@/redux/api/sublimeApi";
import { useI18n } from "@/i18n";

export default function CmsSubscriptionsPage() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState("subscribers"); // 'subscribers' | 'plans'
  const [confirmState, setConfirmState] = useState<{
    message: string;
    onConfirm: () => Promise<void>;
    confirmLabel?: string;
    destructive?: boolean;
  } | null>(null);
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);

  // Subscriptions Data
  const { data: subsData, isLoading: isLoadingSubs } =
    useGetAdminSubscriptionsQuery({ limit: 50 });
  type AdminSubscription = {
    user?: { name?: string; email?: string };
    plan?: { name?: string };
    status?: string;
    startDate?: string;
    nextBillingDate?: string;
  };

  // Plans Data
  const {
    data: plansData,
    isLoading: isLoadingPlans,
    refetch: refetchPlans,
  } = useGetAdminPlansQuery(undefined);
  const [deletePlan] = useDeletePlanMutation();

  const subscriptions: AdminSubscription[] = (subsData?.data as AdminSubscription[]) || [];
  type AdminPlan = {
    id: string;
    name: string;
    price?: number;
    interval?: string;
    description?: string;
  };
  const plans: AdminPlan[] = (plansData?.data as AdminPlan[]) || [];

  const handleDeletePlan = async (id: string) => {
    setConfirmState({
      message: t("plans_confirm_delete"),
      confirmLabel: t("action_delete"),
      destructive: true,
      onConfirm: async () => {
        try {
          await deletePlan(id).unwrap();
          refetchPlans();
        } catch (e) {
          console.error(e);
          alert(t("plans_delete_failed"));
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
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">{t("subscriptions_title")}</h1>
          <p className="text-gray-600">{t("subscriptions_subtitle")}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("subscribers")}
          className={`pb-3 text-sm font-bold transition-colors border-b-2 ${activeTab === "subscribers" ? "border-[#3197A5] text-[#3197A5]" : "border-transparent text-gray-400 hover:text-gray-600"}`}
        >
          {t("subscriptions_tab_subscribers")}
        </button>
        <button
          onClick={() => setActiveTab("plans")}
          className={`pb-3 text-sm font-bold transition-colors border-b-2 ${activeTab === "plans" ? "border-[#3197A5] text-[#3197A5]" : "border-transparent text-gray-400 hover:text-gray-600"}`}
        >
          {t("subscriptions_tab_plans")}
        </button>
      </div>

      {/* Subscribers Content */}
      {activeTab === "subscribers" && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-4">{t("subscriptions_table_user")}</th>
                  <th className="px-6 py-4">{t("subscriptions_table_plan")}</th>
                  <th className="px-6 py-4">{t("subscriptions_table_status")}</th>
                  <th className="px-6 py-4">{t("subscriptions_table_start")}</th>
                  <th className="px-6 py-4">{t("subscriptions_table_next_billing")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoadingSubs ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8">
                      {t("common_loading")}
                    </td>
                  </tr>
                ) : subscriptions.length > 0 ? (
                  subscriptions.map((sub: AdminSubscription, idx: number) => (
                    <tr key={idx} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {sub.user?.name || sub.user?.email || t("subscriptions_unknown_user")}
                        <div className="text-xs text-gray-400 font-normal">
                          {sub.user?.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {sub.plan?.name || t("subscriptions_unknown_plan")}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${
                            sub.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {sub.startDate
                          ? new Date(sub.startDate).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {sub.nextBillingDate
                          ? new Date(sub.nextBillingDate).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400">
                      {t("subscriptions_none")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Plans Content */}
      {activeTab === "plans" && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button className="bg-[#3197A5] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#288a96] transition-colors">
              {t("plans_create_button")}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isLoadingPlans ? (
              <div>{t("plans_loading")}</div>
            ) : (
              plans.map((plan: AdminPlan) => (
                <div
                  key={plan.id}
                  className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#3197A5] transition-colors group relative"
                >
                  <h3 className="font-bold text-xl text-gray-800">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-bold text-[#3197A5] my-4">
                    Rp {plan.price?.toLocaleString("id-ID") || 0}
                    <span className="text-sm text-gray-400 font-medium">
                      /{plan.interval}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">
                    {plan.description}
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-bold transition-colors">
                      {t("action_edit")}
                    </button>
                    <button
                      onClick={() => handleDeletePlan(plan.id)}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 py-2 rounded-lg text-sm font-bold transition-colors"
                    >
                      {t("action_delete")}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

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
