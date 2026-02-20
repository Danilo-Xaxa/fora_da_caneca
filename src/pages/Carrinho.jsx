import { Link } from "react-router-dom"
import {
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  MessageCircle,
} from "lucide-react"
import Container from "../components/ui/Container"
import Button from "../components/ui/Button"
import { useCartStore } from "../stores/cartStore"
import { formatPrice } from "../utils/formatPrice"
import { openWhatsAppOrder } from "../utils/whatsapp"

export default function Carrinho() {
  const { items, updateQuantity, removeItem, clearCart, getTotal } =
    useCartStore()
  const total = getTotal()

  return (
    <section className="py-12 md:py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Seu Carrinho
          </h1>
          <p className="text-white/50 mb-8">
            {items.length === 0
              ? "Seu carrinho esta vazio"
              : `${items.length} ${items.length === 1 ? "item" : "itens"} no carrinho`}
          </p>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag
                size={80}
                className="text-white/20 mx-auto mb-6"
              />
              <h2 className="text-2xl font-bold mb-2">
                Nenhuma caneca por aqui...
              </h2>
              <p className="text-white/50 mb-8">
                Que tal dar uma olhada no nosso catalogo?
              </p>
              <Link to="/catalogo">
                <Button size="lg">
                  <ArrowLeft size={18} />
                  Ver Catalogo
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items list */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 md:p-6 bg-white/5 rounded-2xl border border-white/10"
                  >
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl bg-white/10 flex items-center justify-center text-5xl shrink-0">
                      ☕
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{item.name}</h3>
                          <p className="text-brand-pink font-semibold">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-white/40 hover:text-brand-red transition-colors cursor-pointer"
                          aria-label="Remover item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center bg-white/10 rounded-xl overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-2 hover:bg-white/10 transition-colors cursor-pointer"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-3 font-semibold min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-2 hover:bg-white/10 transition-colors cursor-pointer"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <p className="font-bold text-lg">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between items-center pt-4">
                  <Link
                    to="/catalogo"
                    className="flex items-center gap-2 text-white/60 hover:text-brand-pink transition-colors"
                  >
                    <ArrowLeft size={18} />
                    Continuar comprando
                  </Link>
                  <button
                    onClick={clearCart}
                    className="text-sm text-white/40 hover:text-brand-red transition-colors cursor-pointer"
                  >
                    Limpar carrinho
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 sticky top-24">
                  <h3 className="font-bold text-lg mb-4">Resumo do Pedido</h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-white/60">
                      <span>Subtotal</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Frete</span>
                      <span className="text-brand-pink text-sm">
                        A combinar via WhatsApp
                      </span>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Total</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-brand-pink to-brand-orange bg-clip-text text-transparent">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="whatsapp"
                    size="lg"
                    className="w-full"
                    onClick={() =>
                      openWhatsAppOrder(items, formatPrice(total))
                    }
                  >
                    <MessageCircle size={20} />
                    Finalizar pelo WhatsApp
                  </Button>

                  <p className="text-white/30 text-xs text-center mt-4">
                    Voce sera redirecionado para o WhatsApp com seu pedido
                    formatado automaticamente
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
