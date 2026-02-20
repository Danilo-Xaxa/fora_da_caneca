export const SITE_CONFIG = {
  name: "Fora da Caneca",
  slogan: "Produtos personalizados do seu jeito",
  description: "Canecas personalizadas com frases criativas, humor e muito estilo. Envio para todo Brasil.",
  whatsapp: {
    number: "5581993367273",
    display: "(81) 99336-7273",
    baseUrl: "https://wa.me/5581993367273",
  },
  instagram: {
    url: "https://www.instagram.com/foradacaneca/",
    handle: "@foradacaneca",
  },
  location: "Bananeiras (PB)",
}

export const WHATSAPP_MESSAGES = {
  order: (items, total) => {
    const itemList = items
      .map((item) => `- ${item.name} (x${item.quantity})`)
      .join("\n")
    return encodeURIComponent(
      `Olá! Vim pelo site Fora da Caneca e gostaria de fazer um pedido:\n\n${itemList}\n\nTotal: R$ ${total}\n\nAguardo retorno!`
    )
  },
  product: (productName) =>
    encodeURIComponent(
      `Olá! Vim pelo site Fora da Caneca e tenho interesse na caneca "${productName}". Pode me passar mais detalhes?`
    ),
  general: encodeURIComponent(
    "Olá! Vim pelo site Fora da Caneca e gostaria de mais informações."
  ),
}
