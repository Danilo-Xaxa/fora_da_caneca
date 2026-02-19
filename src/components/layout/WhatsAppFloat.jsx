import { MessageCircle } from "lucide-react"
import { openWhatsAppGeneral } from "../../utils/whatsapp"

export default function WhatsAppFloat() {
  return (
    <button
      onClick={openWhatsAppGeneral}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <MessageCircle size={28} fill="white" />
    </button>
  )
}
