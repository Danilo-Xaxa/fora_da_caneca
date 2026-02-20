import { Link } from "react-router-dom"
import { ShoppingCart, Eye } from "lucide-react"
import { useCartStore } from "../../stores/cartStore"
import { formatPrice } from "../../utils/formatPrice"
import Badge from "../ui/Badge"

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem)

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-brand-pink/30 transition-all duration-300 hover:shadow-lg hover:shadow-brand-pink/10">
      {/* Image */}
      <Link to={`/produto/${product.slug}`} className="block relative overflow-hidden">
        <div className="aspect-square bg-brand-gray flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-500">
          ☕
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

        <div className="flex items-center justify-between mt-4">
          <div>
            {product.originalPrice && (
              <span className="text-gray-400 text-xs line-through block">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-lg font-bold bg-gradient-to-r from-brand-pink to-brand-orange bg-clip-text text-transparent">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={() => addItem(product)}
            className="p-3 rounded-xl bg-gradient-to-r from-brand-pink to-brand-orange text-white hover:shadow-lg hover:shadow-brand-pink/30 hover:scale-110 transition-all cursor-pointer"
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
