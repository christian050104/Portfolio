export default function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <p className="text-sm text-emerald-300 uppercase">{subtitle}</p>
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
  );
}
