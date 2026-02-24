export function formatPrice(value) {
  const num = typeof value === "number" ? value : Number(value)
  if (Number.isNaN(num)) return "R$ 0,00"
  return num.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}
