import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { ShoppingCart, Menu, X, Instagram } from "lucide-react"
import { useCartStore } from "../../stores/cartStore"
import { SITE_CONFIG } from "../../constants/siteConfig"
import Container from "../ui/Container"
import PrefetchLink from "../ui/PrefetchLink"

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/sobre", label: "Sobre Nós" },
  { to: "/contato", label: "Contato" },
]

const ANNOUNCEMENTS = [
  "☕ Frete para todo o Brasil",
  "🎨 Canecas personalizadas com sua frase",
  "💝 Presente perfeito pra quem você ama",
  "📦 Embalagem anti-quebra com carinho",
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { items, openCart } = useCartStore()
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-brand-pink via-brand-orange to-brand-pink text-white text-xs font-medium overflow-hidden h-8 flex items-center">
        <div className="animate-marquee whitespace-nowrap flex gap-12">
          {ANNOUNCEMENTS.map((msg, i) => (
            <span key={i} className="inline-block px-4">{msg}</span>
          ))}
          {ANNOUNCEMENTS.map((msg, i) => (
            <span key={`dup-${i}`} className="inline-block px-4">{msg}</span>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md shadow-brand-pink/5"
            : "bg-white/90 backdrop-blur-md"
        } border-b border-gray-200`}
      >
        <Container>
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-2xl animate-wiggle">☕</span>
              <div className="flex flex-col leading-none">
                <span className="text-2xl md:text-3xl font-display text-gradient font-bold">
                  {SITE_CONFIG.name}
                </span>
                <span className="text-[10px] md:text-xs text-gray-400 tracking-widest uppercase">
                  {SITE_CONFIG.slogan}
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <PrefetchLink
                  key={link.to}
                  to={link.to}
                  className={`nav-pill text-sm font-medium transition-colors hover:text-brand-pink ${
                    location.pathname === link.to
                      ? "text-brand-pink active"
                      : "text-gray-500"
                  }`}
                >
                  {link.label}
                </PrefetchLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <a
                href={SITE_CONFIG.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 items-center justify-center text-white hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>

              <button
                onClick={openCart}
                className="relative p-2 text-gray-400 hover:text-brand-pink transition-colors cursor-pointer"
                aria-label="Carrinho"
              >
                <ShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center bg-gradient-to-r from-brand-pink to-brand-orange text-white text-xs font-bold rounded-full animate-bounce-gentle">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                aria-label="Menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 animate-fade-in-up">
          <nav className="flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-6 py-3 text-base font-medium transition-colors ${
                  location.pathname === link.to
                    ? "text-brand-pink bg-brand-pink-light/50"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={SITE_CONFIG.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-base font-medium text-gray-500 hover:text-brand-pink flex items-center gap-2"
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
