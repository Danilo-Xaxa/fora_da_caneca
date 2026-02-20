import { useParams, Link, Navigate } from "react-router-dom"
import {
  ShoppingCart,
  ArrowLeft,
  Plus,
  Minus,
  Package,
  Truck,
  Shield,
  Check,
  Flame,
} from "lucide-react"
import { useState } from "react"
import Container from "../components/ui/Container"
import Button from "../components/ui/Button"
import Badge from "../components/ui/Badge"
import WhatsAppIcon from "../components/ui/WhatsAppIcon"
import ProductCard from "../components/product/ProductCard"
import { PRODUCTS } from "../constants/products"
import { useCartStore } from "../stores/cartStore"
import { formatPrice } from "../utils/formatPrice"
import { openWhatsAppProduct } from "../utils/whatsapp"
import SEO from "../components/ui/SEO"

const BENEFITS = [
  { icon: Package, text: "Ceramica de alta qualidade (325ml)" },
  { icon: Truck, text: "Envio para todo o Brasil" },
  { icon: Shield, text: "Embalagem segura anti-quebra" },
]

export default function Produto() {
  const { slug } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  const product = PRODUCTS.find((p) => p.slug === slug)

  if (!product) {
    return <Navigate to="/catalogo" replace />
  }

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4)

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      },
      quantity
    )
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images[0],
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Fora da Caneca",
      },
    },
    material: product.material,
    category: product.category,
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0

  return (
    <section className="py-8 md:py-16">
      <SEO
        title={product.name}
        description={`${product.phrase} - ${product.description}`}
        path={`/produto/${product.slug}`}
        type="product"
        jsonLd={productJsonLd}
      />
      <Container>
        {/* Breadcrumb */}
        <Link
          to="/catalogo"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-pink transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Voltar ao catálogo
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden bg-brand-gray border border-gray-200">
            <div
              className="aspect-square flex items-center justify-center text-9xl bg-gradient-to-br from-gray-50 to-gray-100"
              role="img"
              aria-label={`Foto da ${product.name} - ${product.phrase}`}
            >
              ☕
            </div>
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.bestSeller && (
                <Badge variant="bestSeller">Mais Vendida</Badge>
              )}
              {discount > 0 && <Badge variant="sale">-{discount}%</Badge>}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p className="text-brand-pink font-medium uppercase tracking-wide text-sm mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">
              {product.name}
            </h1>
            <p className="text-gray-400 text-lg italic mb-6">
              &ldquo;{product.phrase}&rdquo;
            </p>

            {/* Price */}
            <div className="mb-6">
              {product.originalPrice && (
                <span className="text-gray-400 line-through text-lg block">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold bg-gradient-to-r from-brand-pink to-brand-orange bg-clip-text text-transparent">
                  {formatPrice(product.price)}
                </span>
                {discount > 0 && (
                  <span className="px-2 py-1 bg-brand-red/10 text-brand-red text-sm font-bold rounded">
                    -{discount}% OFF
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-sm mt-1">
                ou 3x de {formatPrice(product.price / 3)} sem juros
              </p>
            </div>

            {/* Urgency */}
            {product.bestSeller && (
              <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl mb-6">
                <Flame size={16} className="text-amber-500 shrink-0" />
                <span className="text-amber-700 text-sm font-medium">
                  Últimas unidades! Este produto está entre os mais vendidos.
                </span>
              </div>
            )}

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Details */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 bg-brand-gray rounded-lg text-sm text-gray-500">
                {product.material}
              </span>
              {product.colors.map((color) => (
                <span
                  key={color}
                  className="px-3 py-1 bg-brand-gray rounded-lg text-sm text-gray-500"
                >
                  {color}
                </span>
              ))}
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-200 transition-colors cursor-pointer text-gray-700"
                  aria-label="Diminuir quantidade"
                >
                  <Minus size={18} />
                </button>
                <span className="px-4 font-semibold min-w-[48px] text-center text-gray-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-200 transition-colors cursor-pointer text-gray-700"
                  aria-label="Aumentar quantidade"
                >
                  <Plus size={18} />
                </button>
              </div>

              <Button
                size="lg"
                className={`flex-1 transition-all ${addedToCart ? "!bg-green-500 !from-green-500 !to-green-600" : ""}`}
                onClick={handleAddToCart}
                disabled={addedToCart}
              >
                {addedToCart ? (
                  <>
                    <Check size={20} />
                    Adicionado!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Adicionar ao Carrinho
                  </>
                )}
              </Button>
            </div>

            <Button
              variant="whatsapp"
              size="lg"
              className="w-full"
              onClick={() => openWhatsAppProduct(product.name)}
            >
              <WhatsAppIcon size={20} />
              Pedir pelo WhatsApp
            </Button>

            {/* Benefits */}
            <div className="mt-8 space-y-3 border-t border-gray-200 pt-6">
              {BENEFITS.map((b, i) => {
                const Icon = b.icon
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-gray-500 text-sm"
                  >
                    <Icon size={18} className="text-brand-pink shrink-0" />
                    {b.text}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">Você também pode gostar</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
