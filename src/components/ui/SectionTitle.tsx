export default function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center space-y-3 mb-12">
      <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider flex items-center justify-center gap-2">
        <span className="w-8 h-[2px] bg-gradient-to-r from-transparent to-emerald-500"></span>
        {subtitle}
        <span className="w-8 h-[2px] bg-gradient-to-r from-emerald-500 to-transparent"></span>
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-white">
        {title}
      </h2>
      <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mx-auto"></div>
    </div>
  );
}