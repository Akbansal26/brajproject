import React from "react";
import {
  Bot,
  Calendar,
  DoorOpen,
  Users,
  Compass,
  Sparkles,
} from "lucide-react";
import { PageContainer } from "../ui/PageContainer";
import { SectionHeading } from "../ui/SectionHeading";
import { FeatureCard } from "../ui/FeatureCard";

export const MainFeatures: React.FC = () => {
  const platformFeatures = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI Travel Assistant",
      description:
        "Conversational multilingual guidance for verified temple sthala-purana, crowd advice, and respectful pilgrimage lore.",
      status: "AI Companion",
      statusVariant: "saffron" as const,
      actionHref: "/assistant",
      actionLabel: "Chat with AI Mitra",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Smart Trip Planner",
      description:
        "Generate 1-day, 2-day, or 3-day balanced itineraries respecting seasonal morning and evening temple aarti windows.",
      status: "Trip Optimizer",
      statusVariant: "gold" as const,
      actionHref: "/planner",
      actionLabel: "Generate Yatra Schedule",
    },
    {
      icon: <DoorOpen className="w-6 h-6" />,
      title: "Temple Gate Finder",
      description:
        "Locate exact entry and exit gates, footwear cloakroom stands, wheelchair ramps, and authorized vehicle parking.",
      status: "Gate Guide",
      statusVariant: "indigo" as const,
      actionHref: "/gate-finder",
      actionLabel: "Find Temple Gates",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Crowd Intelligence & Etiquette",
      description:
        "Historical peak crowd hours, seasonal shift advisories, and traditional dress code requirements for sanctum darshan.",
      status: "Darshan Intel",
      statusVariant: "cream" as const,
      actionHref: "/temples",
      actionLabel: "View Darshan Timings",
    },
    {
      icon: <Compass className="w-6 h-6" />,
      title: "Interactive Maps & Parikrama",
      description:
        "Complete route circuits for Giriraj Govardhan 21 km, Vrindavan Panchkosi, and 84 Kos pilgrimage trails with key resting kunds.",
      status: "Route Circuits",
      statusVariant: "saffron" as const,
      actionHref: "/explore",
      actionLabel: "Explore Shrines & Maps",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Braj Sanskriti & Heritage",
      description:
        "Immerse in deep cultural storytelling: Laddu Gopal Ji seva bhava, Krishna bal-lilas, and ecstatic regional festivals.",
      status: "Living Heritage",
      statusVariant: "gold" as const,
      actionHref: "/culture",
      actionLabel: "Discover Braj Culture",
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-20 bg-white border-y border-braj-gold-500/20 scroll-mt-16">
      <PageContainer>
        <SectionHeading
          badge="Platform Architecture"
          badgeVariant="indigo"
          title="Intelligent Capabilities for Every Pilgrim"
          subtitle="Engineered to eliminate confusion, manage crowded shrine navigation, and deepen your spiritual connection to the holy land of Braj."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {platformFeatures.map((feat) => (
            <FeatureCard
              key={feat.title}
              icon={feat.icon}
              title={feat.title}
              description={feat.description}
              status={feat.status}
              statusVariant={feat.statusVariant}
              actionHref={feat.actionHref}
              actionLabel={feat.actionLabel}
              className="h-full"
            />
          ))}
        </div>
      </PageContainer>
    </section>
  );
};
