"use client";

import useScrollReveal from "@/hooks/useScrollReveal";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import FeaturedSection from "@/components/sections/FeaturedSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import ResumeModal from "@/components/ui/ResumeModal";
import ToastNotification from "@/components/ui/ToastNotification";
import type { ProjectItem } from "@/data/projects";

export default function PortfolioClient({ projects }: { projects: ProjectItem[] }) {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <div className="fixed inset-0 -z-20 bg-mesh transition-colors duration-300" />

      <main className="w-full max-w-[100vw] overflow-x-clip">
        <HeroSection />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20 sm:space-y-24 md:space-y-28 py-10 md:py-16">
            <AboutSection />
            <SkillsSection />
            <FeaturedSection projectsData={projects} />
            <ProjectsSection projectsData={projects} />
            <ExperienceSection />
            <ContactSection />
          </div>
        </div>
      </main>

      <ResumeModal />
      <ToastNotification />
    </>
  );
}

