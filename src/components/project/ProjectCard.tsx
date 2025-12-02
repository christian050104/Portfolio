import ImageCarousel from "./ImageCarousel";

interface ProjectProps {
  name: string;
  role: string;
  description: string;
  images: string[];
  github: string;
}

export default function ProjectCard({
  name,
  role,
  description,
  images,
  github,
}: ProjectProps) {
  return (
    <div className="bg-slate-900/40 border border-white/5 p-4 rounded-xl space-y-3">
      {/* Image Carousel */}
      <ImageCarousel images={images} />

      {/* Text */}
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-slate-400 text-sm">{role}</p>
      <p className="text-sm text-slate-300">{description}</p>

      {/* GitHub Link */}
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-2 text-emerald-300 hover:text-emerald-200 text-sm font-medium"
      >
        {/* GitHub Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.6 1.8 2.8 2.6.7-.7.9-1.2.9-1.2-2.6-.3-5.4-1.3-5.4-6 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3 1.1.9-.3 1.9-.5 3-.5s2.1.2 3 .5c2.1-1.4 3-1.1 3-1.1.6 1.6.2 2.8.1 3.1.7.8 1.1 1.7 1.1 2.9 0 4.7-2.8 5.7-5.4 6 0 .5.2 1 .9 1.2 2.2-.8 2.8-2.5 2.8-2.6 0 0 .6-1.1 1.7-1.2 0 0 1.1 0 .1.7 0 0-.7.4-1.2 1.6 0 0-.7 2.2-3.9 1.5v2c0 .3.2.7.8.6A10.99 10.99 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
        </svg>
        View on GitHub →
      </a>
    </div>
  );
}
