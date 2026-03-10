const API_BASE = "/api"

export async function fetchProducts(params = {}) {
  const url = new URL(`${API_BASE}/products/`, window.location.origin)
  Object.entries(params).forEach(([key, value]) => {
    if (value != null && value !== "") {
      url.searchParams.set(key, value)
    }
  })
  const res = await fetch(url)
  if (!res.ok) throw new Error("Erro ao carregar produtos")
  return res.json()
}

export async function fetchProductBySlug(slug) {
  const res = await fetch(`${API_BASE}/products/${slug}/`)
  if (!res.ok) throw new Error("Produto não encontrado")
  return res.json()
}

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories/`)
  if (!res.ok) throw new Error("Erro ao carregar categorias")
  return res.json()
}
