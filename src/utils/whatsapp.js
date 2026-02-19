import { SITE_CONFIG, WHATSAPP_MESSAGES } from "../constants/siteConfig"

export function openWhatsAppOrder(items, total) {
  const message = WHATSAPP_MESSAGES.order(items, total)
  window.open(`${SITE_CONFIG.whatsapp.baseUrl}?text=${message}`, "_blank")
}

export function openWhatsAppProduct(productName) {
  const message = WHATSAPP_MESSAGES.product(productName)
  window.open(`${SITE_CONFIG.whatsapp.baseUrl}?text=${message}`, "_blank")
}

export function openWhatsAppGeneral() {
  window.open(
    `${SITE_CONFIG.whatsapp.baseUrl}?text=${WHATSAPP_MESSAGES.general}`,
    "_blank"
  )
}
