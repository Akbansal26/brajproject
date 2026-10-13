import React from "react";
import {
  Sparkles,
  MessageSquare,
  Bot,
  Languages,
  Route,
  Cpu,
} from "lucide-react";
import { PageContainer } from "../ui/PageContainer";
import { SectionHeading } from "../ui/SectionHeading";
import { FeatureCard } from "../ui/FeatureCard";
import { StatusBadge } from "../ui/StatusBadge";

const upcomingCapabilities = [
  {
    icon: <Languages className="w-6 h-6" />,
    title: "Multilingual Braj Sthala-Purana",
    description:
      "Ask questions in Hindi, English, or Gujarati to learn the sacred history and lilas of any temple, kund, or ghat.",
    status: "Ready for LLM",
    statusVariant: "saffron" as const,
  },
  {
    icon: <Route className="w-6 h-6" />,
    title: "Dynamic Yatra Itinerary Planner",
    description:
      "AI-optimized 1-day, 3-day, or 7-day pilgrimage schedules respecting morning and evening aarti windows.",
    status: "Algorithm Ready",
    statusVariant: "gold" as const,
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Real-time Crowd & Aarti Alerts",
    description:
      "Seasonal reminders for Bankey Bihari Darshan, Mangala Aarti timings, and Ekadashi rush advisories.",
    status: "Upcoming",
    statusVariant: "indigo" as const,
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Braj Bhasha Audio & Hymn Explanations",
    description:
      "Understand the deep devotional meanings of Braj Ras bhajans, chalisas, and Goswami literature.",
    status: "Upcoming",
    statusVariant: "cream" as const,
  },
];

const sampleQuestions = [
  "What is the best sequence to visit the 6 Dhams over a 3-day weekend?",
  "What are the rules and starting points for Giriraj Govardhan barefoot Parikrama?",
  "When are the curtain-pulling timings during Bankey Bihari Shringar Darshan?",
  "How to reach Radha Rani Temple in Barsana with elderly family members?",
];

export const AIMitraFeature: React.FC = () => {
  return (
    <section
      id="ai-mitra"
      className="py-16 sm:py-20 bg-gradient-to-b from-white via-braj-cream-50 to-white border-b border-braj-gold-500/20 scroll-mt-16"
    >
      <PageContainer>
        {/* Section Heading */}
        <SectionHeading
          badge="AI Companion Architecture"
          badgeVariant="saffron"
          title="Meet AI Mitra: Your Braj Pilgrimage Guide"
          subtitle="Upcoming AI engine designed to provide verified spiritual history, crowd-aware itineraries, and cultural context for every step of your sacred Braj yatra."
          align="center"
        />

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {upcomingCapabilities.map((cap) => (
            <FeatureCard
              key={cap.title}
              icon={cap.icon}
              title={cap.title}
              description={cap.description}
              status={cap.status}
              statusVariant={cap.statusVariant}
            />
          ))}
        </div>

        {/* Interactive Query Preview Showcase */}
        <div className="max-w-3xl mx-auto rounded-2xl bg-braj-indigo-950 text-white p-6 sm:p-8 border-2 border-braj-gold-500/40 shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-braj-indigo-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-braj-saffron-500 to-braj-gold-600 flex items-center justify-center text-white font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base text-white">
                  AI Mitra Dialogue Engine Preview
                </h4>
                <p className="text-xs text-braj-gold-300">
                  LLM Contract & Interface Foundation
                </p>
              </div>
            </div>
            <StatusBadge variant="gold" size="sm">
              Step 1: Frontend Foundation
            </StatusBadge>
          </div>

          <p className="text-xs text-braj-cream-200 mb-4">
            Curated pilgrim queries that AI Mitra will handle upon backend integration:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {sampleQuestions.map((q, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-braj-indigo-900/80 border border-braj-gold-500/20 text-xs text-braj-cream-100 flex items-start gap-2 hover:border-braj-gold-400 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-braj-saffron-400 shrink-0 mt-0.5" />
                <span>&quot;{q}&quot;</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-braj-indigo-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-braj-gold-300/90">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-braj-saffron-400" />
              <span>Prepared for streaming responses and verified knowledge embeddings</span>
            </span>
            <span className="font-mono text-[11px] bg-braj-indigo-900 px-2.5 py-1 rounded border border-braj-indigo-700">
              Contract Ready
            </span>
          </div>
        </div>
      </PageContainer>
    </section>
  );
};
