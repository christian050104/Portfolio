import SectionTitle from "@/components/ui/SectionTitle";

export default function AboutSection() {
  return (
    <section id="about" className="space-y-6">
      <SectionTitle title="About Me" subtitle="Who I am" />

      <p className="text-slate-300 leading-relaxed">
        My name is Christian Jhon Pranata Panjaitan, a passionate Fullstack Developer 
        experienced in backend, frontend, mobile, and desktop development.
      </p>

      <p className="text-slate-300 leading-relaxed">
        I have built systems ranging from e-commerce platforms, company profile websites, 
        livestock health monitoring systems, real-time communication apps,  
        and machine learning applications.
      </p>

      <p className="text-slate-300 leading-relaxed">
        I enjoy solving complex problems, writing clean code, and building products that help users.
      </p>
    </section>
  );
}
