import { CATEGORIES } from "../../constants/categories"

export default function CategoryFilter({
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
            : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
        }`}
      >
        Todas
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
            selected === cat.id
              ? "bg-gradient-to-r from-brand-pink to-brand-orange text-white"
              : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}