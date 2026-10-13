"use client";

import React, { useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";

export interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
  shortcutHint?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
  loading = false,
  size = "md",
  shortcutHint = "/",
  placeholder = "Search temples, ghats, darshan timings, or dhams...",
  disabled = false,
  className = "",
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
    inputRef.current?.focus();
  };

  const sizeStyles = {
    sm: "h-9 text-xs pl-8 pr-16",
    md: "h-11 text-sm pl-10 pr-20",
    lg: "h-13 text-base pl-12 pr-24",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5 left-2.5",
    md: "w-4 h-4 left-3.5",
    lg: "w-5 h-5 left-4",
  };

  return (
    <div className={`relative flex items-center w-full ${className}`}>
      {/* Search Icon or Loading Spinner */}
      <div
        className={`absolute pointer-events-none text-braj-gold-600 flex items-center ${iconSizes[size]}`}
      >
        {loading ? (
          <Loader2 className="animate-spin w-4 h-4 text-braj-saffron-600" aria-hidden="true" />
        ) : (
          <Search className="w-4 h-4 text-braj-gold-600" aria-hidden="true" />
        )}
      </div>

      {/* Input Element */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        aria-label="Search"
        className={`w-full rounded-xl bg-white border border-braj-cream-300 text-braj-indigo-950 placeholder:text-braj-cream-600 focus:outline-none focus:border-braj-saffron-500 focus:ring-2 focus:ring-braj-saffron-400/20 disabled:opacity-50 disabled:bg-braj-cream-100 transition-all duration-200 shadow-2xs ${sizeStyles[size]}`}
        {...props}
      />

      {/* Trailing Controls: Clear Button & Shortcut Badge */}
      <div className="absolute right-2.5 flex items-center gap-1.5">
        {value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 rounded-md text-braj-cream-600 hover:text-braj-indigo-950 hover:bg-braj-cream-100 focus:outline-none focus:ring-1 focus:ring-braj-saffron-500 transition-colors cursor-pointer"
            aria-label="Clear search query"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {shortcutHint && !value && (
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-braj-cream-600 bg-braj-cream-100 border border-braj-cream-300 rounded shadow-2xs select-none">
            {shortcutHint}
          </kbd>
        )}
      </div>
    </div>
  );
};
