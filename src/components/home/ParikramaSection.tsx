import React from "react";
import { Compass, Footprints, CheckCircle2, Info, Sun, Droplets, Car } from "lucide-react";
import { PageContainer } from "../ui/PageContainer";
import { SectionHeading } from "../ui/SectionHeading";
import { StatusBadge } from "../ui/StatusBadge";
import { Card, CardHeader, CardContent } from "../ui/Card";
import { PARIKRAMA_ROUTES } from "@/data/destinations";

export const ParikramaSection: React.FC = () => {
  return (
    <section id="parikrama" className="py-16 sm:py-20 bg-braj-cream-100 scroll-mt-16">
      <PageContainer>
        {/* Section Heading */}
        <SectionHeading
          badge="Sacred Circumambulation"
          badgeVariant="indigo"
          title="Holy Parikrama Route Guides"
          subtitle="Walking the holy soil of Braj barefoot during Parikrama is considered one of the highest acts of devotional purification in Hindu pilgrimage traditions."
          align="center"
        />

        {/* Parikrama Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {PARIKRAMA_ROUTES.map((route) => (
            <Card key={route.id} className="border-braj-cream-300 flex flex-col justify-between">
              <div>
                <CardHeader className="bg-gradient-to-r from-braj-cream-50 to-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-xl text-braj-indigo-950">{route.name}</h3>
                      <p className="text-xs font-semibold text-braj-saffron-600">{route.hindiName}</p>
                    </div>
                    <StatusBadge variant="saffron" size="sm" className="font-bold">
                      {route.distanceKm} Kilometers
                    </StatusBadge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-3 text-xs bg-braj-cream-100 p-3 rounded-lg border border-braj-cream-200">
                    <div>
                      <span className="text-braj-cream-700 block">Est. Duration:</span>
                      <strong className="text-braj-indigo-950 font-semibold">{route.durationHours}</strong>
                    </div>
                    <div>
                      <span className="text-braj-cream-700 block">Typical Starting Point:</span>
                      <strong className="text-braj-indigo-950 font-semibold">{route.startPoint}</strong>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-braj-indigo-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Footprints className="w-3.5 h-3.5 text-braj-saffron-600" />
                      <span>Key Holy Stops & Kunds</span>
                    </h4>
                    <div className="space-y-1.5">
                      {route.landmarks.map((spot) => (
                        <div key={spot} className="flex items-center gap-2 text-xs text-braj-cream-900">
                          <CheckCircle2 className="w-3.5 h-3.5 text-braj-gold-600 shrink-0" />
                          <span>{spot}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </div>

              <div className="p-4 bg-braj-gold-50/60 border-t border-braj-cream-200 text-xs text-braj-gold-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-braj-gold-600 shrink-0" />
                <span>
                  Always keep the holy hill or sacred shrines to your right side (Pradakshina).
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Practical Parikrama Tips */}
        <div className="p-6 rounded-xl bg-white border border-braj-cream-300 shadow-2xs">
          <h3 className="font-bold text-sm sm:text-base text-braj-indigo-950 mb-3 flex items-center gap-2">
            <Compass className="w-4 h-4 text-braj-saffron-600" />
            <span>Practical Parikrama Pilgrim Advice</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-braj-cream-800">
            <div className="p-3.5 rounded-lg bg-braj-cream-50 border border-braj-cream-200 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-braj-indigo-950">
                <Sun className="w-3.5 h-3.5 text-braj-saffron-600" />
                <span>Best Time to Begin</span>
              </div>
              <p className="text-braj-cream-700">
                Early morning (04:00 AM – 06:00 AM) or after sunset (06:00 PM onwards) to avoid afternoon heat, especially on Giriraj hill.
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-braj-cream-50 border border-braj-cream-200 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-braj-indigo-950">
                <Droplets className="w-3.5 h-3.5 text-braj-indigo-600" />
                <span>Hydration & Footwear</span>
              </div>
              <p className="text-braj-cream-700">
                Carry water and wear soft cotton socks if walking barefoot on concrete paths. Dedicated mud tracks (Kachha Marg) are softer.
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-braj-cream-50 border border-braj-cream-200 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-braj-indigo-950">
                <Car className="w-3.5 h-3.5 text-braj-gold-600" />
                <span>E-Rickshaw Alternative</span>
              </div>
              <p className="text-braj-cream-700">
                For elderly and unwell pilgrims, battery e-rickshaws are permitted on designated sections of the Govardhan parikrama outer ring.
              </p>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
};
