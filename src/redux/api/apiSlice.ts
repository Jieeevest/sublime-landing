import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      // Get token from localStorage if it exists
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: [
    "Auth",
    "Users",
    "Audios",
    "Categories",
    "Favorites",
    "History",
    "Prompts",
    "Subscriptions",
    "Plans",
    "Affiliates",
    "Payments",
    "Contents",
    "Banners",
    "Dashboard",
    "Invoices",
    "Uploads",
    "Files",
    "AI",
  ],
  endpoints: () => ({}),
});
