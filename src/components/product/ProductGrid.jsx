import ProductCard from "./ProductCard"

export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-6xl mb-4">😕</p>
        <p className="text-white/60 text-lg">
          Nenhuma caneca encontrada nessa categoria.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}