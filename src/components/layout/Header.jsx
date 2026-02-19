import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ShoppingCart, Menu, X, Instagram } from "lucide-react"
import { useCartStore } from "../../stores/cartStore"
import { SITE_CONFIG } from "../../constants/siteConfig"
import Container from "../ui/Container"

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/catalogo", label: "Catalogo" },
  { to: "/sobre", label: "Sobre Nos" },
  { to: "/contato", label: "Contato" },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { items, openCart } = useCartStore()
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-darker/90 backdrop-blur-md border-b border-white/10">
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl md:text-3xl font-display bg-gradient-to-r from-brand-pink to-brand-orange bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-brand-pink ${
                  location.pathname === link.to
                    ? "text-brand-pink"
                    : "text-white/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href={SITE_CONFIG.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex p-2 text-white/60 hover:text-brand-pink transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>

            <button
              onClick={openCart}
              className="relative p-2 text-white/60 hover:text-brand-pink transition-colors cursor-pointer"
              aria-label="Carrinho"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-brand-pink text-white text-xs font-bold rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white/60 hover:text-white transition-colors cursor-pointer"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-darker/95 backdrop-blur-md border-t border-white/10">
          <nav className="flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-6 py-3 text-base font-medium transition-colors ${
                  location.pathname === link.to
                    ? "text-brand-pink bg-white/5"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={SITE_CONFIG.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-base font-medium text-white/70 hover:text-brand-pink flex items-center gap-2"
            >
              <Instagram size={18} />
              {SITE_CONFIG.instagram.handle}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
