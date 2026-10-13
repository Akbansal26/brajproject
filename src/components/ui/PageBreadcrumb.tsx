import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface PageBreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  homeHref?: string;
  className?: string;
}

export const PageBreadcrumb: React.FC<PageBreadcrumbProps> = ({
  items,
  homeHref = "/",
  className = "",
  ...props
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-xs text-braj-cream-800 ${className}`}
      {...props}
    >
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
        <li className="inline-flex items-center">
          <Link
            href={homeHref}
            className="inline-flex items-center gap-1 text-braj-cream-700 hover:text-braj-saffron-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braj-saffron-500 rounded p-0.5"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="inline-flex items-center gap-1.5 sm:gap-2">
              <ChevronRight
                className="w-3.5 h-3.5 text-braj-gold-500/60 shrink-0"
                aria-hidden="true"
              />

              {isLast || !item.href ? (
                <span
                  className="font-medium text-braj-indigo-950 flex items-center gap-1 truncate max-w-[200px] sm:max-w-xs"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-braj-cream-700 hover:text-braj-saffron-600 transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braj-saffron-500 rounded p-0.5"
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
