export default function CategoryFilter({
  categories = [],
  selected,
  onSelect,
  className = "",
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
          selected === null
            ? "bg-gradient-to-r from-brand-pink to-brand-orange text-white"
            : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
        }`}
      >
        Todas
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onSelect(cat.slug)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
            selected === cat.slug
              ? "bg-gradient-to-r from-brand-pink to-brand-orange text-white"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
