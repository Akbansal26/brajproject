import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, BookOpen, Heart, Landmark, Calendar } from "lucide-react";
import { PageContainer } from "../ui/PageContainer";
import { SectionHeading } from "../ui/SectionHeading";
import { StatusBadge } from "../ui/StatusBadge";
import { Button } from "../ui/Button";
import { CULTURAL_STORIES } from "@/data/culture";

export const CulturalDiscoverySection: React.FC = () => {
  const categoryIcons: Record<string, React.ReactNode> = {
    tradition: <Landmark className="w-4 h-4 text-braj-saffron-600" />,
    seva: <Heart className="w-4 h-4 text-braj-gold-600" />,
    lila: <BookOpen className="w-4 h-4 text-braj-indigo-600" />,
    festival: <Calendar className="w-4 h-4 text-braj-saffron-600" />,
  };

  return (
    <section id="culture" className="py-16 sm:py-20 bg-white border-b border-braj-cream-300 scroll-mt-16">
      <PageContainer>
        <SectionHeading
          badge="Braj Sanskriti"
          badgeVariant="gold"
          title="Cultural Discovery & Living Devotion"
          subtitle="Explore the timeless spiritual heritage of Shri Radha-Krishna. From the loving domestic seva of Laddu Gopal Ji to the divine pastimes and ecstatic 40-day festivals."
          align="center"
          action={
            <Link href="/culture">
              <Button variant="outline" size="sm" icon={<Sparkles className="w-4 h-4" />}>
                View All Traditions
              </Button>
            </Link>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CULTURAL_STORIES.map((story) => (
            <Link
              key={story.id}
              href={`/culture#${story.id}`}
              className="group rounded-2xl border border-braj-cream-300 bg-braj-cream-50/50 p-6 shadow-2xs hover:shadow-md hover:border-braj-gold-400 hover:bg-white transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-white border border-braj-cream-200 flex items-center justify-center shadow-2xs">
                    {categoryIcons[story.category] || <Sparkles className="w-4 h-4 text-braj-saffron-600" />}
                  </div>
                  <StatusBadge variant="gold" size="sm">
                    {story.categoryLabel}
                  </StatusBadge>
                </div>

                <div>
                  <h3 className="font-bold text-base text-braj-indigo-950 group-hover:text-braj-saffron-600 transition-colors leading-snug">
                    {story.title}
                  </h3>
                  <span className="text-xs font-semibold text-braj-saffron-600 block mt-1">
                    {story.hindiTitle}
                  </span>
                  <p className="mt-2.5 text-xs text-braj-cream-800 leading-relaxed line-clamp-3">
                    {story.excerpt}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-braj-cream-200 flex items-center justify-between text-xs font-semibold text-braj-saffron-600 group-hover:text-braj-saffron-700">
                <span>Read Full Story</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </PageContainer>
    </section>
  );
};
