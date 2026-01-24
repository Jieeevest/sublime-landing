"use client";

import { useState } from "react";
import {
  useGetAdminSubscriptionsQuery,
  useGetAdminPlansQuery,
  useDeletePlanMutation,
} from "@/redux/api/sublimeApi";

export default function CmsSubscriptionsPage() {
  const [activeTab, setActiveTab] = useState("subscribers"); // 'subscribers' | 'plans'

  // Subscriptions Data
  const { data: subsData, isLoading: isLoadingSubs } =
    useGetAdminSubscriptionsQuery({ limit: 50 });

  // Plans Data
  const {
    data: plansData,
    isLoading: isLoadingPlans,
    refetch: refetchPlans,
  } = useGetAdminPlansQuery(undefined);
  const [deletePlan] = useDeletePlanMutation();

  const subscriptions = subsData?.data || [];
  const plans = plansData?.data || [];

  const handleDeletePlan = async (id: string) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      try {
        await deletePlan(id).unwrap();
        refetchPlans();
      } catch (e) {
        console.error(e);
        alert("Failed to delete plan");
      }
    }
  };

  return (
    <div className="p-10 space-y-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            Subscription Management
          </h1>
          <p className="text-gray-600">
            Manage user subscriptions and pricing plans
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("subscribers")}
          className={`pb-3 text-sm font-bold transition-colors border-b-2 ${activeTab === "subscribers" ? "border-[#3197A5] text-[#3197A5]" : "border-transparent text-gray-400 hover:text-gray-600"}`}
        >
          Subscribers List
        </button>
        <button
          onClick={() => setActiveTab("plans")}
          className={`pb-3 text-sm font-bold transition-colors border-b-2 ${activeTab === "plans" ? "border-[#3197A5] text-[#3197A5]" : "border-transparent text-gray-400 hover:text-gray-600"}`}
        >
          Plans Management
        </button>
      </div>

      {/* Subscribers Content */}
      {activeTab === "subscribers" && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Plan</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Start Date</th>
                  <th className="px-6 py-4">Next Billing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoadingSubs ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8">
                      Loading...
                    </td>
                  </tr>
                ) : subscriptions.length > 0 ? (
                  subscriptions.map((sub: any, idx: number) => (
                    <tr key={idx} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {sub.user?.name || sub.user?.email || "Unknown User"}
                        <div className="text-xs text-gray-400 font-normal">
                          {sub.user?.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {sub.plan?.name || "Unknown Plan"}
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
                      No subscriptions found
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
              + Create New Plan
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isLoadingPlans ? (
              <div>Loading Plans...</div>
            ) : (
              plans.map((plan: any) => (
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
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePlan(plan.id)}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 py-2 rounded-lg text-sm font-bold transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
