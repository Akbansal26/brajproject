"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Compass,
  Clock,
  Sparkles,
  MapPin,
  ChevronDown,
  ShieldAlert,
} from "lucide-react";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface HeaderProps {
  className?: string;
}

const sacredDhams = [
  { name: "Mathura", hindi: "मथुरा", desc: "Janmabhoomi & Yamuna Ghats", href: "#mathura" },
  { name: "Vrindavan", hindi: "वृन्दावन", desc: "Bankey Bihari & Prem Mandir", href: "#vrindavan" },
  { name: "Govardhan", hindi: "गोवर्धन", desc: "Giriraj Maharaj Parikrama", href: "#govardhan" },
  { name: "Barsana", hindi: "बरसाना", desc: "Radha Rani Mahal & Lathmar", href: "#barsana" },
  { name: "Nandgaon", hindi: "नन्दगांव", desc: "Nand Bhavan & Pan Sarovar", href: "#nandgaon" },
  { name: "Gokul", hindi: "गोकुल", desc: "Raman Reti & Bal Gopal Lilas", href: "#gokul" },
];

export const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dhamsDropdownOpen, setDhamsDropdownOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-braj-gold-500/20 shadow-xs ${className}`}>
      {/* Top Devotional Ribbon */}
      <div className="bg-braj-indigo-950 text-braj-cream-200 text-xs py-1.5 px-4 border-b border-braj-gold-500/30">
        <Container className="flex items-center justify-between text-[11px] sm:text-xs">
          <div className="flex items-center gap-2">
            <span className="text-braj-saffron-400 font-semibold tracking-wide">राधे राधे</span>
            <span className="hidden sm:inline text-braj-gold-300">|</span>
            <span className="hidden sm:inline text-braj-cream-300">
              Welcome to Braj Bhoomi: Holy Abode of Shri Radha-Krishna
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#helpline"
              className="flex items-center gap-1 text-braj-gold-300 hover:text-braj-saffron-300 transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-braj-saffron-400" />
              <span>Yatra Helpline: 112 / 1800-Braj</span>
            </a>
          </div>
        </Container>
      </div>

      {/* Main Navigation Bar */}
      <div className="py-3 sm:py-3.5">
        <Container className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-braj-saffron-500 rounded-lg p-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-braj-saffron-600 to-braj-indigo-900 flex items-center justify-center text-white shadow-sm border border-braj-gold-400/40 group-hover:scale-105 transition-transform">
              <span className="font-serif text-xl select-none" aria-hidden="true">🦚</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg sm:text-xl text-braj-indigo-950 tracking-tight">
                  BrajMitra <span className="text-braj-saffron-600">AI</span>
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-braj-gold-100 text-braj-gold-800 border border-braj-gold-300">
                  ब्रजमित्र
                </span>
              </div>
              <p className="text-[11px] text-braj-cream-700 hidden sm:block tracking-wide">
                Sacred Braj Travel Companion
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {/* Dhams Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDhamsDropdownOpen(!dhamsDropdownOpen)}
                onBlur={() => setTimeout(() => setDhamsDropdownOpen(false), 200)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-braj-indigo-900 hover:text-braj-saffron-600 rounded-lg hover:bg-braj-cream-100 transition-colors"
                aria-expanded={dhamsDropdownOpen}
              >
                <MapPin className="w-4 h-4 text-braj-saffron-600" />
                <span>6 Sacred Dhams</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dhamsDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {dhamsDropdownOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-72 bg-white rounded-xl shadow-lg border border-braj-gold-400/30 p-2 grid gap-1 z-50">
                  {sacredDhams.map((dham) => (
                    <a
                      key={dham.name}
                      href={dham.href}
                      className="p-2 rounded-lg hover:bg-braj-cream-100 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-braj-indigo-900 group-hover:text-braj-saffron-600">
                            {dham.name}
                          </span>
                          <span className="text-xs text-braj-gold-700 font-medium">{dham.hindi}</span>
                        </div>
                        <p className="text-xs text-braj-cream-700">{dham.desc}</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#darshan"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-braj-indigo-900 hover:text-braj-saffron-600 rounded-lg hover:bg-braj-cream-100 transition-colors"
            >
              <Clock className="w-4 h-4 text-braj-gold-600" />
              <span>Darshan Timings</span>
            </a>

            <a
              href="#parikrama"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-braj-indigo-900 hover:text-braj-saffron-600 rounded-lg hover:bg-braj-cream-100 transition-colors"
            >
              <Compass className="w-4 h-4 text-braj-indigo-600" />
              <span>Parikrama Guides</span>
            </a>

            <a
              href="#ai-mitra"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-braj-indigo-900 hover:text-braj-saffron-600 rounded-lg hover:bg-braj-cream-100 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-braj-saffron-600" />
              <span>AI Mitra</span>
              <Badge variant="saffron" className="text-[10px] py-0 px-1.5">
                Preview
              </Badge>
            </a>
          </nav>

          {/* Right Action / CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a href="#destinations">
              <Button variant="primary" size="sm" className="shadow-xs font-semibold">
                Explore Braj Yatra
              </Button>
            </a>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-braj-indigo-900 hover:bg-braj-cream-100 focus:outline-none focus:ring-2 focus:ring-braj-saffron-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-braj-cream-300 bg-white shadow-xl animate-in fade-in duration-200">
          <Container className="py-4 space-y-4">
            <div className="pb-3 border-b border-braj-cream-200">
              <p className="text-xs font-bold text-braj-saffron-700 uppercase tracking-wider mb-2">
                Sacred Braj Dhams
              </p>
              <div className="grid grid-cols-2 gap-2">
                {sacredDhams.map((dham) => (
                  <a
                    key={dham.name}
                    href={dham.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-braj-cream-50 hover:bg-braj-cream-100 border border-braj-cream-200 text-xs font-medium text-braj-indigo-900 flex items-center justify-between"
                  >
                    <span>{dham.name}</span>
                    <span className="text-braj-saffron-600 font-semibold">{dham.hindi}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <a
                href="#darshan"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-lg text-sm font-medium text-braj-indigo-900 hover:bg-braj-cream-100"
              >
                <Clock className="w-4 h-4 text-braj-gold-600" />
                <span>Darshan & Arati Schedules</span>
              </a>

              <a
                href="#parikrama"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-lg text-sm font-medium text-braj-indigo-900 hover:bg-braj-cream-100"
              >
                <Compass className="w-4 h-4 text-braj-indigo-600" />
                <span>Parikrama Route Guides</span>
              </a>

              <a
                href="#ai-mitra"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-braj-indigo-900 hover:bg-braj-cream-100"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-braj-saffron-600" />
                  <span>AI Mitra Travel Companion</span>
                </div>
                <Badge variant="saffron" className="text-[10px]">Preview</Badge>
              </a>

              <a
                href="#helpline"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-lg text-sm font-medium text-braj-indigo-900 hover:bg-braj-cream-100"
              >
                <ShieldAlert className="w-4 h-4 text-braj-saffron-600" />
                <span>Pilgrim Helpline & Safety</span>
              </a>
            </div>

            <div className="pt-2">
              <a
                href="#destinations"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-2.5 px-4 bg-braj-saffron-600 hover:bg-braj-saffron-700 text-white font-medium rounded-lg text-sm"
              >
                Explore All Dhams
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
};
