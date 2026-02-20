export default function SectionTitle({
  title,
  subtitle,
  centered = true,
  className = "",
}) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">{title}</h2>
      {subtitle && (
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div
        className={`mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-brand-pink to-brand-orange ${centered ? "mx-auto" : ""}`}
      />
    </div>
  )
}