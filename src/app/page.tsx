import { Hero } from "@/components/home/Hero";
import { PopularDestinations } from "@/components/home/PopularDestinations";
import { MainFeatures } from "@/components/home/MainFeatures";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CulturalDiscoverySection } from "@/components/home/CulturalDiscoverySection";
import { PlanJourneyCTA } from "@/components/home/PlanJourneyCTA";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Popular Braj Destinations */}
      <PopularDestinations />

      {/* 3. Main Features (AI Assistant, Planner, Gate Finder, Crowd Intel, Interactive Maps, Braj Sanskriti) */}
      <MainFeatures />

      {/* 4. How It Works */}
      <HowItWorks />

      {/* 5. Cultural Discovery (Krishna Traditions, Laddu Gopal Ji, Braj Leela, Local Festivals) */}
      <CulturalDiscoverySection />

      {/* 6. Travel Planning Call to Action */}
      <PlanJourneyCTA />
    </div>
  );
}
