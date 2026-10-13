import React from "react";
import {
  Phone,
  ShieldCheck,
  Compass,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Container } from "../ui/Container";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-braj-indigo-950 text-braj-cream-200 border-t-2 border-braj-gold-500/40 relative overflow-hidden">
      {/* Decorative top gold jaali motif border */}
      <div className="h-1.5 bg-gradient-to-r from-braj-gold-600 via-braj-saffron-500 to-braj-gold-600 opacity-90" />

      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Sacred Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-braj-saffron-600 to-braj-indigo-800 flex items-center justify-center text-white border border-braj-gold-400">
                <span className="text-xl" aria-hidden="true">🦚</span>
              </div>
              <div>
                <span className="font-bold text-xl text-white tracking-tight">
                  BrajMitra <span className="text-braj-saffron-400">AI</span>
                </span>
                <span className="block text-xs text-braj-gold-300 font-medium">
                  ब्रजमित्र • Sacred Yatra Companion
                </span>
              </div>
            </div>

            <p className="text-sm text-braj-cream-300 leading-relaxed">
              An intelligent, reverent travel companion for pilgrims and seekers exploring the
              sacred lands of Shri Radha-Krishna across Mathura, Vrindavan, Govardhan, Barsana,
              Nandgaon, and Gokul.
            </p>

            <div className="pt-2 text-xs text-braj-gold-300 flex items-center gap-2">
              <span className="text-braj-saffron-400 text-sm">🙏</span>
              <span>&quot;राधे राधे जपो, चले आएंगे बिहारी&quot;</span>
            </div>
          </div>

          {/* Column 2: Six Sacred Dhams */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-braj-gold-300 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-braj-saffron-400" />
              <span>The Six Sacred Dhams</span>
            </h4>
            <ul className="space-y-2 text-sm text-braj-cream-300">
              <li>
                <a href="#mathura" className="hover:text-braj-saffron-300 transition-colors flex items-center justify-between group">
                  <span>Mathura (श्री मथुरा)</span>
                  <span className="text-xs text-braj-gold-400/60 group-hover:text-braj-gold-400">Janmabhoomi</span>
                </a>
              </li>
              <li>
                <a href="#vrindavan" className="hover:text-braj-saffron-300 transition-colors flex items-center justify-between group">
                  <span>Vrindavan (श्री वृन्दावन)</span>
                  <span className="text-xs text-braj-gold-400/60 group-hover:text-braj-gold-400">Bankey Bihari</span>
                </a>
              </li>
              <li>
                <a href="#govardhan" className="hover:text-braj-saffron-300 transition-colors flex items-center justify-between group">
                  <span>Govardhan (श्री गोवर्धन)</span>
                  <span className="text-xs text-braj-gold-400/60 group-hover:text-braj-gold-400">Giriraj Parikrama</span>
                </a>
              </li>
              <li>
                <a href="#barsana" className="hover:text-braj-saffron-300 transition-colors flex items-center justify-between group">
                  <span>Barsana (श्री बरसाना)</span>
                  <span className="text-xs text-braj-gold-400/60 group-hover:text-braj-gold-400">Radha Rani Palace</span>
                </a>
              </li>
              <li>
                <a href="#nandgaon" className="hover:text-braj-saffron-300 transition-colors flex items-center justify-between group">
                  <span>Nandgaon (श्री नन्दगांव)</span>
                  <span className="text-xs text-braj-gold-400/60 group-hover:text-braj-gold-400">Nand Baba Dham</span>
                </a>
              </li>
              <li>
                <a href="#gokul" className="hover:text-braj-saffron-300 transition-colors flex items-center justify-between group">
                  <span>Gokul (श्री गोकुल)</span>
                  <span className="text-xs text-braj-gold-400/60 group-hover:text-braj-gold-400">Raman Reti</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Pilgrim Guides */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-braj-gold-300 uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-braj-gold-400" />
              <span>Pilgrim Guides</span>
            </h4>
            <ul className="space-y-2 text-sm text-braj-cream-300">
              <li>
                <a href="#darshan" className="hover:text-braj-saffron-300 transition-colors">
                  Temple Darshan & Aarti Schedules
                </a>
              </li>
              <li>
                <a href="#parikrama" className="hover:text-braj-saffron-300 transition-colors">
                  Giriraj 21 km Parikrama Guide
                </a>
              </li>
              <li>
                <a href="#parikrama" className="hover:text-braj-saffron-300 transition-colors">
                  Vrindavan Panchkosi Parikrama
                </a>
              </li>
              <li>
                <a href="#etiquette" className="hover:text-braj-saffron-300 transition-colors">
                  Temple Dress Code & Footwear Etiquette
                </a>
              </li>
              <li>
                <a href="#ai-mitra" className="hover:text-braj-saffron-300 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-braj-saffron-400" />
                  <span>AI Mitra Trip Assistant (Upcoming)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Pilgrim Help & Emergency */}
          <div id="helpline" className="space-y-3">
            <h4 className="text-sm font-bold text-braj-gold-300 uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4 text-braj-saffron-400" />
              <span>Helplines & Assistance</span>
            </h4>
            <div className="space-y-2 text-sm">
              <div className="p-3 rounded-lg bg-braj-indigo-900/80 border border-braj-gold-500/30 space-y-1.5">
                <p className="text-xs text-braj-gold-300 font-semibold">Emergency Services</p>
                <div className="flex justify-between text-xs">
                  <span className="text-braj-cream-300">Police Emergency:</span>
                  <span className="text-white font-mono font-bold">112</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-braj-cream-300">Tourist Police Mathura:</span>
                  <span className="text-white font-mono font-bold">+91 565 240 3244</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-braj-cream-300">Ambulance Service:</span>
                  <span className="text-white font-mono font-bold">108</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-braj-saffron-900/30 border border-braj-saffron-700/40 text-xs text-braj-cream-300 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-braj-saffron-400 shrink-0 mt-0.5" />
                <span>
                  Always leave footwear at official temple cloak counters. Avoid touts and unauthorized guides.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Devotional & Legal Bar */}
        <div className="mt-12 pt-6 border-t border-braj-indigo-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-braj-cream-400">
          <div className="flex items-center gap-2 text-braj-gold-300/80 font-medium">
            <span>जय श्री राधे कृष्ण</span>
            <span>•</span>
            <span>ॐ नमो भगवते वासुदेवाय</span>
          </div>

          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} BrajMitra AI. All rights reserved.</span>
            <span>Crafted for Braj Yatra Pilgrims</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
