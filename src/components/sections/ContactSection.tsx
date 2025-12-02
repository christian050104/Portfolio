import SectionTitle from "@/components/ui/SectionTitle";

export default function ContactSection() {
  return (
    <section id="contact" className="space-y-6">
      <SectionTitle title="Contact" subtitle="Let's work together" />

      <p className="text-slate-300">
        Feel free to reach out if you want to collaborate or hire me:
      </p>

      <div className="space-y-2 text-slate-200">
        <p>
          Email:{" "}
          <a
            href="mailto:christianjppanjaitan@gmail.com"
            className="text-emerald-300"
          >
            christianjppanjaitan@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}
