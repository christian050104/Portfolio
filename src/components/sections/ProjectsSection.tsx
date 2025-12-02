"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import projects from "@/data/projects";
import ProjectCard from "@/components/project/ProjectCard";
import { useState } from "react";

export default function ProjectsSection() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Web", "Mobile", "Desktop", "AI/ML"];

  const projectCategories: { [key: string]: string } = {
    "Sistem Monitoring Kesehatan Sapi": "Web",
    "Labverse": "Web",
    "Labtek": "Web",
    "Compro AGS": "Web",
    "EduSnap": "Desktop",
    "SnapStream": "Desktop",
    "Klasifikasi Kotoran Ayam": "AI/ML",
  };

  const filteredProjects = filter === "All" 
    ?  projects 
    : projects.filter(p => projectCategories[p.name] === filter);

  return (
    <section id="projects" className="space-y-10">
      <SectionTitle title="Projects" subtitle="Things I've built" />

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-6 py-2. 5 rounded-xl font-medium transition-all duration-300 ${
              filter === category
                ?  "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/40 scale-105"
                : "glass-effect text-slate-300 hover:text-white hover:border-emerald-500/30"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => (
          <ProjectCard
            key={project.name}
            name={project.name}
            role={project.role}
            description={project.description}
            images={project.images}
            github={project.github}
            category={projectCategories[project.name]}
            delay={idx * 0.1}
          />
        ))}
      </div>

      {/* Projects Stats */}
      <div className="glass-effect rounded-2xl p-8 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 border-emerald-500/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-4xl">🌐</div>
            <div className="text-3xl font-bold text-emerald-400">4+</div>
            <div className="text-sm text-slate-400">Web Projects</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl">📱</div>
            <div className="text-3xl font-bold text-blue-400">1+</div>
            <div className="text-sm text-slate-400">Mobile Apps</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl">🖥️</div>
            <div className="text-3xl font-bold text-purple-400">2+</div>
            <div className="text-sm text-slate-400">Desktop Apps</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl">🤖</div>
            <div className="text-3xl font-bold text-pink-400">1+</div>
            <div className="text-sm text-slate-400">AI/ML Projects</div>
          </div>
        </div>
      </div>
    </section>
  );
}