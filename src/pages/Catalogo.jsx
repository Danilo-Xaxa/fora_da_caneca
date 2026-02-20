import { useState, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { SlidersHorizontal, Search, X } from "lucide-react"
import Container from "../components/ui/Container"
import SectionTitle from "../components/ui/SectionTitle"
import ProductGrid from "../components/product/ProductGrid"
import CategoryFilter from "../components/product/CategoryFilter"
import { PRODUCTS } from "../constants/products"
import SEO from "../components/ui/SEO"

const SORT_OPTIONS = [
  { value: "featured", label: "Destaques" },
  { value: "price-asc", label: "Menor preço" },
  { value: "price-desc", label: "Maior preço" },
  { value: "name", label: "A - Z" },
]

function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

export default function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get("categoria")
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    if (category) {
      setSearchParams({ categoria: category })
    } else {
      setSearchParams({})
    }
  }

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS]

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const query = normalize(searchQuery.trim())
      result = result.filter(
        (p) =>
          normalize(p.name).includes(query) ||
          normalize(p.phrase).includes(query) ||
          normalize(p.description).includes(query)
      )
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "featured":
      default:
        result.sort((a, b) => {
          if (a.bestSeller && !b.bestSeller) return -1
          if (!a.bestSeller && b.bestSeller) return 1
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return 0
        })
        break
    }

    return result
  }, [selectedCategory, sortBy, searchQuery])

  return (
    <section className="py-12 md:py-20">
      <SEO
        title="Catálogo"
        description="Navegue pelo catálogo completo de canecas personalizadas da Fora da Caneca. Humor, café, românticas, música e personalizadas."
        path="/catalogo"
      />
      <Container>
        <SectionTitle
          title="Catálogo"
          subtitle={`${filteredProducts.length} caneca${filteredProducts.length !== 1 ? "s" : ""} encontrada${filteredProducts.length !== 1 ? "s" : ""}`}
        />

        {/* Search bar */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar canecas por nome, frase ou descrição..."
            className="w-full pl-11 pr-10 py-3 bg-brand-gray border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-brand-pink transition-colors"
            aria-label="Buscar canecas"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              aria-label="Limpar busca"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <CategoryFilter
            selected={selectedCategory}
            onSelect={handleCategorySelect}
          />

          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-brand-gray border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-brand-pink appearance-none cursor-pointer"
              aria-label="Ordenar por"
            >
              {SORT_OPTIONS.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                >
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ProductGrid products={filteredProducts} />
      </Container>
    </section>
  )
}
