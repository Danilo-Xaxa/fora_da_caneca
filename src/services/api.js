const API_BASE = "/api"

async function fetchJSON(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Erro ${res.status}`)
  return res.json()
}

export async function fetchProducts(params = {}) {
  const url = new URL(`${API_BASE}/products/`, window.location.origin)
  Object.entries(params).forEach(([key, value]) => {
    if (value != null && value !== "") {
      url.searchParams.set(key, value)
    }
  })
  const data = await fetchJSON(url)
  return data.results
}

export async function fetchProductBySlug(slug) {
  return fetchJSON(`${API_BASE}/products/${slug}/`)
}

export async function fetchCategories() {
  const data = await fetchJSON(`${API_BASE}/categories/`)
  return data.results
}
