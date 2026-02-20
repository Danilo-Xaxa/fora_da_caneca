import { useState, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { SlidersHorizontal } from "lucide-react"
import Container from "../components/ui/Container"
import SectionTitle from "../components/ui/SectionTitle"
import ProductGrid from "../components/product/ProductGrid"
import CategoryFilter from "../components/product/CategoryFilter"
import { PRODUCTS } from "../constants/products"

const SORT_OPTIONS = [
  { value: "featured", label: "Destaques" },
  { value: "price-asc", label: "Menor preco" },
  { value: "price-desc", label: "Maior preco" },
  { value: "name", label: "A - Z" },
]

export default function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get("categoria")
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState("featured")

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
  }, [selectedCategory, sortBy])

  return (
    <section className="py-12 md:py-20">
      <Container>
        <SectionTitle
          title="Catalogo"
          subtitle={`${filteredProducts.length} caneca${filteredProducts.length !== 1 ? "s" : ""} encontrada${filteredProducts.length !== 1 ? "s" : ""}`}
        />

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
