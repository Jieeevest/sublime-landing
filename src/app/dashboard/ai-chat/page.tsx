"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useI18n } from "@/i18n";
import {
  useGetChatHistoryQuery,
  useGetChatBySessionIdQuery,
  useDeleteChatSessionMutation,
  useGetMySubscriptionQuery,
} from "@/redux/api/sublimeApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export default function AIChatPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch subscription status
  const { data: subscriptionData, isFetching: isSubFetching } =
    useGetMySubscriptionQuery(undefined);
  const isSubscribed = subscriptionData?.is_subscribed ?? false;

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

  type AiStreamChunk = {
    sessionId?: string;
    content?: string;
  };

  const hasAutoSelectedRef = useRef(false);
  const [pendingChunks, setPendingChunks] = useState<string[]>([]);
  const [isNewChat, setIsNewChat] = useState<boolean>(false);

  const {
    data: historyData,
    isLoading: historyLoading,
    refetch: refetchHistory,
  } = useGetChatHistoryQuery(undefined);
  const filteredSessions = useMemo(() => {
    const list = (historyData?.data as ChatSession[]) || [];
    return [...list].sort((a, b) => {
      const ta = a.updated_at ? new Date(a.updated_at).getTime() : 0;
      const tb = b.updated_at ? new Date(b.updated_at).getTime() : 0;
      return tb - ta;
    });
  }, [historyData]);

  useEffect(() => {
    if (hasAutoSelectedRef.current) return;
    if (isNewChat) return;
    if (!selectedId && filteredSessions.length > 0) {
      const first = filteredSessions[0];
      setSelectedId(String(first.id));
      hasAutoSelectedRef.current = true;
    }
  }, [selectedId, filteredSessions, isNewChat]);

  const {
    data: detailData,
    isFetching: detailLoading,
    refetch: refetchDetail,
  } = useGetChatBySessionIdQuery(selectedId ?? skipToken);
  const detail =
    (detailData?.data as { title?: string; messages?: ChatMessage[] }) || {};
  const messages = detail.messages || [];
  const [deleteChat, { isLoading: deleting }] = useDeleteChatSessionMutation();
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentMessages, setCurrentMessages] = useState<ChatMessage[]>([]);

  const displayedMessages = isNewChat
    ? currentMessages
    : currentMessages.length > 0
      ? currentMessages
      : messages;

  const openConfirm = (id: string | number) => {
    setConfirmId(String(id));
    setIsConfirmOpen(true);
  };

  const closeConfirm = () => {
    setIsConfirmOpen(false);
    setConfirmId(null);
  };

  const handleConfirmDelete = async () => {
    if (!confirmId) return;
    try {
      await deleteChat(confirmId).unwrap();
      if (selectedId === confirmId) setSelectedId(null);
    } catch {}
    closeConfirm();
  };

  const handleSelectSession = (id: string | number) => {
    setSelectedId(String(id));
    setCurrentMessages([]);
    setIsNewChat(false);
  };

  const handleNewChat = () => {
    setSelectedId(null);
    setCurrentMessages([]);
    setPendingChunks([]);
    setIsNewChat(true);
  };

  const handleSuggestionClick = (text: string) => {
    if (!text || isStreaming) return;
    setInputValue(text);
    void handleSend(text);
  };

  const handleSend = async (overrideText?: string, overrideFile?: File) => {
    const raw = typeof overrideText === "string" ? overrideText : inputValue;
    const trimmed = raw.trim();
    const fileToSend = overrideFile || attachedFile;

    if ((!trimmed && !fileToSend) || isStreaming) return;

    setInputValue("");
    setIsStreaming(true);
    setPendingChunks([]);

    setCurrentMessages((prev) => {
      const shouldUseMessages = !isNewChat && selectedId && prev.length === 0;
      const base = shouldUseMessages ? messages || [] : prev;

      const userMessage: ChatMessage = {
        role: "user",
        content: fileToSend
          ? `[File: ${fileToSend.name}]\n${trimmed}`.trim()
          : trimmed,
      };

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: "",
      };

      return [...base, userMessage, assistantMessage];
    });

    let nextSessionId: string | null = selectedId;

    try {
      let response;
      if (fileToSend) {
        const formData = new FormData();
        const isImage = fileToSend.type.startsWith("image/");
        formData.append(isImage ? "image" : "audio", fileToSend);

        if (selectedId) {
          formData.append("sessionId", selectedId);
        }

        const headers: Record<string, string> = {};
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }
        }

        const endpoint = isImage
          ? "/api/v1/ai/chat/image"
          : "/api/v1/ai/chat/audio";

        response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: "POST",
          headers,
          body: formData,
        });

        setAttachedFile(null);
      } else {
        const body: {
          sessionId?: string | null;
          messages: { role: string; content: string }[];
        } = {
          messages: [{ role: "user", content: trimmed }],
        };

        if (selectedId) {
          body.sessionId = selectedId;
        }

        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };

        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }
        }

        response = await fetch(`${API_BASE_URL}/api/v1/ai/chat`, {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        });
      }

      if (!response.ok || !response.body) {
        throw new Error("Failed to start AI chat");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";

        for (const part of parts) {
          const lines = part.split("\n");
          for (const line of lines) {
            if (!line.startsWith("data:")) continue;
            const dataStr = line.slice(5).trim();
            if (!dataStr || dataStr === "[DONE]") continue;

            try {
              const parsed = JSON.parse(dataStr) as AiStreamChunk;

              if (parsed.sessionId && !nextSessionId) {
                nextSessionId = parsed.sessionId;
                setSelectedId(parsed.sessionId);
                setIsNewChat(false);
              }

              if (parsed.content && parsed.content.length > 0) {
                setPendingChunks((prev) => [...prev, parsed.content as string]);
              }
            } catch {
              continue;
            }
          }
        }
      }

      if (nextSessionId) {
        refetchDetail();
      }
      refetchHistory();
    } catch {
    } finally {
      setIsStreaming(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        if (audioChunksRef.current.length > 0) {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/mp3",
          });
          const file = new File([audioBlob], "audio-message.mp3", {
            type: "audio/mp3",
          });
          void handleSend("", file);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      audioChunksRef.current = [];
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    }
  };

  useEffect(() => {
    if (pendingChunks.length === 0) return;

    const timer = setTimeout(() => {
      const [next, ...rest] = pendingChunks;
      setPendingChunks(rest);

      setCurrentMessages((prev) => {
        if (prev.length === 0) return prev;
        const updated = [...prev];
        for (let i = updated.length - 1; i >= 0; i -= 1) {
          if (updated[i].role === "assistant") {
            updated[i] = {
              ...updated[i],
              content: (updated[i].content || "") + next,
            };
            break;
          }
        }
        return updated;
      });
    }, 60);

    return () => clearTimeout(timer);
  }, [pendingChunks]);

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
            <button
              type="button"
              onClick={handleNewChat}
              disabled={!isSubFetching && !isSubscribed}
              className={`w-[272px] h-11 rounded-full flex items-center justify-center gap-2 text-white transition-colors ${!isSubFetching && !isSubscribed ? "bg-gray-300 cursor-not-allowed" : "bg-[#3197A5] hover:bg-[#288a96]"}`}
            >
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
            {!isSubFetching && !isSubscribed ? (
              <div className="flex flex-col items-center justify-center pt-8 px-4 text-center opacity-50">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-2"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <div className="text-xs text-gray-500 font-sans">
                  {t("ai_locked_title")}
                </div>
              </div>
            ) : historyLoading ? (
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
                  <div
                    key={String(s.id)}
                    className={`w-full h-11 rounded-full grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 px-4 border transition-colors ${
                      active
                        ? "bg-[#E6F5F7] border-[#3197A5]/60 shadow-sm hover:bg-[#D9EFF2]"
                        : "border-transparent hover:bg-gray-50"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectSession(s.id)}
                      className="min-w-0 text-left"
                      aria-pressed={active}
                    >
                      <span
                        className={`block max-w-full truncate text-sm font-sans ${
                          active ? "text-[#155B63]" : "text-[#1F1F1F]"
                        }`}
                      >
                        {label}
                      </span>
                    </button>
                    {dateStr ? (
                      <span className="text-[11px] text-[#8E8E8E] font-sans text-right">
                        {dateStr}
                      </span>
                    ) : (
                      <span />
                    )}
                    <button
                      type="button"
                      onClick={() => openConfirm(s.id)}
                      disabled={deleting}
                      aria-label="Hapus obrolan ini"
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-[#F64C4C] disabled:opacity-50 justify-self-end"
                    >
                      <svg
                        width="16"
                        height="16"
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
                );
              })
            )}
          </div>
        </div>

        {/* Main Chat Content */}
        {!isSubFetching && !isSubscribed ? (
          <div className="flex-1 flex flex-col items-center justify-center relative px-6 py-2 md:px-8 md:py-4 h-full">
            <div className="w-full max-w-[500px] flex flex-col items-center text-center p-10 bg-white border border-[#E1E1E1] rounded-[24px] shadow-sm">
              <div className="w-24 h-24 bg-[#F3F8F9] rounded-full flex items-center justify-center mb-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3197A5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#1F1F1F] mb-4">
                {t("ai_locked_title")}
              </h2>
              <p className="text-gray-600 mb-8 max-w-[400px] leading-relaxed">
                {t("ai_locked_desc")}
              </p>
              <button
                onClick={() => router.push("/dashboard/subscriptions/payment")}
                className="bg-[#3197A5] hover:bg-[#288a96] text-white px-8 py-3.5 rounded-full font-medium transition-colors shadow-lg shadow-[#3197A5]/20 w-fit"
              >
                {t("ai_locked_btn")}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-start relative px-6 py-2 md:px-8 md:py-4">
            {/* Background Elements (Gradients/Blur based on CSS) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Placeholders for complex background images/gradients */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] opacity-10 bg-gradient-to-r from-[#55BDC0] to-[#3197A5] blur-3xl rounded-full"></div>
            </div>

            {/* Conversation Area (with hero for empty state) */}
            <div className="z-10 w-full max-w-[947px] flex flex-col gap-2 h-full">
              <div className="flex items-center justify-between mt-1">
                <h2 className="text-xl font-semibold text-[#1F1F1F]">
                  {isNewChat && !selectedId
                    ? t("ai_new_chat")
                    : detail.title || t("ud_menu_ai_chat")}
                </h2>
                <div />
              </div>
              <div className="flex-1 min-h-0 w-full overflow-y-auto space-y-3 flex flex-col p-2">
                {detailLoading ? (
                  <div className="text-sm text-gray-500">
                    {t("common_loading")}
                  </div>
                ) : displayedMessages.length === 0 &&
                  (!selectedId || isNewChat) ? (
                  <div className="flex flex-col items-center justify-center flex-1">
                    <div className="flex flex-col items-center gap-4 mb-6 text-center">
                      <div className="relative mb-4">
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

                      <h1 className="text-[32px] md:text-[40px] font-bold font-sans leading-tight bg-gradient-to-r from-[#3197A5] to-[#55BDC0] bg-clip-text text-transparent">
                        {t("ai_hero_hi")}, Kiara <br />
                        <span className="text-[#1F1F1F]">
                          {t("ai_hero_question")}
                        </span>
                      </h1>
                      <p className="text-[#1F1F1F] text-base font-sans max-w-[620px]">
                        {t("ai_hero_desc")}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[947px]">
                      {[
                        t("ai_suggestion_1"),
                        t("ai_suggestion_2"),
                        t("ai_suggestion_3"),
                      ].map((text, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSuggestionClick(text)}
                          className="bg-[rgba(31,31,31,0.04)] border border-[rgba(31,31,31,0.08)] rounded-lg px-4 py-3 cursor-pointer hover:bg-[rgba(31,31,31,0.08)] transition-colors h-[74px] flex items-center justify-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3197A5] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                        >
                          <p className="text-[#1F1F1F] text-sm font-sans text-center leading-snug">
                            {text}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : displayedMessages.length === 0 ? (
                  <div className="text-sm text-gray-500">
                    {t("dashboard_empty_data")}
                  </div>
                ) : (
                  displayedMessages.map((m, i) => {
                    const isTypingIndicator =
                      m.role === "assistant" &&
                      isStreaming &&
                      i === displayedMessages.length - 1 &&
                      (!m.content || m.content.length === 0) &&
                      pendingChunks.length === 0;

                    return (
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
                          {isTypingIndicator ? (
                            <span className="inline-flex gap-1 text-base tracking-widest">
                              <span className="w-1 h-1 rounded-full bg-[#1F1F1F] animate-pulse" />
                              <span className="w-1 h-1 rounded-full bg-[#1F1F1F] animate-pulse" />
                              <span className="w-1 h-1 rounded-full bg-[#1F1F1F] animate-pulse" />
                            </span>
                          ) : (
                            <ReactMarkdown
                              components={{
                                p: (props) => (
                                  <p
                                    className="whitespace-pre-wrap mb-2"
                                    {...props}
                                  />
                                ),
                                ul: (props) => (
                                  <ul
                                    className="list-disc pl-5 mb-2"
                                    {...props}
                                  />
                                ),
                                ol: (props) => (
                                  <ol
                                    className="list-decimal pl-5 mb-2"
                                    {...props}
                                  />
                                ),
                                li: (props) => (
                                  <li className="mb-1" {...props} />
                                ),
                                strong: (props) => (
                                  <strong
                                    className="font-semibold"
                                    {...props}
                                  />
                                ),
                                em: (props) => (
                                  <em className="italic" {...props} />
                                ),
                              }}
                            >
                              {m.content}
                            </ReactMarkdown>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
                {/* Scroll Target */}
                <div
                  ref={(el) => {
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                />
              </div>
              {/* Chat Input */}
              <div className="z-10 w-full max-w-[947px]">
                {attachedFile && (
                  <div className="w-full flex items-center gap-3 mb-3 px-4 py-3 bg-white border border-[#E1E1E1] rounded-xl shadow-sm">
                    {attachedFile.type.startsWith("image/") ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#3197A5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#3197A5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 18V5l12-2v13"></path>
                        <circle cx="6" cy="18" r="3"></circle>
                        <circle cx="18" cy="16" r="3"></circle>
                      </svg>
                    )}
                    <span className="text-sm text-gray-700 truncate font-medium">
                      {attachedFile.name}
                    </span>
                    <button
                      onClick={() => setAttachedFile(null)}
                      className="ml-auto w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#F64C4C] transition-colors"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                )}
                <div className="w-full h-[54px] bg-white border border-[#E1E1E1] rounded-full flex items-center px-4 shadow-sm focus-within:border-[#3197A5] transition-colors relative overflow-hidden">
                  {isRecording ? (
                    <div className="flex-1 flex items-center justify-between w-full h-full animate-in fade-in duration-200">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F64C4C] animate-pulse"></span>
                        <span className="font-mono text-sm font-medium text-[#F64C4C] min-w-[40px]">
                          {Math.floor(recordingTime / 60)}:
                          {(recordingTime % 60).toString().padStart(2, "0")}
                        </span>
                      </div>

                      <div className="flex-1 flex justify-center items-center gap-1 h-6 px-4">
                        {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((n, i) => (
                          <div
                            key={i}
                            className="w-1 bg-[#3197A5] rounded-full animate-pulse"
                            style={{
                              height: `${Math.max(8, n * 6)}px`,
                              animationDelay: `${i * 100}ms`,
                            }}
                          ></div>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={cancelRecording}
                          className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={stopRecording}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#3197A5] text-white hover:bg-[#288a96] transition-colors shadow-sm"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Plus Button */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        title={t("ai_upload_tooltip")}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#1F1F1F] mr-2 transition-colors relative group"
                      >
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
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*,audio/mpeg,audio/wav,audio/flac,.mp3,.wav,.flac"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setAttachedFile(e.target.files[0]);
                            e.target.value = "";
                          }
                        }}
                      />

                      {/* Input Field */}
                      <input
                        type="text"
                        placeholder={t("ai_input_placeholder")}
                        className="flex-1 h-full outline-none text-[#1F1F1F] placeholder:text-[#8E8E8E] font-sans text-sm bg-transparent"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            void handleSend();
                          }
                        }}
                      />

                      {/* Right Actions */}
                      <div className="flex items-center gap-2 ml-2">
                        <button
                          type="button"
                          title={t("ai_record_tooltip")}
                          onClick={startRecording}
                          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#1F1F1F] transition-colors"
                        >
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
                        <button
                          type="button"
                          title={t("ai_send_tooltip")}
                          onClick={() => {
                            void handleSend();
                          }}
                          disabled={
                            isStreaming || (!inputValue.trim() && !attachedFile)
                          }
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3197A5] text-white hover:bg-[#288a96] transition-colors shadow-md disabled:opacity-60"
                        >
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
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {isConfirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-[#1F1F1F]">
                Hapus Obrolan
              </h3>
              <button
                onClick={closeConfirm}
                className="p-2 -mr-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                aria-label="Tutup modal"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-sm text-[#1F1F1F]">
                Obrolan akan dihapus permanen. Anda yakin ingin melanjutkan?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeConfirm}
                  className="px-4 py-2 rounded-full border border-gray-300 text-[#1F1F1F] hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={deleting}
                  className="px-4 py-2 rounded-full bg-[#F64C4C] text-white hover:bg-[#e04343] disabled:opacity-50"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
