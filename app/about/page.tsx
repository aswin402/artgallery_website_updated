"use client";

import AboutPageHero from "@/components/aboutpage/aboutpagehero";
import { PrinciplesSection } from "@/components/aboutpage/PrincipleSection";
import Team from "@/components/aboutpage/teams";

export default function AboutPage() {
  return (
    <>
      <AboutPageHero />
      <PrinciplesSection />
      <Team />
    </>
  );
}
