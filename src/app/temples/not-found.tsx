import React from "react";
import Link from "next/link";
import { Landmark, ArrowLeft, Compass } from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function TempleNotFound() {
  return (
    <PageContainer paddingY="lg" className="space-y-10">
      {/* Breadcrumb Trail */}
      <PageBreadcrumb
        items={[
          { label: "Braj Bhoomi", href: "/" },
          { label: "Sacred Temple Directory", href: "/temples" },
          { label: "Temple Not Found" },
        ]}
      />

      <div className="py-12">
        <EmptyState
          icon={<Landmark className="w-8 h-8 text-braj-saffron-600" />}
          title="Temple Sanctum Not Found"
          description="The requested temple or dham destination could not be located in our verified Braj directory. It may have been updated, renamed, or is currently undergoing field audit."
          action={
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link href="/temples">
                <Button variant="primary" size="md">
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  <span>Back to Temple Directory</span>
                </Button>
              </Link>
              <Link href="/gate-finder">
                <Button variant="outline" size="md">
                  <Compass className="w-4 h-4 mr-1.5" />
                  <span>Check Gate Finder</span>
                </Button>
              </Link>
            </div>
          }
        />
      </div>
    </PageContainer>
  );
}
