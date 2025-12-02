import SectionTitle from "@/components/ui/SectionTitle";
import experience from "@/data/experience";

export default function ExperienceSection() {
  return (
    <section id="experience" className="space-y-6">
      <SectionTitle title="Experience" subtitle="Where I've worked" />

      <div className="space-y-4">
        {experience.map((exp) => (
          <div
            key={exp.company}
            className="bg-slate-900/40 border border-white/5 p-4 rounded-xl"
          >
            <h3 className="font-semibold text-lg">{exp.role}</h3>
            <p className="text-sm text-slate-400">
              {exp.company} • {exp.period}
            </p>

            <ul className="mt-2 list-disc pl-5 text-slate-300 text-sm space-y-1">
              {exp.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
