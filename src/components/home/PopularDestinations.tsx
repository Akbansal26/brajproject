import React from "react";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { PageContainer } from "../ui/PageContainer";
import { SectionHeading } from "../ui/SectionHeading";
import { DestinationCard } from "../ui/DestinationCard";
import { Button } from "../ui/Button";
import { SACRED_DESTINATIONS } from "@/data/destinations";

export const PopularDestinations: React.FC = () => {
  return (
    <section id="destinations" className="py-16 sm:py-20 bg-braj-cream-100 scroll-mt-16">
      <PageContainer>
        <SectionHeading
          badge="Sacred Braj Mandala"
          badgeVariant="saffron"
          title="Popular Braj Pilgrimage Destinations"
          subtitle="Explore the six consecrated centers of Braj Bhoomi. Every holy Dham is rich in ancient temple history, sacred water bodies (Kunds), and eternal Radha-Krishna lilas."
          align="center"
          action={
            <Link href="/explore">
              <Button variant="outline" size="sm" icon={<Compass className="w-4 h-4" />}>
                Explore All Dhams
              </Button>
            </Link>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SACRED_DESTINATIONS.map((dham) => (
            <div key={dham.id} className="h-full">
              <DestinationCard
                destination={dham}
                imageUrl={dham.imageUrl}
                className="h-full"
              />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/planner">
            <Button variant="primary" size="md" className="font-semibold shadow-xs">
              <span>Create Multi-Dham Itinerary</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </PageContainer>
    </section>
  );
};
