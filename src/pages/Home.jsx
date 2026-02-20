import { Link } from "react-router-dom"
import {
  ArrowRight,
  Package,
  Palette,
  Truck,
  Instagram,
} from "lucide-react"
import Container from "../components/ui/Container"
import SectionTitle from "../components/ui/SectionTitle"
import Button from "../components/ui/Button"
import WhatsAppIcon from "../components/ui/WhatsAppIcon"
import ProductCard from "../components/product/ProductCard"
import { CATEGORIES } from "../constants/categories"
import { PRODUCTS } from "../constants/products"
import { SITE_CONFIG } from "../constants/siteConfig"
import { openWhatsAppGeneral } from "../utils/whatsapp"
import SEO from "../components/ui/SEO"

const FEATURED = PRODUCTS.filter((p) => p.featured)

const STEPS = [
  {
    icon: Package,
    title: "Escolha",
    description: "Navegue pelo catálogo e escolha a caneca perfeita",
  },
  {
    icon: Palette,
    title: "Personalize",
    description: "Quer algo único? Crie com sua frase e estilo",
  },
  {
    icon: Truck,
    title: "Receba",
    description: "Enviamos para todo o Brasil com carinho",
  },
]

export default function Home() {
  return (
    <>
      <SEO
        title="Canecas Personalizadas"
        description="Canecas personalizadas com frases criativas, humor e muito estilo. De Bananeiras/PB para todo o Brasil. Escolha a sua ou crie do seu jeito!"
        path="/"
      />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gray via-white to-brand-gray" />
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-brand-pink/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-brand-pink/10 backdrop-blur-sm rounded-full text-sm text-gray-600 mb-6 border border-brand-pink/20">
              ☕ Canecas que falam por voce
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-6 text-gray-800">
              Sua caneca,{" "}
              <span className="bg-gradient-to-r from-brand-pink to-brand-orange bg-clip-text text-transparent">
                do seu jeito
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 mb-8 max-w-xl">
              Canecas personalizadas com frases engracadas, romanticas e
              criativas. O presente perfeito pra quem voce ama (ou pra voce
              mesmo!).
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/catalogo">
                <Button size="lg">
                  Ver Catálogo
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Button variant="whatsapp" size="lg" onClick={openWhatsAppGeneral}>
                <WhatsAppIcon size={20} />
                Falar no WhatsApp
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="py-20">
        <Container>
          <SectionTitle
            title="Categorias"
            subtitle="Encontre a caneca perfeita pra cada ocasiao"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.id}
                  to={`/catalogo?categoria=${cat.id}`}
                  className="group relative overflow-hidden rounded-2xl p-6 bg-brand-gray border border-gray-200 hover:border-brand-pink/30 transition-all duration-300 hover:-translate-y-1 text-center"
                >
                  <div
                    className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-sm text-gray-800">{cat.name}</h3>
                  <p className="text-gray-400 text-xs mt-1">
                    {cat.description}
                  </p>
                </Link>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-brand-gray">
        <Container>
          <SectionTitle
            title="Destaques"
            subtitle="As canecas mais queridas pelos nossos clientes"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {FEATURED.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/catalogo">
              <Button variant="outline" size="lg">
                Ver todo o catálogo
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-20">
        <Container>
          <SectionTitle
            title="Como Funciona"
            subtitle="Simples assim, em 3 passos"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="text-center relative">
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-brand-pink/50 to-transparent" />
                  )}
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand-pink to-brand-orange flex items-center justify-center">
                    <Icon size={36} className="text-white" />
                  </div>
                  <span className="text-brand-pink font-bold text-sm">
                    Passo {i + 1}
                  </span>
                  <h3 className="text-xl font-bold mt-1 mb-2 text-gray-800">{step.title}</h3>
                  <p className="text-gray-500 text-sm">{step.description}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-pink to-brand-orange opacity-5" />
        <Container className="relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Quer uma caneca{" "}
              <span className="bg-gradient-to-r from-brand-pink to-brand-orange bg-clip-text text-transparent">
                do seu jeito?
              </span>
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              Fale com a gente pelo WhatsApp! Criamos canecas personalizadas com
              a frase, tema ou foto que voce quiser.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="whatsapp"
                size="lg"
                onClick={openWhatsAppGeneral}
              >
                <WhatsAppIcon size={22} />
                Chamar no WhatsApp
              </Button>
              <a
                href={SITE_CONFIG.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg">
                  <Instagram size={22} />
                  Seguir no Instagram
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
