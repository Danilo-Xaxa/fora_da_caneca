export default function SectionTitle({
  title,
  subtitle,
  emoji,
  centered = true,
  className = "",
}) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""} ${className}`}>
      {emoji && (
        <span className="inline-block text-3xl mb-2 animate-bounce-gentle">
          {emoji}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">{title}</h2>
      {subtitle && (
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div className={`flex items-center gap-2 mt-4 ${centered ? "justify-center" : ""}`}>
        <div className="h-1 w-8 rounded-full bg-brand-pink" />
        <div className="h-1 w-4 rounded-full bg-brand-orange" />
        <div className="h-1 w-2 rounded-full bg-brand-brown" />
      </div>
    </div>
  )
}
