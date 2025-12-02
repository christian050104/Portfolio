import SectionTitle from "@/components/ui/SectionTitle";
import projects from "@/data/projects";
import ProjectCard from "@/components/project/ProjectCard";

export default function ProjectsSection() {
  return (
    <section id="projects" className="space-y-6">
      <SectionTitle title="Projects" subtitle="Things I've built" />

      <div className="grid md:grid-cols-3 gap-5">
        {projects.map((p) => (
          <ProjectCard
            key={p.name}
            name={p.name}
            role={p.role}
            description={p.description}
            images={p.images}
            github={p.github}  // 🔥 WAJIB ADA
          />
        ))}
      </div>
    </section>
  );
}
