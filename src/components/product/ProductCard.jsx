import { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart, Eye, Check } from "lucide-react"
import { useCartStore } from "../../stores/cartStore"
import { formatPrice } from "../../utils/formatPrice"
import Badge from "../ui/Badge"

const ACCENT_COLORS = [
  "accent-pink",
  "accent-orange",
  "accent-brown",
  "accent-red",
  "accent-green",
]

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem)
  const [added, setAdded] = useState(false)

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0

  const accentClass = ACCENT_COLORS[product.id % ACCENT_COLORS.length]

  return (
    <div className={`group card-hover bg-white rounded-2xl overflow-hidden border border-gray-100 ${accentClass}`}>
      {/* Image */}
      <Link to={`/produto/${product.slug}`} className="block relative overflow-hidden">
        <div
          className="aspect-square bg-gradient-to-br from-brand-gray via-white to-brand-gray flex items-center justify-center text-6xl"
          role="img"
          aria-label={`Foto da ${product.name}`}
        >
          <span className="group-hover:scale-125 transition-transform duration-500">
            ☕
          </span>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.bestSeller && <Badge variant="bestSeller">Mais vendida</Badge>}
          {discount > 0 && <Badge variant="sale">-{discount}%</Badge>}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="flex items-center gap-2 text-white font-medium bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <Eye size={18} />
            Ver detalhes
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link to={`/produto/${product.slug}`}>
          <h3 className="font-semibold text-gray-800 group-hover:text-brand-pink transition-colors truncate">
            {product.name}
          </h3>
          <p className="text-gray-400 text-sm mt-1 line-clamp-2 h-10">
            {product.phrase}
          </p>
        </Link>

        <div className="flex items-end justify-between mt-3 pt-3 border-t border-gray-100">
          <div>
            {product.originalPrice && (
              <span className="text-gray-400 text-xs line-through block">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-xl font-bold text-gradient">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={() => {
              addItem(product)
              setAdded(true)
              setTimeout(() => setAdded(false), 1500)
              window.dispatchEvent(
                new CustomEvent("cart-toast", {
                  detail: { name: product.name, quantity: 1 },
                })
              )
            }}
            className={`p-2.5 rounded-full text-white transition-all duration-300 cursor-pointer ${
              added
                ? "bg-green-500 scale-110"
                : "bg-gradient-to-r from-brand-pink to-brand-orange hover:shadow-lg hover:shadow-brand-pink/30 hover:scale-110"
            }`}
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            {added ? <Check size={16} /> : <ShoppingCart size={16} />}
          </button>
        </div>
      </div>
    </div>
  )
}
