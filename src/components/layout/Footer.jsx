import { Instagram, Phone, MapPin, Coffee } from "lucide-react"
import { SITE_CONFIG } from "../../constants/siteConfig"
import Container from "../ui/Container"
import PrefetchLink from "../ui/PrefetchLink"

const FOOTER_LINKS = [
  { to: "/", label: "Home" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/sobre", label: "Sobre Nós" },
  { to: "/contato", label: "Contato" },
]

export default function Footer() {
  return (
    <footer className="relative bg-brand-gray pt-16 pb-8">
      {/* Wave Divider */}
      <div className="absolute -top-12 left-0 right-0 h-12 overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z" fill="#F7F5F3" fillOpacity="0.8" />
          <path d="M0,80 C300,110 600,40 900,80 C1050,100 1150,70 1200,80 L1200,120 L0,120 Z" fill="#F7F5F3" fillOpacity="0.5" />
        </svg>
      </div>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">☕</span>
              <h3 className="text-2xl font-display text-gradient font-bold">
                {SITE_CONFIG.name}
              </h3>
            </div>
            <p className="text-gray-500 mb-4">{SITE_CONFIG.slogan}</p>
            <div className="flex items-center gap-2 text-gray-400 mb-4">
              <Coffee size={16} />
              <span className="text-sm">Feito com café e carinho em {SITE_CONFIG.location}</span>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href={SITE_CONFIG.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Navegação</h4>
            <nav className="flex flex-col gap-2">
              {FOOTER_LINKS.map((link) => (
                <PrefetchLink
                  key={link.to}
                  to={link.to}
                  className="text-gray-500 hover:text-brand-pink transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-pink/40 group-hover:bg-brand-pink group-hover:scale-150 transition-all" />
                  {link.label}
                </PrefetchLink>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Contato</h4>
            <div className="flex flex-col gap-3">
              <a
                href={SITE_CONFIG.whatsapp.baseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors"
              >
                <Phone size={16} />
                {SITE_CONFIG.whatsapp.display}
              </a>
              <a
                href={SITE_CONFIG.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-500 hover:text-brand-pink transition-colors"
              >
                <Instagram size={16} />
                {SITE_CONFIG.instagram.handle}
              </a>
              <div className="flex items-center gap-2 text-gray-500">
                <MapPin size={16} />
                {SITE_CONFIG.location} - Envio para todo Brasil
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Todos os
            direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  )
}
