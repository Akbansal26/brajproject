import React from "react";
import { Sun, Moon, ShieldCheck, Info } from "lucide-react";
import { PageContainer } from "../ui/PageContainer";
import { SectionHeading } from "../ui/SectionHeading";
import { StatusBadge } from "../ui/StatusBadge";
import { Card, CardHeader, CardContent } from "../ui/Card";
import { GENERAL_TEMPLE_RULES } from "@/data/destinations";

const templeTimings = [
  {
    temple: "Thakur Bankey Bihari Ji",
    location: "Vrindavan",
    summer: {
      morning: "07:45 AM – 12:00 PM (Shringar Aarti ~08:00 AM, Rajbhog ~11:55 AM)",
      evening: "05:30 PM – 09:30 PM (Shayan Aarti ~09:25 PM)",
    },
    winter: {
      morning: "08:45 AM – 01:00 PM",
      evening: "04:30 PM – 08:30 PM",
    },
    note: "Parda (curtain) is pulled frequently to prevent devotees from fainting in divine ecstasy.",
  },
  {
    temple: "Shri Krishna Janmasthan",
    location: "Mathura",
    summer: {
      morning: "05:00 AM – 12:00 PM (Mangala Aarti ~05:30 AM)",
      evening: "04:00 PM – 09:30 PM (Sandhya Aarti ~06:30 PM)",
    },
    winter: {
      morning: "05:30 AM – 12:00 PM",
      evening: "03:30 PM – 09:00 PM",
    },
    note: "Strict security check. Electronic items, smart watches, and pens are deposited at counter.",
  },
  {
    temple: "Shri Radha Raman Mandir",
    location: "Vrindavan",
    summer: {
      morning: "08:00 AM – 12:30 PM (Mangala Aarti ~04:00 AM)",
      evening: "06:00 PM – 09:00 PM",
    },
    winter: {
      morning: "08:30 AM – 01:00 PM",
      evening: "05:30 PM – 08:30 PM",
    },
    note: "Continuous sacred kitchen fire ignited over 500 years ago by Gopala Bhatta Goswami.",
  },
  {
    temple: "Daan Ghati & Mukharvind Mandir",
    location: "Govardhan",
    summer: {
      morning: "06:00 AM – 12:30 PM (Dudh Abhishek throughout morning)",
      evening: "04:00 PM – 09:30 PM (Shringar Darshan in evening)",
    },
    winter: {
      morning: "06:30 AM – 12:30 PM",
      evening: "03:30 PM – 09:00 PM",
    },
    note: "Govardhan Parikrama pathway remains open 24 hours day and night.",
  },
];

export const DarshanSection: React.FC = () => {
  return (
    <section id="darshan" className="py-16 sm:py-20 bg-white border-y border-braj-gold-500/20 scroll-mt-16">
      <PageContainer>
        {/* Section Heading */}
        <SectionHeading
          badge="Temple Rhythms"
          badgeVariant="gold"
          title="Temple Darshan & Aarti Schedules"
          subtitle="Darshan timings in Braj shift between Summer (Grishma) and Winter (Sheetkaal) to honor the comfort and loving seva of Thakur Ji."
          align="center"
        />

        {/* Timings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {templeTimings.map((item) => (
            <Card key={item.temple} className="border-braj-cream-300">
              <CardHeader className="bg-braj-cream-50/60 flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg text-braj-indigo-950">{item.temple}</h3>
                  <span className="text-xs font-medium text-braj-saffron-600">{item.location}</span>
                </div>
                <StatusBadge variant="indigo" size="sm">
                  Daily Seva
                </StatusBadge>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="p-3 rounded-lg bg-braj-cream-100/70 border border-braj-cream-200">
                    <div className="flex items-center gap-1.5 font-semibold text-braj-saffron-800 mb-1">
                      <Sun className="w-4 h-4 text-braj-saffron-600" />
                      <span>Summer Schedule (चैत्र – आश्विन)</span>
                    </div>
                    <p className="text-braj-indigo-950"><strong>Morning:</strong> {item.summer.morning}</p>
                    <p className="text-braj-indigo-950"><strong>Evening:</strong> {item.summer.evening}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-braj-cream-100/70 border border-braj-cream-200">
                    <div className="flex items-center gap-1.5 font-semibold text-braj-indigo-800 mb-1">
                      <Moon className="w-4 h-4 text-braj-indigo-600" />
                      <span>Winter Schedule (कार्तिक – फाल्गुन)</span>
                    </div>
                    <p className="text-braj-indigo-950"><strong>Morning:</strong> {item.winter.morning}</p>
                    <p className="text-braj-indigo-950"><strong>Evening:</strong> {item.winter.evening}</p>
                  </div>
                </div>

                <div className="text-xs text-braj-cream-800 bg-braj-gold-50/60 p-2.5 rounded-lg border border-braj-gold-200/60 flex items-start gap-2">
                  <Info className="w-4 h-4 text-braj-gold-600 shrink-0 mt-0.5" />
                  <span>{item.note}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Essential Pilgrim Etiquette */}
        <div id="etiquette" className="p-6 rounded-2xl bg-braj-indigo-950 text-white border border-braj-gold-500/40">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-braj-saffron-400" />
            <h3 className="font-bold text-lg text-white">Temple Etiquette & Pilgrim Guidelines</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-braj-cream-200">
            {GENERAL_TEMPLE_RULES.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-braj-indigo-900/60 border border-braj-gold-500/10">
                <span className="text-braj-gold-400 font-bold shrink-0">{idx + 1}.</span>
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
};
