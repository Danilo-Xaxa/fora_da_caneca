import { Link } from "react-router-dom"
import { Instagram, Phone, MapPin, Coffee } from "lucide-react"
import { SITE_CONFIG } from "../../constants/siteConfig"
import Container from "../ui/Container"

export default function Footer() {
  return (
    <footer className="bg-brand-darker border-t border-white/10 pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display bg-gradient-to-r from-brand-pink to-brand-orange bg-clip-text text-transparent mb-4">
              {SITE_CONFIG.name}
            </h3>
            <p className="text-white/60 mb-4">{SITE_CONFIG.slogan}</p>
            <div className="flex items-center gap-2 text-white/40">
              <Coffee size={16} />
              <span className="text-sm">Feito com cafe e carinho em {SITE_CONFIG.location}</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white/90">Navegacao</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-white/60 hover:text-brand-pink transition-colors">
                Home
              </Link>
              <Link to="/catalogo" className="text-white/60 hover:text-brand-pink transition-colors">
                Catalogo
              </Link>
              <Link to="/sobre" className="text-white/60 hover:text-brand-pink transition-colors">
                Sobre Nos
              </Link>
              <Link to="/contato" className="text-white/60 hover:text-brand-pink transition-colors">
                Contato
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white/90">Contato</h4>
            <div className="flex flex-col gap-3">
              <a
                href={`${SITE_CONFIG.whatsapp.baseUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-green-400 transition-colors"
              >
                <Phone size={16} />
                {SITE_CONFIG.whatsapp.display}
              </a>
              <a
                href={SITE_CONFIG.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-brand-pink transition-colors"
              >
                <Instagram size={16} />
                {SITE_CONFIG.instagram.handle}
              </a>
              <div className="flex items-center gap-2 text-white/60">
                <MapPin size={16} />
                {SITE_CONFIG.location} - Envio para todo Brasil
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Todos os
            direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  )
}
