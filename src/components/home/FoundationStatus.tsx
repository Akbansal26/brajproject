import React from "react";
import { CheckCircle2 } from "lucide-react";
import { PageContainer } from "../ui/PageContainer";
import { StatusBadge } from "../ui/StatusBadge";

export const FoundationStatus: React.FC = () => {
  return (
    <section className="py-12 bg-braj-cream-50 border-t border-braj-cream-300">
      <PageContainer>
        <div className="rounded-2xl border border-braj-gold-500/30 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-braj-cream-200">
            <div>
              <div className="flex items-center gap-2">
                <StatusBadge variant="indigo" dot>
                  Design System Verified
                </StatusBadge>
                <span className="text-xs font-mono text-braj-cream-700">v0.2.0-ui-system</span>
              </div>
              <h3 className="text-lg font-bold text-braj-indigo-950 mt-1">
                BrajMitra AI Design System & Architecture Status
              </h3>
            </div>
            <p className="text-xs text-braj-cream-700 max-w-sm">
              All 13 reusable UI components implemented with accessible contrast, responsive layouts, and typed contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-braj-cream-100/60 border border-braj-cream-300 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-braj-indigo-950 block">Next.js App Router</strong>
                <span className="text-braj-cream-800">TypeScript strict mode, Turbopack, and clean src directory.</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-braj-cream-100/60 border border-braj-cream-300 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-braj-indigo-950 block">Design System Tokens</strong>
                <span className="text-braj-cream-800">Deep Indigo, Sacred Saffron, Warm Cream, and Subtle Gold palette.</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-braj-cream-100/60 border border-braj-cream-300 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-braj-indigo-950 block">Responsive Components</strong>
                <span className="text-braj-cream-800">AppHeader, AppFooter, MobileNavigation, and 10 UI system primitives.</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-braj-cream-100/60 border border-braj-cream-300 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-braj-indigo-950 block">Extensible Structure</strong>
                <span className="text-braj-cream-800">Ready for upcoming Supabase database and LLM API integrations.</span>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
};
