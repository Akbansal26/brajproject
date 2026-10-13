"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Sun,
  Moon,
  Info,
  Users,
  Compass,
  ArrowRight,
  Trash2,
  RefreshCw,
  Wallet,
  Car,
  Languages,
  AlertTriangle,
} from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";

interface ItineraryStop {
  id: string;
  timeSlot: "morning" | "afternoon" | "evening";
  timeRange: string;
  title: string;
  destination: string;
  slug?: string;
  category: "darshan" | "rest" | "food" | "parikrama" | "cultural";
  travelFromPrev?: string;
  notes: string;
}

interface ItineraryDay {
  day: number;
  title: string;
  theme: string;
  stops: ItineraryStop[];
}

interface BudgetEstimate {
  category: string;
  budgetVal: string;
  moderateVal: string;
  premiumVal: string;
  details: string;
}

const DEFAULT_ITINERARIES: Record<number, ItineraryDay[]> = {
  1: [
    {
      day: 1,
      title: "Day 1: Heart of Mathura & Ancient Vrindavan",
      theme: "Janmasthan Darshan, Midday Yamuna Rest & Evening Sandhya Aarti",
      stops: [
        {
          id: "d1-s1",
          timeSlot: "morning",
          timeRange: "06:30 AM – 09:30 AM",
          title: "Shri Krishna Janmabhoomi Complex",
          destination: "Mathura",
          slug: "shri-krishna-janmabhoomi",
          category: "darshan",
          travelFromPrev: "Starting Point",
          notes: "Arrive early. Electronic items, leather belts, and bags must be deposited in official lockers at Gate 1.",
        },
        {
          id: "d1-s2",
          timeSlot: "morning",
          timeRange: "09:45 AM – 11:30 AM",
          title: "Dwarkadhish Mandir & Vishram Ghat",
          destination: "Mathura",
          slug: "dwarkadhish-temple-mathura",
          category: "darshan",
          travelFromPrev: "15 mins (2.5 km) via E-rickshaw",
          notes: "Darshan closes around 11:30 AM. Traditional serene boat view on sacred Yamuna.",
        },
        {
          id: "d1-s3",
          timeSlot: "afternoon",
          timeRange: "12:30 PM – 04:30 PM",
          title: "Temple Closure Window: Traditional Sattvic Lunch & Shayan Rest",
          destination: "Vrindavan",
          category: "rest",
          travelFromPrev: "25 mins (12 km) Mathura to Vrindavan",
          notes: "Essential pilgrim practice: In Braj, all major temples close between 12:30 PM and 04:30 PM for deity rajbhog & shayan.",
        },
        {
          id: "d1-s4",
          timeSlot: "evening",
          timeRange: "05:00 PM – 07:15 PM",
          title: "Thakur Bankey Bihari Ji Darshan",
          destination: "Vrindavan",
          slug: "banke-bihari-temple",
          category: "darshan",
          travelFromPrev: "15 mins walk through Gali",
          notes: "Arrive by 05:00 PM; follow designated one-way barricaded entry through Gate 2 or 3.",
        },
        {
          id: "d1-s5",
          timeSlot: "evening",
          timeRange: "07:30 PM – 08:45 PM",
          title: "Prem Mandir Architectural Illumination",
          destination: "Vrindavan",
          slug: "prem-mandir",
          category: "cultural",
          travelFromPrev: "15 mins (3 km) via E-rickshaw",
          notes: "Italian marble engravings with musical fountain lighting show starting around 07:30 PM.",
        },
      ],
    },
  ],
  2: [
    {
      day: 1,
      title: "Day 1: Sanctums of Mathura & Vrindavan",
      theme: "Janmabhoomi, Ancient Temples & Yamuna Aarti",
      stops: [
        {
          id: "d1-s1",
          timeSlot: "morning",
          timeRange: "06:30 AM – 09:30 AM",
          title: "Shri Krishna Janmasthan Complex",
          destination: "Mathura",
          slug: "shri-krishna-janmabhoomi",
          category: "darshan",
          travelFromPrev: "Hotel Departure",
          notes: "Complete security check at Gate 1; offer pranam at the sacred prison cell (Garbha Griha).",
        },
        {
          id: "d1-s2",
          timeSlot: "morning",
          timeRange: "10:00 AM – 11:45 AM",
          title: "Dwarkadhish Mandir & Vishram Ghat",
          destination: "Mathura",
          slug: "dwarkadhish-temple-mathura",
          category: "darshan",
          travelFromPrev: "15 mins (2.5 km)",
          notes: "Enjoy holy Yamuna darshan and sample fresh Mathura Peda in the heritage bazaar.",
        },
        {
          id: "d1-s3",
          timeSlot: "afternoon",
          timeRange: "12:30 PM – 04:30 PM",
          title: "Mandatory Closure Interval: Pure Vegetarian Lunch & Rest",
          destination: "Vrindavan",
          category: "rest",
          travelFromPrev: "25 mins (12 km) Mathura to Vrindavan",
          notes: "Sanctum gates across Braj are sealed for deity Rajbhog and afternoon rest.",
        },
        {
          id: "d1-s4",
          timeSlot: "evening",
          timeRange: "05:00 PM – 07:00 PM",
          title: "Thakur Bankey Bihari Mandir",
          destination: "Vrindavan",
          slug: "banke-bihari-temple",
          category: "darshan",
          travelFromPrev: "10 mins walk / rickshaw",
          notes: "Experience the unique curtain-drop (Jhalak Darshan) preventing overwhelming devotional trance.",
        },
        {
          id: "d1-s5",
          timeSlot: "evening",
          timeRange: "07:15 PM – 08:30 PM",
          title: "Prem Mandir & ISKCON Vrindavan",
          destination: "Vrindavan",
          slug: "prem-mandir",
          category: "cultural",
          travelFromPrev: "15 mins (3 km)",
          notes: "Evening lighting display and euphoric Hare Krishna kirtan.",
        },
      ],
    },
    {
      day: 2,
      title: "Day 2: Sacred Parikrama & Childhood Shrines",
      theme: "Govardhan Hill, Radharani Barsana & Gokul",
      stops: [
        {
          id: "d2-s1",
          timeSlot: "morning",
          timeRange: "06:00 AM – 09:30 AM",
          title: "Govardhan Hill & Daan Ghati Mandir",
          destination: "Govardhan",
          slug: "govardhan-hill-giriraj",
          category: "parikrama",
          travelFromPrev: "35 mins (24 km) from Vrindavan",
          notes: "Giriraj milk offering at Daan Ghati; option for battery-operated e-rickshaw parikrama.",
        },
        {
          id: "d2-s2",
          timeSlot: "morning",
          timeRange: "10:15 AM – 12:00 PM",
          title: "Shri Radha Rani Mandir (Ladli Ji)",
          destination: "Barsana",
          slug: "radha-rani-temple-barsana",
          category: "darshan",
          travelFromPrev: "25 mins (20 km) Govardhan to Barsana",
          notes: "Climb the steps of Bhanugarh hill or take the newly established passenger ropeway.",
        },
        {
          id: "d2-s3",
          timeSlot: "afternoon",
          timeRange: "12:30 PM – 04:00 PM",
          title: "Braj Cuisine Lunch & Midday Recharge",
          destination: "Nandgaon / Gokul",
          category: "food",
          travelFromPrev: "15 mins to Nandgaon",
          notes: "Traditional Bedmi Puri, Kadhi Kachori, and cooling Chhachh during afternoon temple closure.",
        },
        {
          id: "d2-s4",
          timeSlot: "evening",
          timeRange: "04:30 PM – 06:15 PM",
          title: "Nand Bhawan at Nandgaon",
          destination: "Nandgaon",
          slug: "nand-bhawan-nandgaon",
          category: "darshan",
          travelFromPrev: "Short walk uphill",
          notes: "The residential hill palace of Nanda Maharaja and Mother Yashoda atop Nandishwar Hill.",
        },
        {
          id: "d2-s5",
          timeSlot: "evening",
          timeRange: "06:45 PM – 08:30 PM",
          title: "Raman Reti & Brahmand Ghat",
          destination: "Gokul",
          slug: "raman-reti-gokul",
          category: "cultural",
          travelFromPrev: "45 mins (35 km) across Yamuna bridge",
          notes: "Walk barefoot on the sanctified soft sands where toddler Krishna crawled.",
        },
      ],
    },
  ],
  3: [
    {
      day: 1,
      title: "Day 1: Mathura Janmasthan & Heritage Vrindavan",
      theme: "Birthplace Sanctum, Yamuna Ghats & Ancient Goswami Shrines",
      stops: [
        {
          id: "d1-s1",
          timeSlot: "morning",
          timeRange: "06:30 AM – 09:30 AM",
          title: "Shri Krishna Janmasthan Complex",
          destination: "Mathura",
          slug: "shri-krishna-janmabhoomi",
          category: "darshan",
          travelFromPrev: "Arrival Mathura Junction",
          notes: "Garbha Griha prison cell, Keshavdev Mandir, and historical Potra Kund.",
        },
        {
          id: "d1-s2",
          timeSlot: "morning",
          timeRange: "10:00 AM – 11:30 AM",
          title: "Dwarkadhish Temple & Vishram Ghat Aarti",
          destination: "Mathura",
          slug: "dwarkadhish-temple-mathura",
          category: "darshan",
          travelFromPrev: "15 mins (2.5 km)",
          notes: "Witness traditional Rajasthani and Pushtimarg architectural splendor.",
        },
        {
          id: "d1-s3",
          timeSlot: "afternoon",
          timeRange: "12:30 PM – 04:30 PM",
          title: "Closure Window: Hotel Check-in & Sattvic Thali",
          destination: "Vrindavan",
          category: "rest",
          travelFromPrev: "25 mins (12 km)",
          notes: "Rest during the heat while temples remain closed across the pilgrimage circuit.",
        },
        {
          id: "d1-s4",
          timeSlot: "evening",
          timeRange: "05:00 PM – 07:00 PM",
          title: "Shri Radha Raman Temple",
          destination: "Vrindavan",
          slug: "radha-raman-temple",
          category: "darshan",
          travelFromPrev: "Old Vrindavan Lanes",
          notes: "Self-manifested Shaligram shila deity; 500-year continuous cooking fire of Gopal Bhatta Goswami.",
        },
        {
          id: "d1-s5",
          timeSlot: "evening",
          timeRange: "07:15 PM – 08:30 PM",
          title: "Thakur Bankey Bihari Mandir",
          destination: "Vrindavan",
          slug: "banke-bihari-temple",
          category: "darshan",
          travelFromPrev: "5 mins walk",
          notes: "Mesmerizing evening Shayan Darshan in the historic alleys of Vrindavan.",
        },
      ],
    },
    {
      day: 2,
      title: "Day 2: The Sacred 7-Kos Parikrama & Barsana",
      theme: "Govardhan Hill Circumambulation & Ladli Ji Bhanugarh",
      stops: [
        {
          id: "d2-s1",
          timeSlot: "morning",
          timeRange: "05:30 AM – 10:00 AM",
          title: "Govardhan Parikrama (Daan Ghati & Mansi Ganga)",
          destination: "Govardhan",
          slug: "govardhan-hill-giriraj",
          category: "parikrama",
          travelFromPrev: "35 mins from Vrindavan",
          notes: "Perform morning circumambulation by foot or e-rickshaw. Darshan at Daan Ghati Mandir.",
        },
        {
          id: "d2-s2",
          timeSlot: "morning",
          timeRange: "10:30 AM – 12:00 PM",
          title: "Shri Radha Rani Mandir (Barsana)",
          destination: "Barsana",
          slug: "radha-rani-temple-barsana",
          category: "darshan",
          travelFromPrev: "20 mins (20 km)",
          notes: "Climb Bhanugarh peak; view panoramic vistas of Braj landscape.",
        },
        {
          id: "d2-s3",
          timeSlot: "afternoon",
          timeRange: "12:30 PM – 04:30 PM",
          title: "Rest Interval & Traditional Braj Lunch",
          destination: "Nandgaon",
          category: "rest",
          travelFromPrev: "15 mins to Nandgaon",
          notes: "Recharge energy; all village temples remain closed for afternoon seva.",
        },
        {
          id: "d2-s4",
          timeSlot: "evening",
          timeRange: "04:45 PM – 06:15 PM",
          title: "Nand Bhawan atop Nandishwar Hill",
          destination: "Nandgaon",
          slug: "nand-bhawan-nandgaon",
          category: "darshan",
          travelFromPrev: "10 mins uphill walk",
          notes: "The royal house of Krishna's foster parents with panoramic views.",
        },
        {
          id: "d2-s5",
          timeSlot: "evening",
          timeRange: "07:00 PM – 08:30 PM",
          title: "Prem Mandir Lighting & Musical Display",
          destination: "Vrindavan",
          slug: "prem-mandir",
          category: "cultural",
          travelFromPrev: "45 mins back to Vrindavan",
          notes: "Magnificent nighttime colored illumination and kirtan hall.",
        },
      ],
    },
    {
      day: 3,
      title: "Day 3: Sacred Sands of Gokul & Yamuna Pujan",
      theme: "Raman Reti, Brahmand Ghat & Final Blessings",
      stops: [
        {
          id: "d3-s1",
          timeSlot: "morning",
          timeRange: "07:00 AM – 09:30 AM",
          title: "Raman Reti Sacred Sands",
          destination: "Gokul",
          slug: "raman-reti-gokul",
          category: "cultural",
          travelFromPrev: "40 mins from Vrindavan",
          notes: "Pilgrims roll on the sanctified soft soil where infant Krishna and Balarama played.",
        },
        {
          id: "d3-s2",
          timeSlot: "morning",
          timeRange: "09:45 AM – 11:30 AM",
          title: "Brahmand Ghat & Yamuna Snana",
          destination: "Gokul",
          slug: "brahmand-ghat-gokul",
          category: "darshan",
          travelFromPrev: "10 mins walk / auto",
          notes: "The historic spot where child Krishna revealed the cosmos within His mouth to Yashoda.",
        },
        {
          id: "d3-s3",
          timeSlot: "afternoon",
          timeRange: "12:30 PM – 03:00 PM",
          title: "Farewell Braj Mahaprasadam & Local Shopping",
          destination: "Mathura / Vrindavan",
          category: "food",
          travelFromPrev: "25 mins to Mathura",
          notes: "Purchase authentic Mathura Peda, Tulsi malas, and kanthi from registered cooperative shops.",
        },
      ],
    },
  ],
};

const BUDGET_DATA: BudgetEstimate[] = [
  {
    category: "Temple Entry & Darshan",
    budgetVal: "₹0 (Universal Free Entry)",
    moderateVal: "₹0 (Free Darshan)",
    premiumVal: "₹0 (Free Entry, Optional Trust Seva)",
    details: "All Braj temples have free public entry. No commercial tickets required.",
  },
  {
    category: "Local Transport (Daily / Person)",
    budgetVal: "₹250 – ₹400 (Shared E-Rickshaw)",
    moderateVal: "₹800 – ₹1,200 (Dedicated Auto)",
    premiumVal: "₹2,000 – ₹3,500 (AC Private Taxi)",
    details: "E-rickshaws are the most agile mode inside Vrindavan's narrow heritage lanes.",
  },
  {
    category: "Accommodation (Per Room / Night)",
    budgetVal: "₹600 – ₹1,200 (Ashrams / Dharamshalas)",
    moderateVal: "₹1,800 – ₹3,200 (3-Star Pilgrim Hotels)",
    premiumVal: "₹4,500 – ₹8,000 (Heritage Resorts)",
    details: "Ashrams require early advance booking during Ekadashi and festival seasons.",
  },
  {
    category: "Prasadam & Food (Daily / Person)",
    budgetVal: "₹300 – ₹450 (Temple Bhandaras / Simple Dhabas)",
    moderateVal: "₹650 – ₹950 (Sattvic Thali Restaurants)",
    premiumVal: "₹1,200 – ₹2,000 (Fine Dining Heritage Thalis)",
    details: "Food across Braj is strictly pure vegetarian (no onion, no garlic).",
  },
  {
    category: "Estimated Total (Per Person / Day)",
    budgetVal: "₹800 – ₹1,400",
    moderateVal: "₹2,200 – ₹3,500",
    premiumVal: "₹5,000 – ₹9,000",
    details: "Excludes intercity train/flight travel to Mathura.",
  },
];

export default function PlannerPage() {
  // Form State
  const [startCity, setStartCity] = useState("Delhi NCR");
  const [travelDate, setTravelDate] = useState("2026-11-15");
  const [duration, setDuration] = useState<number>(2);
  const [budgetTier, setBudgetTier] = useState<"budget" | "moderate" | "premium">("moderate");
  const [travellers, setTravellers] = useState<number>(2);
  const [groupType, setGroupType] = useState<"Solo" | "Couple" | "Family with Kids" | "Senior Citizens" | "Satsang Yatra">("Family with Kids");
  const [travelPace, setTravelPace] = useState<"Relaxed" | "Balanced" | "Intensive">("Balanced");
  const [language, setLanguage] = useState("Hindi & English");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Temple Darshan",
    "Ghats & Yamuna Aarti",
    "Cultural Lore",
  ]);

  // Itinerary Stops Editable State
  const [customDays, setCustomDays] = useState<ItineraryDay[]>(DEFAULT_ITINERARIES[2]);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  // When duration changes, reset custom days
  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
    setCustomDays(DEFAULT_ITINERARIES[newDuration] || DEFAULT_ITINERARIES[2]);
    setActiveDayIndex(0);
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const removeStop = (dayIdx: number, stopId: string) => {
    const updated = [...customDays];
    updated[dayIdx].stops = updated[dayIdx].stops.filter((s) => s.id !== stopId);
    setCustomDays(updated);
  };

  const resetToDefault = () => {
    setCustomDays(DEFAULT_ITINERARIES[duration] || DEFAULT_ITINERARIES[2]);
  };

  const availableInterests = [
    "Temple Darshan",
    "Ghats & Yamuna Aarti",
    "Govardhan Parikrama",
    "Cultural Lore",
    "Local Food & Peda",
    "Handicrafts & Malas",
    "Quiet Meditation",
  ];

  return (
    <PageContainer paddingY="lg" className="space-y-10">
      {/* Breadcrumb Trail */}
      <PageBreadcrumb
        items={[
          { label: "Braj Bhoomi", href: "/" },
          { label: "Pilgrim Trip Planner" },
        ]}
      />

      {/* Heading */}
      <SectionHeading
        badge="Smart Pilgrim Planner"
        badgeVariant="saffron"
        title="Custom Pilgrimage Itinerary Planner"
        subtitle="Design a meaningful, pace-conscious journey across Mathura, Vrindavan, Govardhan, Barsana, Nandgaon, and Gokul tailored to your family's preferences."
        align="left"
      />

      {/* CRITICAL DEMONSTRATION DISCLAIMER BANNER */}
      <div className="rounded-2xl border-2 border-braj-gold-400 bg-amber-50/70 p-5 sm:p-6 shadow-xs">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                Demonstration Pilgrimage Itinerary
              </span>
              <span className="text-xs font-medium text-amber-800">
                • Generated for UI Exploration & Travel Framing
              </span>
            </div>
            <p className="text-xs sm:text-sm text-braj-indigo-950/80 leading-relaxed pt-1">
              This interactive planner demonstrates optimal pilgrimage sequencing, midday temple closure intervals (12:30 PM – 04:30 PM), and realistic travel transit times across Braj Bhoomi. It is not connected to a live booking or AI engine and should be used as a structural guide for planning.
            </p>
          </div>
        </div>
      </div>

      {/* PLANNER PREFERENCES FORM */}
      <section className="rounded-3xl border border-braj-cream-300 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-braj-cream-200 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-braj-indigo-950 flex items-center gap-2">
              <Compass className="h-5 w-5 text-braj-saffron-600" />
              Your Pilgrimage Preferences
            </h2>
            <p className="text-xs sm:text-sm text-braj-indigo-950/70 mt-0.5">
              Customize starting point, duration, group demographics, and interests.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={resetToDefault}
            className="flex items-center gap-1.5 text-xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset Itinerary
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Starting Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-braj-indigo-950 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-braj-saffron-600" />
              Starting Location / City
            </label>
            <input
              type="text"
              value={startCity}
              onChange={(e) => setStartCity(e.target.value)}
              className="w-full rounded-xl border border-braj-cream-300 bg-braj-cream-50/50 px-3.5 py-2.5 text-sm text-braj-indigo-950 focus:border-braj-saffron-500 focus:outline-hidden"
              placeholder="e.g. Delhi NCR, Agra, Mathura Junction"
            />
          </div>

          {/* Travel Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-braj-indigo-950 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-braj-saffron-600" />
              Travel Start Date
            </label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full rounded-xl border border-braj-cream-300 bg-braj-cream-50/50 px-3.5 py-2.5 text-sm text-braj-indigo-950 focus:border-braj-saffron-500 focus:outline-hidden"
            />
          </div>

          {/* Trip Duration */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-braj-indigo-950 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-braj-saffron-600" />
              Trip Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => handleDurationChange(d)}
                  className={`py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    duration === d
                      ? "bg-braj-saffron-600 text-white shadow-2xs"
                      : "bg-braj-cream-50 text-braj-indigo-950 border border-braj-cream-300 hover:bg-braj-cream-100"
                  }`}
                >
                  {d} {d === 1 ? "Day" : "Days"}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Tier */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-braj-indigo-950 flex items-center gap-1.5">
              <Wallet className="h-3.5 w-3.5 text-braj-saffron-600" />
              Budget Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["budget", "moderate", "premium"] as const).map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBudgetTier(b)}
                  className={`py-2 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                    budgetTier === b
                      ? "bg-braj-indigo-950 text-white shadow-2xs"
                      : "bg-braj-cream-50 text-braj-indigo-950 border border-braj-cream-300 hover:bg-braj-cream-100"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Travellers Count & Group Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-braj-indigo-950 flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-braj-saffron-600" />
              Pilgrim Group Type & Size
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min={1}
                max={50}
                value={travellers}
                onChange={(e) => setTravellers(Number(e.target.value) || 1)}
                className="w-20 rounded-xl border border-braj-cream-300 bg-braj-cream-50/50 px-3 py-2 text-sm text-center text-braj-indigo-950 focus:border-braj-saffron-500 focus:outline-hidden"
              />
              <select
                value={groupType}
                onChange={(e) => setGroupType(e.target.value as "Solo" | "Couple" | "Family with Kids" | "Senior Citizens" | "Satsang Yatra")}
                className="flex-1 rounded-xl border border-braj-cream-300 bg-braj-cream-50/50 px-3 py-2 text-sm text-braj-indigo-950 focus:border-braj-saffron-500 focus:outline-hidden"
              >
                <option value="Solo">Solo Traveler</option>
                <option value="Couple">Couple</option>
                <option value="Family with Kids">Family with Kids</option>
                <option value="Senior Citizens">Senior Citizens (Special Pace)</option>
                <option value="Satsang Yatra">Satsang / Group Yatra</option>
              </select>
            </div>
          </div>

          {/* Travel Pace & Language */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-braj-indigo-950 flex items-center gap-1.5">
              <Languages className="h-3.5 w-3.5 text-braj-saffron-600" />
              Travel Pace & Preferred Language
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={travelPace}
                onChange={(e) => setTravelPace(e.target.value as "Relaxed" | "Balanced" | "Intensive")}
                className="rounded-xl border border-braj-cream-300 bg-braj-cream-50/50 px-2.5 py-2 text-xs sm:text-sm text-braj-indigo-950 focus:border-braj-saffron-500 focus:outline-hidden"
              >
                <option value="Relaxed">Relaxed Pace</option>
                <option value="Balanced">Balanced</option>
                <option value="Intensive">Intensive Darshan</option>
              </select>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="rounded-xl border border-braj-cream-300 bg-braj-cream-50/50 px-2.5 py-2 text-xs sm:text-sm text-braj-indigo-950 focus:border-braj-saffron-500 focus:outline-hidden"
              >
                <option value="Hindi & English">Hindi & English</option>
                <option value="Hindi Only">Hindi (हिन्दी)</option>
                <option value="English Only">English</option>
                <option value="Braj Bhasha & Hindi">Braj Bhasha</option>
              </select>
            </div>
          </div>
        </div>

        {/* Multi-select Interests */}
        <div className="space-y-2 pt-2 border-t border-braj-cream-200">
          <label className="text-xs font-bold text-braj-indigo-950 block">
            Special Interests & Yatra Focus:
          </label>
          <div className="flex flex-wrap gap-2">
            {availableInterests.map((interest) => {
              const active = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    active
                      ? "bg-braj-saffron-500 text-white shadow-2xs"
                      : "bg-braj-cream-50 text-braj-indigo-950/80 border border-braj-cream-300 hover:border-braj-gold-400"
                  }`}
                >
                  {active ? "✓ " : "+ "}
                  {interest}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* RESULTS: DAY-WISE ITINERARY */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-braj-indigo-950 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-braj-saffron-600" />
              Day-by-Day Pilgrimage Plan ({duration} {duration === 1 ? "Day" : "Days"})
            </h2>
            <p className="text-xs sm:text-sm text-braj-indigo-950/70">
              Honoring Braj traditions, mandatory temple closure periods, and authentic travel transit times.
            </p>
          </div>

          {/* Day Tabs */}
          <div className="flex items-center gap-2">
            {customDays.map((day, idx) => (
              <button
                key={day.day}
                type="button"
                onClick={() => setActiveDayIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeDayIndex === idx
                    ? "bg-braj-saffron-600 text-white shadow-xs"
                    : "bg-white text-braj-indigo-950 border border-braj-cream-300 hover:bg-braj-cream-100"
                }`}
              >
                Day {day.day}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Day View */}
        {customDays[activeDayIndex] && (
          <div className="rounded-3xl border border-braj-cream-300 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-braj-cream-200 pb-4">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <StatusBadge variant="gold" size="sm">
                  Day {customDays[activeDayIndex].day} of {duration}
                </StatusBadge>
                <h3 className="text-lg sm:text-xl font-bold text-braj-indigo-950">
                  {customDays[activeDayIndex].title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm font-medium text-braj-saffron-700">
                Theme: {customDays[activeDayIndex].theme}
              </p>
            </div>

            {/* Stops Timeline */}
            <div className="space-y-4">
              {customDays[activeDayIndex].stops.map((stop) => {
                const isRest = stop.category === "rest";
                return (
                  <div
                    key={stop.id}
                    className={`rounded-2xl border p-4 sm:p-5 transition-all ${
                      isRest
                        ? "border-amber-300 bg-amber-50/50"
                        : "border-braj-cream-300 bg-white hover:border-braj-gold-400"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider ${
                              stop.timeSlot === "morning"
                                ? "bg-amber-100 text-amber-900"
                                : stop.timeSlot === "afternoon"
                                ? "bg-red-100 text-red-900"
                                : "bg-indigo-100 text-indigo-900"
                            }`}
                          >
                            {stop.timeSlot === "morning" ? (
                              <Sun className="inline h-3 w-3 mr-1" />
                            ) : stop.timeSlot === "afternoon" ? (
                              <Clock className="inline h-3 w-3 mr-1" />
                            ) : (
                              <Moon className="inline h-3 w-3 mr-1" />
                            )}
                            {stop.timeRange}
                          </span>

                          <span className="text-xs font-semibold text-braj-indigo-950/70 flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-braj-saffron-600" />
                            {stop.destination}
                          </span>

                          {stop.travelFromPrev && (
                            <span className="text-2xs text-braj-indigo-950/60 bg-braj-cream-100 px-2 py-0.5 rounded">
                              Transit: {stop.travelFromPrev}
                            </span>
                          )}
                        </div>

                        <h4 className="text-base sm:text-lg font-bold text-braj-indigo-950">
                          {stop.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-braj-indigo-950/80 leading-relaxed">
                          {stop.notes}
                        </p>

                        {/* Temple link if slug exists */}
                        {stop.slug && (
                          <div className="pt-2 flex items-center gap-3">
                            <Link
                              href={`/temples/${stop.slug}`}
                              className="text-xs font-bold text-braj-saffron-600 hover:text-braj-saffron-700 flex items-center gap-1"
                            >
                              View Temple Details & Gates
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                            <Link
                              href={`/gate-finder?temple=${stop.slug}`}
                              className="text-xs font-medium text-braj-indigo-950/70 hover:text-braj-indigo-950 underline"
                            >
                              Gate Finder Map
                            </Link>
                          </div>
                        )}
                      </div>

                      {/* Remove Stop Button */}
                      <button
                        type="button"
                        onClick={() => removeStop(activeDayIndex, stop.id)}
                        className="p-1.5 rounded-lg text-braj-indigo-950/40 hover:text-red-600 hover:bg-red-50 transition-colors self-start cursor-pointer"
                        title="Remove stop from demonstration plan"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Midday Closure Reminder Box */}
            <div className="rounded-xl border border-braj-gold-300 bg-braj-cream-50 p-4 flex items-start gap-3">
              <Info className="h-5 w-5 text-braj-gold-600 shrink-0 mt-0.5" />
              <div className="text-xs text-braj-indigo-950/80 leading-relaxed">
                <strong className="text-braj-indigo-950">Mandatory Braj Tradition:</strong> All sanctums close strictly between 12:30 PM and 04:30 PM for Thakur Ji&apos;s afternoon Rajbhog and Shayan. Do not attempt temple darshans during this window. Use this time for traditional sattvic meals, rest, or checking into your dharamshala/hotel.
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ESTIMATED BUDGET BREAKDOWN TABLE */}
      <section className="rounded-3xl border border-braj-cream-300 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-braj-indigo-950 flex items-center gap-2">
            <Wallet className="h-5 w-5 text-braj-saffron-600" />
            Estimated Pilgrimage Budget Breakdown
          </h2>
          <p className="text-xs sm:text-sm text-braj-indigo-950/70 mt-0.5">
            Representative local expenses across Braj Bhoomi. All sanctum entries are universally free.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-braj-cream-300 bg-braj-cream-50/70">
                <th className="py-3 px-4 font-bold text-braj-indigo-950">Expense Category</th>
                <th className="py-3 px-4 font-bold text-braj-indigo-950">Budget / Ashram</th>
                <th className="py-3 px-4 font-bold text-braj-indigo-950">Moderate (Recommended)</th>
                <th className="py-3 px-4 font-bold text-braj-indigo-950">Premium Comfort</th>
                <th className="py-3 px-4 font-semibold text-braj-indigo-950/70">Local Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-braj-cream-200">
              {BUDGET_DATA.map((row, idx) => (
                <tr
                  key={row.category}
                  className={`hover:bg-braj-cream-50/50 transition-colors ${
                    idx === BUDGET_DATA.length - 1 ? "bg-amber-50/40 font-bold" : ""
                  }`}
                >
                  <td className="py-3.5 px-4 font-semibold text-braj-indigo-950">{row.category}</td>
                  <td className="py-3.5 px-4 text-braj-indigo-950/90">{row.budgetVal}</td>
                  <td className="py-3.5 px-4 text-braj-saffron-700 font-semibold">{row.moderateVal}</td>
                  <td className="py-3.5 px-4 text-braj-indigo-950/90">{row.premiumVal}</td>
                  <td className="py-3.5 px-4 text-2xs text-braj-indigo-950/70">{row.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* QUICK TRAVEL DISTANCES & TRANSIT ESTIMATES */}
      <section className="rounded-3xl border border-braj-cream-300 bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-braj-indigo-950 flex items-center gap-2">
          <Car className="h-5 w-5 text-braj-saffron-600" />
          Verified Inter-City Transit Durations in Braj
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="rounded-xl border border-braj-cream-200 p-3.5 bg-braj-cream-50/30">
            <span className="text-2xs font-bold text-braj-saffron-600 uppercase">Mathura ➔ Vrindavan</span>
            <p className="text-sm font-bold text-braj-indigo-950 mt-1">12 km • 25–30 Mins</p>
            <p className="text-2xs text-braj-indigo-950/70 mt-0.5">E-rickshaws, Autos, Taxis available round-the-clock</p>
          </div>
          <div className="rounded-xl border border-braj-cream-200 p-3.5 bg-braj-cream-50/30">
            <span className="text-2xs font-bold text-braj-saffron-600 uppercase">Vrindavan ➔ Govardhan</span>
            <p className="text-sm font-bold text-braj-indigo-950 mt-1">26 km • 35–45 Mins</p>
            <p className="text-2xs text-braj-indigo-950/70 mt-0.5">Direct via Chhatikara-Govardhan Road</p>
          </div>
          <div className="rounded-xl border border-braj-cream-200 p-3.5 bg-braj-cream-50/30">
            <span className="text-2xs font-bold text-braj-saffron-600 uppercase">Govardhan ➔ Barsana</span>
            <p className="text-sm font-bold text-braj-indigo-950 mt-1">21 km • 30 Mins</p>
            <p className="text-2xs text-braj-indigo-950/70 mt-0.5">Scenic rural corridor passing Radhakund</p>
          </div>
          <div className="rounded-xl border border-braj-cream-200 p-3.5 bg-braj-cream-50/30">
            <span className="text-2xs font-bold text-braj-saffron-600 uppercase">Mathura ➔ Gokul</span>
            <p className="text-sm font-bold text-braj-indigo-950 mt-1">10 km • 20 Mins</p>
            <p className="text-2xs text-braj-indigo-950/70 mt-0.5">Across Yamuna barrage to sacred Raman Reti</p>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
