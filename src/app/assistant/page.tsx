"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Send,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  Trash2,
  Plus,
  MessageSquare,
  AlertCircle,
  Menu,
  X,
  ShieldCheck,
  MapPin,
  DoorOpen,
  Calendar,
  BookOpen,
  ArrowRight,
  Compass,
} from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import {
  ChatMessage,
  ChatSession,
  AssistantApiResponse,
  AssistantActionLink,
} from "@/types/assistant";

const SUGGESTED_QUESTIONS = [
  "Banke Bihari Mandir ke kitne verified entry gates hain?",
  "Sabhi verified gates map par dikhao.",
  "Braj mein ek din ki trip plan karo.",
  "Laddu Gopal Ji ki seva ka mahatva batao.",
  "Vrindavan ke famous temples suggest karo.",
];

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: "welcome-msg",
  role: "assistant",
  content:
    "राधे राधे! I am **AI Mitra**, your intelligent pilgrimage companion for Braj Bhoomi. I can assist you with verified darshan schedules, one-way temple entry gates, footwear cloaks, 21 km parikrama rules, and sacred Krishna lila stories across Mathura, Vrindavan, Govardhan, Barsana, Nandgaon, and Gokul.\n\nSelect a suggested question below or type your query to begin.",
  timestamp: "Just now",
  metadata: {
    mode: "knowledge_base",
    engineName: "BrajMitra Knowledge Engine • Dev Verifier",
    disclaimer:
      "All operational timings and gate directions are retrieved from official temple trust records and district police audits.",
    actionLinks: [
      {
        title: "Explore 12 Sacred Temples",
        href: "/temples",
        badge: "Directory",
        icon: "temple",
      },
      {
        title: "Open Interactive Gate Finder",
        href: "/gate-finder",
        badge: "Leaflet Radar",
        icon: "gate",
      },
      {
        title: "Smart Pilgrimage Planner",
        href: "/planner",
        badge: "Yatra Plans",
        icon: "calendar",
      },
    ],
    llmConfigStatus: {
      configured: false,
      note: "Development Knowledge Engine active. Server-side GEMINI_API_KEY activates live LLM generation.",
    },
  },
};

export default function AssistantPage() {
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const idCounter = useRef(100);

  // Sessions management
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: "session-1",
      title: "Current Pilgrimage Query",
      createdAt: "Today",
      updatedAt: "Just now",
      messages: [INITIAL_WELCOME_MESSAGE],
    },
  ]);
  const [activeSessionId, setActiveSessionId] = useState<string>("session-1");

  const activeSession =
    sessions.find((s) => s.id === activeSessionId) || sessions[0];
  const messages = activeSession.messages;

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleCopyText = (messageId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(messageId);
    setTimeout(() => {
      setCopiedMessageId(null);
    }, 2000);
  };

  const handleNewChat = () => {
    idCounter.current += 1;
    const newSessionId = `session-${idCounter.current}`;
    const newSession: ChatSession = {
      id: newSessionId,
      title: "New Pilgrimage Chat",
      createdAt: "Today",
      updatedAt: "Just now",
      messages: [INITIAL_WELCOME_MESSAGE],
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSessionId);
    setIsSidebarOpenMobile(false);
    setErrorMessage(null);
  };

  const handleClearCurrentChat = () => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeSessionId
          ? {
              ...s,
              title: "Cleared Chat",
              messages: [INITIAL_WELCOME_MESSAGE],
              updatedAt: "Just now",
            }
          : s
      )
    );
    setErrorMessage(null);
  };

  const handleClearAllHistory = () => {
    idCounter.current += 1;
    const freshSessionId = `session-${idCounter.current}`;
    setSessions([
      {
        id: freshSessionId,
        title: "Fresh Pilgrimage Chat",
        createdAt: "Today",
        updatedAt: "Just now",
        messages: [INITIAL_WELCOME_MESSAGE],
      },
    ]);
    setActiveSessionId(freshSessionId);
    setIsSidebarOpenMobile(false);
    setErrorMessage(null);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    setErrorMessage(null);
    setInputQuery("");

    idCounter.current += 1;
    const userMessageId = `msg-user-${idCounter.current}`;
    const userMessage: ChatMessage = {
      id: userMessageId,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
    };

    // Update session title on first user message if default
    const isFirstUserMessage = activeSession.messages.length <= 1;
    const newTitle = isFirstUserMessage
      ? query.slice(0, 32) + (query.length > 32 ? "..." : "")
      : activeSession.title;

    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeSessionId
          ? {
              ...s,
              title: newTitle,
              messages: [...s.messages, userMessage],
              updatedAt: "Just now",
            }
          : s
      )
    );

    setIsLoading(true);

    try {
      // Call server-side assistant route
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          history: messages.slice(-6).map((m) => ({
            role: m.role,
            content: m.content,
          })),
          sessionId: activeSessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Assistant API returned error status ${response.status}: ${response.statusText}`
        );
      }

      const data = (await response.json()) as AssistantApiResponse;

      idCounter.current += 1;
      const assistantMessage: ChatMessage = {
        id: `msg-ai-${idCounter.current}`,
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "sent",
        metadata: data.metadata,
      };

      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId
            ? {
                ...s,
                messages: [...s.messages, assistantMessage],
                updatedAt: "Just now",
              }
            : s
        )
      );
    } catch (err: unknown) {
      const errText =
        err instanceof Error
          ? err.message
          : "Could not reach BrajMitra server assistant.";
      setErrorMessage(
        `${errText} You may retry the question or consult the offline verified directories below.`
      );
    } finally {
      setIsLoading(false);
      textareaRef.current?.focus();
    }
  };

  const renderActionLinkIcon = (icon?: AssistantActionLink["icon"]) => {
    switch (icon) {
      case "gate":
        return <DoorOpen className="w-3.5 h-3.5 text-braj-saffron-600" />;
      case "map":
        return <MapPin className="w-3.5 h-3.5 text-braj-gold-600" />;
      case "calendar":
        return <Calendar className="w-3.5 h-3.5 text-emerald-600" />;
      case "culture":
        return <BookOpen className="w-3.5 h-3.5 text-braj-indigo-600" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-braj-gold-600" />;
    }
  };

  return (
    <PageContainer paddingY="lg" className="space-y-8">
      {/* Breadcrumb Trail */}
      <PageBreadcrumb
        items={[
          { label: "Braj Bhoomi", href: "/" },
          { label: "AI Mitra Travel Assistant" },
        ]}
      />

      {/* Main Section Heading */}
      <SectionHeading
        badge="Conversational Pilgrim Companion"
        badgeVariant="saffron"
        title="AI Mitra: Spiritual & Operational Braj Guide"
        subtitle="Interact with verified sthala-purana narratives, one-way temple gate intelligence, and customized pilgrimage planning in a reverent bilingual dialogue."
        align="left"
      />

      {/* Development Transparency & Configuration Notice Banner */}
      <div className="p-4 rounded-2xl bg-braj-cream-100/90 border border-braj-cream-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-braj-gold-600 shrink-0" />
          <div className="text-braj-cream-900">
            <strong className="text-braj-indigo-950 font-bold block">
              Development Engine Mode • Rule-Based Knowledge Dispatch Active
            </strong>
            Responses are formulated using verified temple trust records and district police audits. Server-side LLM API bridge is configured for Gemini integration.
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <StatusBadge variant="gold" size="sm">
            Factual Verification ON
          </StatusBadge>
          <StatusBadge variant="indigo" size="sm">
            Zero Fake Telemetry
          </StatusBadge>
        </div>
      </div>

      {/* Main Chat Interface Container with Sidebar */}
      <div className="bg-white rounded-3xl border-2 border-braj-gold-500/30 shadow-md overflow-hidden flex flex-col md:flex-row h-[720px] relative">
        {/* Mobile Sidebar Overlay Toggle */}
        <div className="md:hidden p-3 bg-braj-indigo-950 text-white flex items-center justify-between border-b border-braj-indigo-800">
          <button
            type="button"
            onClick={() => setIsSidebarOpenMobile(!isSidebarOpenMobile)}
            className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-braj-indigo-900 border border-braj-indigo-700 text-braj-cream-100 cursor-pointer"
          >
            {isSidebarOpenMobile ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span>Chat History ({sessions.length})</span>
          </button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNewChat}
            className="text-xs"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            <span>New Chat</span>
          </Button>
        </div>

        {/* Sidebar: Conversation History (Desktop + Mobile Drawer) */}
        <aside
          className={`${
            isSidebarOpenMobile ? "flex" : "hidden"
          } md:flex flex-col w-full md:w-64 lg:w-72 bg-braj-cream-50 border-r border-braj-cream-300 z-30 absolute md:static inset-y-0 left-0 transition-transform`}
        >
          {/* Sidebar Top: New Chat Button */}
          <div className="p-4 border-b border-braj-cream-300 space-y-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleNewChat}
              className="w-full text-xs justify-center"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              <span>New Pilgrimage Chat</span>
            </Button>
          </div>

          {/* Sessions List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin">
            <span className="text-[10px] font-bold uppercase tracking-wider text-braj-cream-700 px-2 block mb-1">
              Recent Conversations
            </span>
            {sessions.map((session) => {
              const isActive = session.id === activeSessionId;
              return (
                <button
                  key={session.id}
                  type="button"
                  onClick={() => {
                    setActiveSessionId(session.id);
                    setIsSidebarOpenMobile(false);
                    setErrorMessage(null);
                  }}
                  className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? "bg-braj-indigo-900 text-white font-semibold shadow-2xs"
                      : "text-braj-indigo-950 hover:bg-braj-cream-200/80 bg-white border border-braj-cream-200"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <MessageSquare
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isActive ? "text-braj-gold-400" : "text-braj-cream-700"
                      }`}
                    />
                    <span className="truncate">{session.title}</span>
                  </div>
                  <span
                    className={`text-[10px] shrink-0 font-medium ${
                      isActive ? "text-braj-cream-300" : "text-braj-cream-600"
                    }`}
                  >
                    {session.messages.length} msgs
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sidebar Bottom: Clear All Option & Engine Status */}
          <div className="p-3 border-t border-braj-cream-300 bg-white space-y-2">
            <button
              type="button"
              onClick={handleClearAllHistory}
              className="w-full text-xs text-red-700 hover:text-red-900 hover:bg-red-50 p-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All History</span>
            </button>

            <div className="text-[10px] text-center text-braj-cream-700 pt-1 border-t border-braj-cream-200">
              BrajMitra Knowledge Base v1.2
            </div>
          </div>
        </aside>

        {/* Main Chat Workspace */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
          {/* Chat Pane Header */}
          <div className="p-4 bg-braj-indigo-950 text-white border-b border-braj-indigo-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-braj-saffron-500 to-braj-gold-500 text-white flex items-center justify-center shadow-xs">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-sm text-white">
                    {activeSession.title}
                  </h3>
                  <StatusBadge variant="gold" size="sm">
                    Verified Knowledge
                  </StatusBadge>
                </div>
                <p className="text-[11px] text-braj-cream-300">
                  Temple Schedules • Gate Routing • Sacred Lila • Parikrama
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearCurrentChat}
                className="text-xs text-white border-white/20 hover:bg-white/10"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                <span className="hidden sm:inline">Reset</span>
              </Button>
            </div>
          </div>

          {/* Messages Log Stream */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 bg-braj-cream-50/50">
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              const isCopied = copiedMessageId === msg.id;

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    isUser ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Sender Avatar */}
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 text-xs font-bold shadow-2xs ${
                      isUser
                        ? "bg-braj-indigo-900 text-white"
                        : "bg-gradient-to-br from-braj-saffron-600 to-braj-gold-600 text-white"
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : "श्री"}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[88%] sm:max-w-[78%] flex flex-col space-y-2.5 ${
                      isUser ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`p-4 sm:p-5 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-2xs whitespace-pre-line ${
                        isUser
                          ? "bg-braj-indigo-900 text-white rounded-tr-none shadow-xs"
                          : "bg-white text-braj-indigo-950 rounded-tl-none border border-braj-cream-300"
                      }`}
                    >
                      <p>{msg.content}</p>

                      {/* Assistant Verified Facts Callout */}
                      {msg.metadata?.verifiedFacts && msg.metadata.verifiedFacts.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-braj-cream-200/90 space-y-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            <span>Verified Fact Check:</span>
                          </span>
                          {msg.metadata.verifiedFacts.map((fact, i) => (
                            <div
                              key={i}
                              className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-200 text-[11px] text-emerald-950 space-y-0.5"
                            >
                              <p className="font-medium">{fact.fact}</p>
                              <span className="text-[10px] text-emerald-700 block">
                                Source: {fact.source} • Verified: {fact.lastVerified}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Action Links to Destination Pages */}
                      {msg.metadata?.actionLinks && msg.metadata.actionLinks.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-braj-cream-200 space-y-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-braj-cream-700 block">
                            Direct Destination Navigation:
                          </span>
                          <div className="grid grid-cols-1 gap-2">
                            {msg.metadata.actionLinks.map((link, idx) => (
                              <Link
                                key={idx}
                                href={link.href}
                                className="p-2.5 rounded-xl bg-braj-cream-100 hover:bg-braj-saffron-50 border border-braj-cream-300 hover:border-braj-saffron-300 transition-colors flex items-center justify-between text-xs text-braj-indigo-950 group"
                              >
                                <div className="flex items-center gap-2 truncate pr-2">
                                  {renderActionLinkIcon(link.icon)}
                                  <div className="truncate">
                                    <span className="font-bold group-hover:text-braj-saffron-700 block truncate">
                                      {link.title}
                                    </span>
                                    {link.description && (
                                      <span className="text-[10px] text-braj-cream-700 block truncate">
                                        {link.description}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 text-braj-saffron-600 font-semibold shrink-0 text-[11px]">
                                  <span>Open</span>
                                  <ArrowRight className="w-3 h-3" />
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Metadata Footer Strip */}
                      {!isUser && msg.metadata?.sourceInfo && (
                        <div className="mt-3 pt-2 border-t border-braj-cream-200 text-[10px] text-braj-cream-600 flex items-center justify-between flex-wrap gap-1">
                          <span>Authority: {msg.metadata.sourceInfo.primaryAuthority}</span>
                          <span>Verified: {msg.metadata.sourceInfo.lastVerifiedDate}</span>
                        </div>
                      )}
                    </div>

                    {/* Bubble Metadata Row: Timestamp & Copy Button */}
                    <div className="flex items-center gap-2 px-1 text-[11px] text-braj-cream-600">
                      <span>{msg.timestamp}</span>

                      {!isUser && (
                        <button
                          type="button"
                          onClick={() => handleCopyText(msg.id, msg.content)}
                          className="inline-flex items-center gap-1 hover:text-braj-indigo-950 p-0.5 rounded cursor-pointer transition-colors"
                          title="Copy response to clipboard"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700 text-[10px] font-medium">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator State */}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-braj-saffron-600 to-braj-gold-600 text-white flex items-center justify-center font-bold shadow-2xs">
                  श्री
                </div>
                <div className="p-4 rounded-3xl bg-white border border-braj-cream-300 rounded-tl-none shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-xs text-braj-indigo-950 font-medium">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-braj-saffron-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-braj-saffron-600"></span>
                    </span>
                    <span>BrajMitra Assistant verifying facts & gate records...</span>
                  </div>
                  <div className="flex gap-1.5 pt-1">
                    <div className="w-2 h-2 rounded-full bg-braj-saffron-500 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-braj-gold-500 animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-braj-indigo-600 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}

            {/* Error Message Banner */}
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-950 text-xs flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Query Error Encountered:</strong>
                    <span>{errorMessage}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendMessage(inputQuery)}
                  className="text-xs shrink-0 text-red-800 border-red-300 hover:bg-red-100"
                >
                  Retry
                </Button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions Strip */}
          <div className="p-3 bg-white border-t border-braj-cream-200 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-bold text-braj-cream-700 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-braj-saffron-600" />
              <span>Suggested:</span>
            </span>
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="text-[11px] px-3.5 py-1.5 rounded-full bg-braj-cream-100 hover:bg-braj-saffron-50 text-braj-indigo-950 hover:text-braj-saffron-700 border border-braj-cream-300 hover:border-braj-saffron-300 transition-colors whitespace-nowrap cursor-pointer shrink-0 disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Message Input & Send Control */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-4 bg-white border-t border-braj-cream-300 flex items-center gap-2 sm:gap-3"
          >
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask about Banke Bihari gates, 1-day itinerary, parikrama rules, or sacred seva..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-2xl border border-braj-cream-300 text-xs sm:text-sm text-braj-indigo-950 placeholder:text-braj-cream-600 focus:outline-none focus:border-braj-saffron-500 focus:ring-2 focus:ring-braj-saffron-400/20 disabled:bg-braj-cream-100 resize-none max-h-24 shadow-2xs"
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={!inputQuery.trim() || isLoading}
              className="h-11 px-5 rounded-2xl shrink-0"
              icon={<Send className="w-4 h-4" />}
            >
              <span className="hidden sm:inline">Ask Mitra</span>
            </Button>
          </form>
        </div>
      </div>

      {/* Auxiliary Directory Jump Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
        <Link
          href="/temples"
          className="p-4 rounded-2xl bg-white border border-braj-cream-300 hover:border-braj-gold-400 shadow-2xs hover:shadow-xs flex items-center justify-between transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-braj-cream-100 text-braj-indigo-950 flex items-center justify-center">
              <Compass className="w-4 h-4 text-braj-gold-600" />
            </div>
            <div>
              <span className="font-bold text-braj-indigo-950 group-hover:text-braj-saffron-700 block">
                Temple Directory
              </span>
              <span className="text-[11px] text-braj-cream-700">
                12 verified shrines across 6 regions
              </span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-braj-saffron-600 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="/gate-finder"
          className="p-4 rounded-2xl bg-white border border-braj-cream-300 hover:border-braj-gold-400 shadow-2xs hover:shadow-xs flex items-center justify-between transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-braj-cream-100 text-braj-indigo-950 flex items-center justify-center">
              <DoorOpen className="w-4 h-4 text-braj-saffron-600" />
            </div>
            <div>
              <span className="font-bold text-braj-indigo-950 group-hover:text-braj-saffron-700 block">
                Temple Gate Finder
              </span>
              <span className="text-[11px] text-braj-cream-700">
                Interactive OpenStreetMap radar
              </span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-braj-saffron-600 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="/planner"
          className="p-4 rounded-2xl bg-white border border-braj-cream-300 hover:border-braj-gold-400 shadow-2xs hover:shadow-xs flex items-center justify-between transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-braj-cream-100 text-braj-indigo-950 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <span className="font-bold text-braj-indigo-950 group-hover:text-braj-saffron-700 block">
                Smart Trip Planner
              </span>
              <span className="text-[11px] text-braj-cream-700">
                Afternoon-closure aware itineraries
              </span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-braj-saffron-600 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </PageContainer>
  );
}
