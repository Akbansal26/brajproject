import React from "react";
import Link from "next/link";
import { Search, DoorOpen, CalendarCheck, Sparkles, ArrowRight } from "lucide-react";
import { PageContainer } from "../ui/PageContainer";
import { SectionHeading } from "../ui/SectionHeading";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: "01",
      icon: <Search className="w-5 h-5 text-braj-saffron-600" />,
      title: "Search & Select Dhams",
      description:
        "Choose from Mathura, Vrindavan, Govardhan, Barsana, Nandgaon, or Gokul based on your arrival point and pilgrimage goals.",
      actionText: "Browse Dhams",
      actionHref: "/explore",
    },
    {
      step: "02",
      icon: <DoorOpen className="w-5 h-5 text-braj-gold-600" />,
      title: "Check Gate & Timing Intel",
      description:
        "Review summer/winter aarti hours, official footwear counters, and police-mandated one-way gate routing to avoid peak rush.",
      actionText: "Gate Finder",
      actionHref: "/gate-finder",
    },
    {
      step: "03",
      icon: <CalendarCheck className="w-5 h-5 text-braj-indigo-600" />,
      title: "Generate Balanced Schedule",
      description:
        "Create an optimal multi-day itinerary that respects sacred afternoon temple closure hours and senior mobility needs.",
      actionText: "Smart Planner",
      actionHref: "/planner",
    },
    {
      step: "04",
      icon: <Sparkles className="w-5 h-5 text-braj-saffron-600" />,
      title: "Immerse in Living Culture",
      description:
        "Listen to sthala-purana, understand Laddu Gopal seva rituals, and discover eternal pastimes at every holy kund and ghat.",
      actionText: "Explore Culture",
      actionHref: "/culture",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-braj-cream-100/70 border-b border-braj-cream-300 scroll-mt-16">
      <PageContainer>
        <SectionHeading
          badge="Seamless Pilgrimage"
          badgeVariant="saffron"
          title="How BrajMitra AI Works"
          subtitle="A four-step pathway designed to transform crowded, stressful temple visits into a smooth, deeply devotional pilgrimage."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-white border border-braj-cream-300 shadow-2xs hover:shadow-md hover:border-braj-gold-400/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-braj-gold-500/60">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-braj-cream-100 flex items-center justify-center border border-braj-cream-200">
                    {item.icon}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-base text-braj-indigo-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-braj-cream-800 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-braj-cream-200">
                <Link
                  href={item.actionHref}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-braj-saffron-600 hover:text-braj-saffron-700 transition-colors"
                >
                  <span>{item.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
};
