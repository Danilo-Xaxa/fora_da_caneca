import { useEffect, useRef, useState } from "react"
import { Check, X } from "lucide-react"
import { useCartStore } from "../../stores/cartStore"

export default function CartToast() {
  const [toast, setToast] = useState(null)
  const { openCart } = useCartStore()
  const timerRef = useRef(null)

  useEffect(() => {
    const handleToast = (e) => {
      if (timerRef.current) clearTimeout(timerRef.current)
      setToast(e.detail)
      timerRef.current = setTimeout(() => setToast(null), 3000)
    }

    window.addEventListener("cart-toast", handleToast)
    return () => {
      window.removeEventListener("cart-toast", handleToast)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  if (!toast) return null

  return (
    <div className="fixed bottom-24 right-4 z-50 animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-lg shadow-brand-pink/10 border border-gray-100 p-4 pr-10 max-w-sm">
        <button
          onClick={() => setToast(null)}
          className="absolute top-2 right-2 p-1 text-gray-300 hover:text-gray-500 transition-colors cursor-pointer"
          aria-label="Fechar notificação"
        >
          <X size={14} />
        </button>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <Check size={16} className="text-green-600" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800">
              Adicionado ao carrinho!
            </p>
            <p className="text-xs text-gray-500 truncate mt-0.5">
              {toast.quantity}x {toast.name}
            </p>
            <button
              onClick={() => {
                setToast(null)
                openCart()
              }}
              className="text-xs text-brand-pink font-semibold mt-1.5 hover:text-brand-orange transition-colors cursor-pointer"
            >
              Ver carrinho &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
