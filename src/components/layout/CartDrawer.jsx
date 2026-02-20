import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react"
import { useCartStore } from "../../stores/cartStore"
import { formatPrice } from "../../utils/formatPrice"
import { openWhatsAppOrder } from "../../utils/whatsapp"
import Button from "../ui/Button"
import WhatsAppIcon from "../ui/WhatsAppIcon"

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotal } =
    useCartStore()
  const total = getTotal()

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white border-l border-gray-200 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
            <ShoppingBag size={22} />
            Carrinho
          </h2>
          <button
            onClick={closeCart}
            className="p-2 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            aria-label="Fechar carrinho"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-300">
              <ShoppingBag size={64} className="mb-4" />
              <p className="text-lg font-medium">Carrinho vazio</p>
              <p className="text-sm mt-1">Adicione canecas incriveis!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-brand-gray rounded-xl p-4"
                >
                  {/* Image placeholder */}
                  <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center text-3xl shrink-0">
                    ☕
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-brand-pink font-bold text-sm mt-1">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer text-gray-600"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium w-6 text-center text-gray-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer text-gray-600"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="self-start p-1 text-gray-300 hover:text-brand-red transition-colors cursor-pointer"
                    aria-label="Remover item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-200 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Total</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-brand-pink to-brand-orange bg-clip-text text-transparent">
                {formatPrice(total)}
              </span>
            </div>
            <Button
              variant="whatsapp"
              size="lg"
              className="w-full"
              onClick={() => openWhatsAppOrder(items, formatPrice(total))}
            >
              <WhatsAppIcon size={20} />
              Pedir pelo WhatsApp
            </Button>
          </div>
        )}
      </div>
    </>
  )
}