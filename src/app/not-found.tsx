import React from "react";
import Link from "next/link";
import { Compass, ArrowLeft, Home } from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function RootNotFound() {
  return (
    <PageContainer paddingY="lg" className="min-h-[60vh] flex items-center justify-center">
      <EmptyState
        icon={<Compass className="w-8 h-8 text-braj-saffron-600" />}
        title="Sacred Destination Not Found (404)"
        description="The holy page or destination you are seeking could not be found. Please check the URL or navigate back to the temple directory."
        action={
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link href="/temples">
              <Button variant="primary" size="md">
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                <span>Explore Sacred Temples</span>
              </Button>
            </Link>
            <Link href="/">
              <Button variant="secondary" size="md">
                <Home className="w-4 h-4 mr-1.5" />
                <span>Return to Home</span>
              </Button>
            </Link>
          </div>
        }
      />
    </PageContainer>
  );
}
