"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Image from "next/image";
import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useI18n } from "@/i18n";
import {
  useGetChatHistoryQuery,
  useGetChatBySessionIdQuery,
  useDeleteChatSessionMutation,
} from "@/redux/api/sublimeApi";
import { skipToken } from "@reduxjs/toolkit/query";

export default function AIChatPage() {
  const { t } = useI18n();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  type ChatSession = {
    id: string | number;
    title?: string;
    summary?: string;
    updated_at?: string;
  };
  type ChatMessage = {
    role: string;
    content: string;
    created_at?: string;
  };

  const { data: historyData, isLoading: historyLoading } =
    useGetChatHistoryQuery(undefined);
  const filteredSessions = useMemo(() => {
    const list = (historyData?.data as ChatSession[]) || [];
    return [...list].sort((a, b) => {
      const ta = a.updated_at ? new Date(a.updated_at).getTime() : 0;
      const tb = b.updated_at ? new Date(b.updated_at).getTime() : 0;
      return tb - ta;
    });
  }, [historyData]);

  const { data: detailData, isFetching: detailLoading } =
    useGetChatBySessionIdQuery(selectedId ?? skipToken);
  const detail =
    (detailData?.data as { title?: string; messages?: ChatMessage[] }) || {};
  const messages = detail.messages || [];
  const [deleteChat, { isLoading: deleting }] = useDeleteChatSessionMutation();
  const handleDelete = async () => {
    if (!selectedId) return;
    const ok = window.confirm("Hapus obrolan ini?");
    if (!ok) return;
    try {
      await deleteChat(selectedId).unwrap();
      setSelectedId(null);
    } catch {}
  };

  return (
    <DashboardLayout activeItem={t("ud_menu_ai_chat")}>
      <div className="flex h-[calc(100vh-100px)] w-full max-w-[1347px] mx-auto border-t border-[#E1E1E1] box-border">
        {/* Chat Navigation Sidebar */}
        <div
          className={`${isCollapsed ? "w-20" : "w-[320px]"} h-full flex flex-col items-center border-r border-[#E1E1E1] pb-4 transition-[width] duration-200`}
        >
          {/* Header */}
          <div className="w-full flex justify-between items-center px-4 py-4">
            <div
              className={`${isCollapsed ? "hidden" : "flex"} items-center gap-2`}
            >
              <Image
                src="/strovia-log.png"
                alt="STROVIA"
                width={140}
                height={40}
                className="object-contain h-8 w-auto md:h-9"
              />
            </div>
            <button
              type="button"
              onClick={() => setIsCollapsed((v) => !v)}
              aria-pressed={isCollapsed}
              aria-label={isCollapsed ? "Perbesar sidebar" : "Perkecil sidebar"}
              className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8E8E8E"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 3v18" />
              </svg>
            </button>
          </div>

          {/* Actions Stack */}
          <div
            className={`w-full flex flex-col items-center px-6 py-3 gap-3 ${isCollapsed ? "hidden" : ""}`}
          >
            {/* New Chat Button */}
            <button className="w-[272px] h-11 bg-[#3197A5] rounded-full flex items-center justify-center gap-2 text-white hover:bg-[#288a96] transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              <span className="font-sans font-normal text-base">
                {t("ai_new_chat")}
              </span>
            </button>
          </div>

          {/* Chat List Header */}
          <div
            className={`w-full flex justify-between items-center ${isCollapsed ? "px-2" : "px-6"} h-10 border-y border-dashed border-[#E1E1E1] ${isCollapsed ? "hidden" : "flex"}`}
          >
            <span className="text-[#8E8E8E] font-medium text-xs font-sans">
              {t("ai_sidebar_your_chats")}
            </span>
            {/* <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8E8E8E"
              strokeWidth="1.5"
            >
              <path d="m6 9 6 6 6-6" />
            </svg> */}
          </div>

          {/* Chat List */}
          <div
            className={`w-full flex-1 overflow-y-auto px-4 py-2 space-y-1 ${isCollapsed ? "hidden" : ""}`}
          >
            {historyLoading ? (
              <div className="text-xs text-gray-500 px-4 py-2">
                {t("common_loading")}
              </div>
            ) : filteredSessions.length === 0 ? (
              <div className="text-xs text-gray-500 px-4 py-2">
                {t("dashboard_empty_data")}
              </div>
            ) : (
              filteredSessions.map((s) => {
                const label = s.title || `Chat ${String(s.id)}`;
                const active = selectedId === String(s.id);
                const dateStr = s.updated_at
                  ? new Date(s.updated_at).toLocaleDateString(undefined, {
                      day: "2-digit",
                      month: "short",
                    })
                  : "";
                return (
                  <button
                    key={String(s.id)}
                    onClick={() => setSelectedId(String(s.id))}
                    className={`w-full h-11 rounded-full flex items-center px-4 hover:bg-gray-50 transition-colors ${
                      active ? "bg-gray-100" : ""
                    }`}
                    aria-pressed={active}
                  >
                    <span className="text-[#1F1F1F] text-sm font-sans truncate text-left">
                      {label}
                    </span>
                    {dateStr ? (
                      <span className="ml-auto text-[11px] text-[#8E8E8E] font-sans">
                        {dateStr}
                      </span>
                    ) : null}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Main Chat Content */}
        <div className="flex-1 flex flex-col items-center justify-start relative px-6 py-2 md:px-8 md:py-4">
          {/* Background Elements (Gradients/Blur based on CSS) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Placeholders for complex background images/gradients */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] opacity-10 bg-gradient-to-r from-[#55BDC0] to-[#3197A5] blur-3xl rounded-full"></div>
          </div>

          {/* Hero or Conversation */}
          {!selectedId ? (
            <>
              <div className="z-10 flex flex-col items-center gap-4 mb-10 text-center">
                <div className="relative mb-4">
                  {/* Robot/Avatar Icon */}
                  {/* Fallback if no robot image */}
                  <div className="w-[90px] h-[90px] bg-white rounded-2xl shadow-lg flex items-center justify-center">
                    <Image
                      src="/robot.png"
                      alt={t("ai_robot_alt")}
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                </div>

                <h1 className="text-[40px] font-bold font-sans leading-tight bg-gradient-to-r from-[#3197A5] to-[#55BDC0] bg-clip-text text-transparent">
                  {t("ai_hero_hi")}, Kiara <br />
                  <span className="text-[#1F1F1F]">
                    {t("ai_hero_question")}
                  </span>
                </h1>
                <p className="text-[#1F1F1F] text-base font-sans">
                  {t("ai_hero_desc")}
                </p>
              </div>
              {/* Suggestions Grid */}
              <div className="z-10 grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-[947px] mb-10">
                {[
                  t("ai_suggestion_1"),
                  t("ai_suggestion_2"),
                  t("ai_suggestion_3"),
                ].map((text, i) => (
                  <div
                    key={i}
                    className="bg-[rgba(31,31,31,0.04)] border border-[rgba(31,31,31,0.08)] rounded-lg p-4 cursor-pointer hover:bg-[rgba(31,31,31,0.08)] transition-colors h-[74px] flex items-center justify-center"
                  >
                    <p className="text-[#1F1F1F] text-sm font-sans text-center leading-snug">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="z-10 w-full max-w-[947px] flex flex-col gap-3 h-full">
              <div className="flex items-center justify-between mt-1">
                <h2 className="text-xl font-semibold text-[#1F1F1F]">
                  {detail.title || t("ud_menu_ai_chat")}
                </h2>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={!selectedId || deleting}
                  aria-label="Hapus obrolan ini"
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-50 text-[#F64C4C] disabled:opacity-50"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 min-h-0 w-full overflow-y-auto space-y-3 flex flex-col justify-end">
                {detailLoading ? (
                  <div className="text-sm text-gray-500">
                    {t("common_loading")}
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-sm text-gray-500">
                    {t("dashboard_empty_data")}
                  </div>
                ) : (
                  messages.map((m, i) => (
                    <div
                      key={i}
                      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                          m.role === "user"
                            ? "bg-[#3197A5] text-white rounded-br-sm"
                            : "bg-white border border-gray-300 text-[#1F1F1F] rounded-bl-sm"
                        }`}
                        aria-label={`${m.role}`}
                      >
                        <ReactMarkdown
                          components={{
                            p: (props) => (
                              <p
                                className="whitespace-pre-wrap mb-2"
                                {...props}
                              />
                            ),
                            ul: (props) => (
                              <ul className="list-disc pl-5 mb-2" {...props} />
                            ),
                            ol: (props) => (
                              <ol
                                className="list-decimal pl-5 mb-2"
                                {...props}
                              />
                            ),
                            li: (props) => <li className="mb-1" {...props} />,
                            strong: (props) => (
                              <strong className="font-semibold" {...props} />
                            ),
                            em: (props) => <em className="italic" {...props} />,
                          }}
                        >
                          {m.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {/* Chat Input */}
              <div className="z-10 w-full max-w-[947px] mt-2">
                <div className="w-full h-[54px] bg-white border border-[#E1E1E1] rounded-full flex items-center px-4 shadow-sm focus-within:border-[#3197A5] transition-colors">
                  {/* Plus Button */}
                  <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#1F1F1F] mr-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>

                  {/* Input Field */}
                  <input
                    type="text"
                    placeholder={t("ai_input_placeholder")}
                    className="flex-1 h-full outline-none text-[#1F1F1F] placeholder:text-[#8E8E8E] font-sans text-sm bg-transparent"
                  />

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 ml-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#1F1F1F]">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                        <line x1="12" y1="19" x2="12" y2="23" />
                        <line x1="8" y1="23" x2="16" y2="23" />
                      </svg>
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3197A5] text-white hover:bg-[#288a96] transition-colors shadow-md">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 2 11 13" />
                        <path d="M22 2 15 22 11 13 2 9 22 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
