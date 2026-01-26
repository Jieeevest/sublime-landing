import { apiSlice } from "./apiSlice";

export const sublimeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // =========================================================================
    // Auth
    // =========================================================================
    register: builder.mutation({
      query: (userData) => ({
        url: "/api/v1/auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Users"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    getMe: builder.query({
      query: () => "/api/v1/auth/me",
      providesTags: ["Auth"],
    }),
    updateMe: builder.mutation({
      query: (userData) => ({
        url: "/api/v1/auth/me",
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    verifyResetToken: builder.query({
      query: (token) => `/api/v1/auth/verify-reset-token/${token}`,
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    // =========================================================================
    // Users (Admin)
    // =========================================================================
    getUsers: builder.query({
      query: (params) => ({
        url: "/api/v1/users/",
        params,
      }),
      providesTags: ["Users"],
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/api/v1/users/",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Users"],
    }),
    getUserById: builder.query({
      query: (id) => `/api/v1/users/${id}`,
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/v1/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/v1/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    toggleUserActive: builder.mutation({
      query: (id) => ({
        url: `/api/v1/users/${id}/toggle-active`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),

    // =========================================================================
    // Audios
    // =========================================================================
    getAudios: builder.query({
      query: (params) => ({
        url: "/api/v1/audios/",
        params,
      }),
      providesTags: ["Audios"],
    }),
    getAudioBySlug: builder.query({
      query: (slug) => `/api/v1/audios/slug/${slug}`,
      providesTags: ["Audios"],
    }),
    getAudioById: builder.query({
      query: ({ id, increment_play }) => ({
        url: `/api/v1/audios/${id}`,
        params: { increment_play },
      }),
      providesTags: (result, error, { id }) => [{ type: "Audios", id }],
    }),
    createAudio: builder.mutation({
      query: (data) => ({
        url: "/api/v1/audios/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Audios"],
    }),
    updateAudio: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/v1/audios/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Audios"],
    }),
    deleteAudio: builder.mutation({
      query: (id) => ({
        url: `/api/v1/audios/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Audios"],
    }),
    getAdminAudios: builder.query({
      query: (params) => ({
        url: "/api/v1/audios/admin/list",
        params,
      }),
      providesTags: ["Audios"],
    }),
    toggleAudioPublish: builder.mutation({
      query: (id) => ({
        url: `/api/v1/audios/${id}/publish`,
        method: "PATCH",
      }),
      invalidatesTags: ["Audios"],
    }),
    streamAudio: builder.query({
      query: (id) => ({
        url: `/api/v1/audios/stream/${id}`,
        responseHandler: (response) => response.blob(), // For handling audio stream if needed in some way
      }),
    }),

    // =========================================================================
    // Categories
    // =========================================================================
    getCategories: builder.query({
      query: () => "/api/v1/audios/categories",
      providesTags: ["Categories"],
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/api/v1/audios/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/v1/audios/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/api/v1/audios/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),

    // =========================================================================
    // Favorites
    // =========================================================================
    getFavorites: builder.query({
      query: (params) => ({
        url: "/api/v1/favorites/",
        params,
      }),
      providesTags: ["Favorites"],
    }),
    addToFavorites: builder.mutation({
      query: (audioId) => ({
        url: `/api/v1/favorites/${audioId}`,
        method: "POST",
      }),
      invalidatesTags: ["Favorites"],
    }),
    removeFromFavorites: builder.mutation({
      query: (audioId) => ({
        url: `/api/v1/favorites/${audioId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favorites"],
    }),
    toggleFavorite: builder.mutation({
      query: (audioId) => ({
        url: `/api/v1/favorites/${audioId}/toggle`,
        method: "POST",
      }),
      invalidatesTags: ["Favorites"],
    }),
    checkFavorite: builder.query({
      query: (audioId) => `/api/v1/favorites/${audioId}/check`,
      providesTags: ["Favorites"],
    }),

    // =========================================================================
    // History
    // =========================================================================
    getHistory: builder.query({
      query: (params) => ({
        url: "/api/v1/history/",
        params,
      }),
      providesTags: ["History"],
    }),
    recordHistory: builder.mutation({
      query: (data) => ({
        url: "/api/v1/history/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["History"],
    }),
    clearHistory: builder.mutation({
      query: () => ({
        url: "/api/v1/history/",
        method: "DELETE",
      }),
      invalidatesTags: ["History"],
    }),
    getHistoryProgress: builder.query({
      query: (audioId) => `/api/v1/history/${audioId}/progress`,
    }),
    removeHistoryItem: builder.mutation({
      query: (id) => ({
        url: `/api/v1/history/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["History"],
    }),

    // =========================================================================
    // Prompts (Admin)
    // =========================================================================
    getPrompts: builder.query({
      query: (params) => ({
        url: "/api/v1/prompts/",
        params,
      }),
      providesTags: ["Prompts"],
    }),
    createPrompt: builder.mutation({
      query: (data) => ({
        url: "/api/v1/prompts/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Prompts"],
    }),
    getPromptById: builder.query({
      query: (id) => `/api/v1/prompts/${id}`,
      providesTags: (result, error, id) => [{ type: "Prompts", id }],
    }),
    updatePrompt: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/v1/prompts/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Prompts"],
    }),
    deletePrompt: builder.mutation({
      query: (id) => ({
        url: `/api/v1/prompts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Prompts"],
    }),
    getPromptCategories: builder.query({
      query: () => "/api/v1/prompts/categories",
      providesTags: ["Prompts"],
    }),

    // =========================================================================
    // Subscriptions & Plans
    // =========================================================================
    getPlans: builder.query({
      query: () => "/api/v1/subscriptions/plans",
      providesTags: ["Plans"],
    }),
    getMySubscription: builder.query({
      query: () => "/api/v1/subscriptions/me",
      providesTags: ["Subscriptions"],
    }),
    subscribe: builder.mutation({
      query: (data) => ({
        url: "/api/v1/subscriptions/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscriptions"],
    }),
    cancelSubscription: builder.mutation({
      query: () => ({
        url: "/api/v1/subscriptions/cancel",
        method: "POST",
      }),
      invalidatesTags: ["Subscriptions"],
    }),
    getAdminSubscriptions: builder.query({
      query: (params) => ({
        url: "/api/v1/subscriptions/admin/list",
        params,
      }),
      providesTags: ["Subscriptions"],
    }),
    getAdminPlans: builder.query({
      query: () => "/api/v1/subscriptions/admin/plans",
      providesTags: ["Plans"],
    }),
    createPlan: builder.mutation({
      query: (data) => ({
        url: "/api/v1/subscriptions/admin/plans",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Plans"],
    }),
    updatePlan: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/v1/subscriptions/admin/plans/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Plans"],
    }),
    deletePlan: builder.mutation({
      query: (id) => ({
        url: `/api/v1/subscriptions/admin/plans/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Plans"],
    }),

    // =========================================================================
    // Affiliates
    // =========================================================================
    registerAffiliate: builder.mutation({
      query: (data) => ({
        url: "/api/v1/affiliates/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Affiliates"],
    }),
    getMyAffiliate: builder.query({
      query: () => "/api/v1/affiliates/me",
      providesTags: ["Affiliates"],
    }),
    getReferrals: builder.query({
      query: (params) => ({
        url: "/api/v1/affiliates/referrals",
        params,
      }),
      providesTags: ["Affiliates"],
    }),
    updateAffiliatePaymentInfo: builder.mutation({
      query: (data) => ({
        url: "/api/v1/affiliates/payment-info",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Affiliates"],
    }),
    requestWithdrawal: builder.mutation({
      query: (data) => ({
        url: "/api/v1/affiliates/withdrawals",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Affiliates"],
    }),
    getWithdrawals: builder.query({
      query: (params) => ({
        url: "/api/v1/affiliates/withdrawals",
        params,
      }),
      providesTags: ["Affiliates"],
    }),
    getAdminAffiliates: builder.query({
      query: (params) => ({
        url: "/api/v1/affiliates/admin/list",
        params,
      }),
      providesTags: ["Affiliates"],
    }),
    getAdminAffiliateById: builder.query({
      query: (id) => `/api/v1/affiliates/admin/${id}`,
      providesTags: (result, error, id) => [{ type: "Affiliates", id }],
    }),
    updateAdminAffiliate: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/v1/affiliates/admin/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Affiliates"],
    }),
    processAffiliatePayout: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/v1/affiliates/admin/${id}/payout`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Affiliates"],
    }),

    // =========================================================================
    // Contents (CMS)
    // =========================================================================
    getPublicContents: builder.query({
      query: (params) => ({
        url: "/api/v1/contents/public",
        params,
      }),
      providesTags: ["Contents"],
    }),
    getPublicContentBySlug: builder.query({
      query: ({ slug, increment_view }) => ({
        url: `/api/v1/contents/public/${slug}`,
        params: { increment_view },
      }),
      providesTags: ["Contents"],
    }),
    getContentCategories: builder.query({
      query: () => "/api/v1/contents/categories",
      providesTags: ["Contents"],
    }),
    getContentTypes: builder.query({
      query: () => "/api/v1/contents/types",
      providesTags: ["Contents"],
    }),
    getAdminContents: builder.query({
      query: (params) => ({
        url: "/api/v1/contents/",
        params,
      }),
      providesTags: ["Contents"],
    }),
    createContent: builder.mutation({
      query: (data) => ({
        url: "/api/v1/contents/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contents"],
    }),
    getContentById: builder.query({
      query: (id) => `/api/v1/contents/${id}`,
      providesTags: (result, error, id) => [{ type: "Contents", id }],
    }),
    updateContent: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/v1/contents/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Contents"],
    }),
    deleteContent: builder.mutation({
      query: (id) => ({
        url: `/api/v1/contents/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contents"],
    }),
    toggleContentPublish: builder.mutation({
      query: (id) => ({
        url: `/api/v1/contents/${id}/publish`,
        method: "PATCH",
      }),
      invalidatesTags: ["Contents"],
    }),
    toggleContentFeatured: builder.mutation({
      query: (id) => ({
        url: `/api/v1/contents/${id}/featured`,
        method: "PATCH",
      }),
      invalidatesTags: ["Contents"],
    }),

    // =========================================================================
    // Banners
    // =========================================================================
    getBannerPlacements: builder.query({
      query: () => "/api/v1/banners/placements",
      providesTags: ["Banners"],
    }),
    getBannersByPlacement: builder.query({
      query: (placement) => `/api/v1/banners/placement/${placement}`,
      providesTags: ["Banners"],
    }),
    trackBannerClick: builder.mutation({
      query: (id) => ({
        url: `/api/v1/banners/${id}/click`,
        method: "POST",
      }),
    }),
    getAdminBanners: builder.query({
      query: (params) => ({
        url: "/api/v1/banners/",
        params,
      }),
      providesTags: ["Banners"],
    }),
    createBanner: builder.mutation({
      query: (data) => ({
        url: "/api/v1/banners/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Banners"],
    }),
    getBannerById: builder.query({
      query: (id) => `/api/v1/banners/${id}`,
      providesTags: (result, error, id) => [{ type: "Banners", id }],
    }),
    updateBanner: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/v1/banners/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Banners"],
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/api/v1/banners/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banners"],
    }),
    toggleBannerActive: builder.mutation({
      query: (id) => ({
        url: `/api/v1/banners/${id}/toggle`,
        method: "PATCH",
      }),
      invalidatesTags: ["Banners"],
    }),
    resetBannerStats: builder.mutation({
      query: (id) => ({
        url: `/api/v1/banners/${id}/reset-stats`,
        method: "POST",
      }),
      invalidatesTags: ["Banners"],
    }),

    // =========================================================================
    // Dashboard (Admin)
    // =========================================================================
    getDashboardStats: builder.query({
      query: () => "/api/v1/dashboard/stats",
      providesTags: ["Dashboard"],
    }),
    getRevenueChart: builder.query({
      query: (params) => ({
        url: "/api/v1/dashboard/revenue",
        params,
      }),
      providesTags: ["Dashboard"],
    }),
    getTopAudios: builder.query({
      query: (params) => ({
        url: "/api/v1/dashboard/top-audios",
        params,
      }),
      providesTags: ["Dashboard"],
    }),
    getRecentUsers: builder.query({
      query: (params) => ({
        url: "/api/v1/dashboard/recent-users",
        params,
      }),
      providesTags: ["Dashboard"],
    }),
    getSubscriptionStats: builder.query({
      query: () => "/api/v1/dashboard/subscriptions",
      providesTags: ["Dashboard"],
    }),
    getAffiliateStats: builder.query({
      query: () => "/api/v1/dashboard/affiliates",
      providesTags: ["Dashboard"],
    }),

    // =========================================================================
    // Invoices
    // =========================================================================
    getInvoices: builder.query({
      query: (params) => ({
        url: "/api/v1/invoices/",
        params,
      }),
      providesTags: ["Invoices"],
    }),
    getInvoiceById: builder.query({
      query: (id) => `/api/v1/invoices/${id}`,
      providesTags: (result, error, id) => [{ type: "Invoices", id }],
    }),
    payInvoice: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/v1/invoices/${id}/pay`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Invoices", "Subscriptions"],
    }),
    getAdminInvoices: builder.query({
      query: (params) => ({
        url: "/api/v1/invoices/admin/list",
        params,
      }),
      providesTags: ["Invoices"],
    }),
    getAdminInvoiceById: builder.query({
      query: (id) => `/api/v1/invoices/admin/${id}`,
      providesTags: (result, error, id) => [{ type: "Invoices", id }],
    }),
    createInvoice: builder.mutation({
      query: (data) => ({
        url: "/api/v1/invoices/admin/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Invoices"],
    }),
    cancelInvoice: builder.mutation({
      query: (id) => ({
        url: `/api/v1/invoices/admin/${id}/cancel`,
        method: "POST",
      }),
      invalidatesTags: ["Invoices"],
    }),

    // =========================================================================
    // Payments
    // =========================================================================
    purchaseSubscription: builder.mutation({
      query: (data) => ({
        url: "/api/v1/payments/subscriptions/purchase",
        method: "POST",
        body: data,
      }),
    }),
    checkPaymentStatus: builder.query({
      query: (orderId) => `/api/v1/payments/status/${orderId}`,
    }),
    getPaymentMethods: builder.query({
      query: () => "/api/v1/payments/methods",
      providesTags: ["Payments"],
    }),
    devBypassPayment: builder.mutation({
      query: (data) => ({
        url: "/api/v1/payments/dev/bypass",
        method: "POST",
        body: data,
      }),
    }),

    // =========================================================================
    // Uploads
    // =========================================================================
    uploadAudio: builder.mutation({
      query: (formData) => ({
        url: "/api/v1/uploads/audio",
        method: "POST",
        body: formData,
      }),
    }),
    uploadThumbnail: builder.mutation({
      query: (formData) => ({
        url: "/api/v1/uploads/thumbnail",
        method: "POST",
        body: formData,
      }),
    }),
    uploadAudioWithThumbnail: builder.mutation({
      query: (formData) => ({
        url: "/api/v1/uploads/audio-with-thumbnail",
        method: "POST",
        body: formData,
      }),
    }),
    uploadAvatar: builder.mutation({
      query: (formData) => ({
        url: "/api/v1/uploads/avatar",
        method: "POST",
        body: formData,
      }),
    }),

    // =========================================================================
    // AI Chat
    // =========================================================================
    chat: builder.mutation({
      query: (data) => ({
        url: "/api/v1/ai/chat",
        method: "POST",
        body: data,
      }),
    }),
    getChatSessions: builder.query({
      query: () => "/api/v1/ai/chats",
      providesTags: ["AI"],
    }),
    getChatSessionById: builder.query({
      query: (id) => `/api/v1/ai/chats/${id}`,
      providesTags: (result, error, id) => [{ type: "AI", id }],
    }),

    // =========================================================================
    // Affiliate Banks
    // =========================================================================
    getBanks: builder.query({
      query: () => "/api/v1/affiliates/banks",
      providesTags: ["Affiliates"],
    }),
    addBank: builder.mutation({
      query: (data) => ({
        url: "/api/v1/affiliates/banks",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Affiliates"],
    }),
    deleteBank: builder.mutation({
      query: (id) => ({
        url: `/api/v1/affiliates/banks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Affiliates"],
    }),
    getSupportedBanks: builder.query({
      query: () => "/api/v1/affiliates/banks/list",
      providesTags: ["Affiliates"],
    }),
    getWithdrawalBalance: builder.query({
      query: () => "/api/v1/affiliates/withdrawals/balance",
      providesTags: ["Affiliates"],
    }),

    // =========================================================================
    // Files (CDN) - Usually handled directly by the browser via URL, but if an
    // endpoint wrapper is needed for logic:
    // =========================================================================
    getFile: builder.query({
      query: (path) => ({
        url: `/api/v1/files/${path}`,
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  // Auth
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
  useUpdateMeMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useVerifyResetTokenQuery,
  useResetPasswordMutation,

  // Users
  useGetUsersQuery,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useToggleUserActiveMutation,

  // Audios
  useGetAudiosQuery,
  useGetAudioBySlugQuery,
  useGetAudioByIdQuery,
  useCreateAudioMutation,
  useUpdateAudioMutation,
  useDeleteAudioMutation,
  useGetAdminAudiosQuery,
  useToggleAudioPublishMutation,
  useStreamAudioQuery,

  // Categories
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

  // Favorites
  useGetFavoritesQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
  useToggleFavoriteMutation,
  useCheckFavoriteQuery,

  // History
  useGetHistoryQuery,
  useRecordHistoryMutation,
  useClearHistoryMutation,
  useGetHistoryProgressQuery,
  useRemoveHistoryItemMutation,

  // Prompts
  useGetPromptsQuery,
  useCreatePromptMutation,
  useGetPromptByIdQuery,
  useUpdatePromptMutation,
  useDeletePromptMutation,
  useGetPromptCategoriesQuery,

  // Subscriptions & Plans
  useGetPlansQuery,
  useGetMySubscriptionQuery,
  useSubscribeMutation,
  useCancelSubscriptionMutation,
  useGetAdminSubscriptionsQuery,
  useGetAdminPlansQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,

  // Affiliates
  useRegisterAffiliateMutation,
  useGetMyAffiliateQuery,
  useGetReferralsQuery,
  useUpdateAffiliatePaymentInfoMutation,
  useRequestWithdrawalMutation,
  useGetWithdrawalsQuery,
  useGetAdminAffiliatesQuery,
  useGetAdminAffiliateByIdQuery,
  useUpdateAdminAffiliateMutation,
  useProcessAffiliatePayoutMutation,

  // Contents
  useGetPublicContentsQuery,
  useGetPublicContentBySlugQuery,
  useGetContentCategoriesQuery,
  useGetContentTypesQuery,
  useGetAdminContentsQuery,
  useCreateContentMutation,
  useGetContentByIdQuery,
  useUpdateContentMutation,
  useDeleteContentMutation,
  useToggleContentPublishMutation,
  useToggleContentFeaturedMutation,

  // Banners
  useGetBannerPlacementsQuery,
  useGetBannersByPlacementQuery,
  useTrackBannerClickMutation,
  useGetAdminBannersQuery,
  useCreateBannerMutation,
  useGetBannerByIdQuery,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
  useToggleBannerActiveMutation,
  useResetBannerStatsMutation,

  // Dashboard
  useGetDashboardStatsQuery,
  useGetRevenueChartQuery,
  useGetTopAudiosQuery,
  useGetRecentUsersQuery,
  useGetSubscriptionStatsQuery,
  useGetAffiliateStatsQuery,

  // Invoices
  useGetInvoicesQuery,
  useGetInvoiceByIdQuery,
  usePayInvoiceMutation,
  useGetAdminInvoicesQuery,
  useGetAdminInvoiceByIdQuery,
  useCreateInvoiceMutation,
  useCancelInvoiceMutation,

  // Payments
  usePurchaseSubscriptionMutation,
  useCheckPaymentStatusQuery,
  useGetPaymentMethodsQuery,
  useDevBypassPaymentMutation,

  // Uploads
  useUploadAudioMutation,
  useUploadThumbnailMutation,
  useUploadAudioWithThumbnailMutation,
  useUploadAvatarMutation,

  // AI Chat
  useChatMutation,
  useGetChatSessionsQuery,
  useGetChatSessionByIdQuery,

  // Affiliate Banks
  useGetBanksQuery,
  useAddBankMutation,
  useDeleteBankMutation,
  useGetSupportedBanksQuery,
  useGetWithdrawalBalanceQuery,

  // Files
  useGetFileQuery,
} = sublimeApi;
