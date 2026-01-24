"use client";

import {
  useGetAdminAffiliatesQuery,
  useProcessAffiliatePayoutMutation,
} from "@/redux/api/sublimeApi";

export default function CmsAffiliatesPage() {
  const { data: affiliatesData, isLoading } = useGetAdminAffiliatesQuery({
    limit: 50,
  });
  const [processPayout] = useProcessAffiliatePayoutMutation();

  const affiliates = affiliatesData?.data || [];

  const handlePayout = async (id: string) => {
    // Logic for payout processing modal or confirm
    alert("Payout feature to be implemented");
  };

  return (
    <div className="p-10 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            Affiliate Management
          </h1>
          <p className="text-gray-600">Track affiliates and manage payouts</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Affiliate User</th>
                <th className="px-6 py-4">Referral Code</th>
                <th className="px-6 py-4">Total Referrals</th>
                <th className="px-6 py-4">Commission Earned</th>
                <th className="px-6 py-4">Balance</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8">
                    Loading...
                  </td>
                </tr>
              ) : affiliates.length > 0 ? (
                affiliates.map((aff: any, idx: number) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {aff.user?.name || "Unknown"}
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
                        Process Payout
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">
                    No affiliates found
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
