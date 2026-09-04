"use client";

import useScrollReveal from "@/hooks/useScrollReveal";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <div className="noise-overlay" />
      <div className="fixed inset-0 -z-20 bg-mesh" />

      <main>
        <HeroSection />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32 py-16">
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <ContactSection />
          </div>
        </div>
      </main>
    </>
  );
}