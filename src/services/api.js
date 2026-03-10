const API_BASE = "/api"

async function fetchJSON(url, options = {}) {
  const res = await fetch(url, options)
  if (!res.ok) throw new Error(`Erro ${res.status}`)
  return res.json()
}

function buildURL(path, params = {}) {
  const url = new URL(`${API_BASE}/${path}/`, window.location.origin)
  Object.entries(params).forEach(([key, value]) => {
    if (value != null && value !== "") url.searchParams.set(key, value)
  })
  return url
}

export async function fetchProducts(params = {}, options = {}) {
  const data = await fetchJSON(buildURL("products", params), options)
  return data.results
}

export async function fetchAllProducts(params = {}, options = {}) {
  const results = []
  let url = buildURL("products", params).toString()

  while (url) {
    const data = await fetchJSON(url, options)
    results.push(...data.results)
    url = data.next
  }

  return results
}

export async function fetchProductBySlug(slug, options = {}) {
  return fetchJSON(`${API_BASE}/products/${slug}/`, options)
}

export async function fetchCategories(options = {}) {
  const data = await fetchJSON(buildURL("categories"), options)
  return data.results
}
