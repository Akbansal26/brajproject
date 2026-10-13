import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppFooter } from "@/components/layout/AppFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BrajMitra AI • Sacred Braj Travel Companion (मथुरा • वृन्दावन • गोवर्धन)",
  description:
    "AI-powered spiritual travel companion for pilgrims and seekers visiting Mathura, Vrindavan, Govardhan, Barsana, Nandgaon, and Gokul. Darshan timings, Parikrama guides, and sacred heritage insights.",
  keywords: [
    "BrajMitra AI",
    "Mathura",
    "Vrindavan",
    "Govardhan Parikrama",
    "Barsana",
    "Nandgaon",
    "Gokul",
    "Bankey Bihari Darshan Timings",
    "Braj Yatra Guide",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-braj-cream-100 text-braj-indigo-950">
        <AppHeader />
        <main className="flex-1 w-full">{children}</main>
        <AppFooter />
      </body>
    </html>
  );
}
