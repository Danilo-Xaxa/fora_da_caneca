const variants = {
  sale: "bg-brand-red text-white",
  new: "bg-gradient-to-r from-brand-pink to-brand-orange text-white",
  bestSeller: "bg-yellow-500 text-black",
}

export default function Badge({ children, variant = "new", className = "" }) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
