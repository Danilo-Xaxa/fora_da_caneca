import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  ArrowRight,
  Package,
  Palette,
  Truck,
  Instagram,
  Star,
  Heart,
  Sparkles,
} from "lucide-react"
import Container from "../components/ui/Container"
import SectionTitle from "../components/ui/SectionTitle"
import Button from "../components/ui/Button"
import WhatsAppIcon from "../components/ui/WhatsAppIcon"
import ProductCard from "../components/product/ProductCard"
import { SITE_CONFIG } from "../constants/siteConfig"
import { openWhatsAppGeneral } from "../utils/whatsapp"
import { fetchProducts, fetchCategories } from "../services/api"
import SEO from "../components/ui/SEO"

const STEPS = [
  {
    icon: Package,
    emoji: "🛒",
    title: "Escolha",
    description: "Navegue pelo catálogo e escolha a caneca perfeita",
  },
  {
    icon: Palette,
    emoji: "🎨",
    title: "Personalize",
    description: "Quer algo único? Crie com sua frase e estilo",
  },
  {
    icon: Truck,
    emoji: "📦",
    title: "Receba",
    description: "Enviamos para todo o Brasil com carinho",
  },
]

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null)
    Promise.all([
      fetchProducts({ featured: "true" }),
      fetchCategories(),
    ])
      .then(([productsData, categoriesData]) => {
        setFeatured(productsData)
        setCategories(categoriesData)
      })
      .catch((err) => setError(err.message))
  }, [])

  return (
    <>
      <SEO
        title="Canecas Personalizadas"
        description="Canecas personalizadas com frases criativas, humor e muito estilo. De Bananeiras (PB) para todo o Brasil. Escolha a sua ou crie do seu jeito!"
        path="/"
      />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gray via-white to-brand-gray" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-pink/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-orange/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-brand-brown/5 rounded-full blur-3xl" />

        {/* Floating Emojis */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <span className="absolute top-[15%] left-[8%] text-4xl animate-float opacity-60">☕</span>
          <span className="absolute top-[25%] right-[10%] text-3xl animate-float-reverse opacity-50">🎨</span>
          <span className="absolute bottom-[30%] left-[12%] text-3xl animate-float opacity-40">💕</span>
          <span className="absolute bottom-[20%] right-[15%] text-4xl animate-float-reverse opacity-50">😂</span>
          <span className="absolute top-[50%] right-[5%] text-2xl animate-bounce-gentle opacity-40">🎵</span>
          <span className="absolute top-[10%] left-[45%] text-2xl animate-float opacity-30">✨</span>
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm text-gray-600 mb-8 border border-brand-pink/20 shadow-sm">
                <Sparkles size={16} className="text-brand-orange" />
                De Bananeiras (PB) para todo o Brasil
              </span>
            </div>

            <h1 className="animate-fade-in-up delay-100 text-5xl sm:text-6xl md:text-7xl font-black leading-[1.1] mb-6 text-gray-800">
              Sua caneca, <br />
              <span className="text-gradient font-display text-6xl sm:text-7xl md:text-8xl">
                do seu jeito
              </span>
              <span className="inline-block text-3xl animate-wiggle ml-2">✨</span>
            </h1>

            <p className="animate-fade-in-up delay-200 text-lg md:text-xl text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
              Canecas personalizadas com frases engraçadas, românticas e
              criativas. O presente perfeito pra quem você ama, ou pra você
              mesmo!
            </p>

            <div className="animate-fade-in-up delay-300 flex flex-wrap justify-center gap-4">
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

            {/* Trust Badges */}
            <div className="animate-fade-in-up delay-500 flex flex-wrap justify-center gap-6 mt-12 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <Star size={14} className="text-brand-orange" /> 4.9 estrelas
              </span>
              <span className="flex items-center gap-1.5">
                <Truck size={14} className="text-green-500" /> Frete todo Brasil
              </span>
              <span className="flex items-center gap-1.5">
                <Heart size={14} className="text-brand-pink" /> Feito com amor
              </span>
            </div>
          </div>
        </Container>
      </section>

      {error && (
        <div className="text-center py-12">
          <Container>
            <p className="text-red-500 mb-2">Não foi possível carregar os dados.</p>
            <button
              onClick={() => window.location.reload()}
              className="text-brand-pink underline cursor-pointer"
            >
              Tentar novamente
            </button>
          </Container>
        </div>
      )}

      {/* Categories */}
      <section className="py-20 relative">
        <div className="absolute inset-0 dots-pattern" />
        <Container className="relative z-10">
          <SectionTitle
            emoji="🎯"
            title="Categorias"
            subtitle="Encontre a caneca perfeita pra cada ocasião"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/catalogo?categoria=${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl p-6 bg-white border border-gray-100 hover:border-brand-pink/30 transition-all duration-300 text-center card-hover"
              >
                <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">
                  {cat.emoji}
                </span>
                <h3 className="font-semibold text-sm text-gray-800 group-hover:text-brand-pink transition-colors">
                  {cat.name}
                </h3>
                <p className="text-gray-400 text-xs mt-1 leading-snug">
                  {cat.description}
                </p>
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity`}
                />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-brand-gray">
        <Container>
          <SectionTitle
            emoji="🔥"
            title="Destaques"
            subtitle="As canecas mais queridas pelos nossos clientes"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((product) => (
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
      <section className="py-16 bg-white wave-top wave-bottom relative z-10">
        <Container>
          <SectionTitle
            emoji="💡"
            title="Como Funciona"
            subtitle="Simples assim, em 3 passos"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {STEPS.map((step, i) => (
              <div key={i} className="relative text-center p-6 rounded-2xl bg-brand-gray border border-gray-100 group hover:border-brand-pink/20 transition-all">
                {/* Step number badge */}
                <span className="absolute -top-3 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-brand-pink to-brand-orange text-white text-sm font-bold flex items-center justify-center shadow-md">
                  {i + 1}
                </span>

                <span className="text-4xl block mb-3 group-hover:animate-bounce-gentle">
                  {step.emoji}
                </span>
                <h3 className="text-lg font-bold mb-2 text-gray-800">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>

                {/* Arrow connector */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 text-brand-pink/40">
                    <ArrowRight size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-pink to-brand-orange opacity-5" />
        <Container className="relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-4xl block mb-4 animate-bounce-gentle">☕</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Quer uma caneca{" "}
              <span className="text-gradient">
                do seu jeito?
              </span>
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              Fale com a gente pelo WhatsApp! Criamos canecas personalizadas com
              a frase, tema ou foto que você quiser.
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
