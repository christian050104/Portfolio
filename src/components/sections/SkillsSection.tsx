import SectionTitle from "@/components/ui/SectionTitle";
import skills from "@/data/skills";

export default function SkillsSection() {
  return (
    <section id="skills" className="space-y-6">
      <SectionTitle title="Skills & Tech Stack" subtitle="Tools I use" />

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-slate-800 border border-slate-700 text-xs rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
