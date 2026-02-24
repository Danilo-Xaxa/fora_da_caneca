import Container from "../components/ui/Container"
import SectionTitle from "../components/ui/SectionTitle"
import Button from "../components/ui/Button"
import WhatsAppIcon from "../components/ui/WhatsAppIcon"
import { openWhatsAppGeneral } from "../utils/whatsapp"
import { SITE_CONFIG } from "../constants/siteConfig"
import SEO from "../components/ui/SEO"

const VALUES = [
  {
    emoji: "✨",
    title: "Criatividade",
    description:
      "Cada caneca é uma obra única, com frases e designs que você não encontra em lugar nenhum.",
    accent: "accent-pink",
  },
  {
    emoji: "💕",
    title: "Carinho",
    description:
      "Fazemos cada peça com atenção e dedicação, porque sabemos que sua caneca vai carregar momentos especiais.",
    accent: "accent-red",
  },
  {
    emoji: "☕",
    title: "Paixão por Café",
    description:
      "Café é a nossa inspiração. Acreditamos que cada xícara merece uma caneca a altura.",
    accent: "accent-brown",
  },
  {
    emoji: "⭐",
    title: "Qualidade",
    description:
      "Usamos materiais de primeira qualidade para garantir que sua caneca dure por muito tempo.",
    accent: "accent-orange",
  },
  {
    emoji: "🎨",
    title: "Personalização",
    description:
      "Você imagina, a gente cria. Canecas personalizadas do seu jeito, com sua frase e estilo.",
    accent: "accent-pink",
  },
  {
    emoji: "🤝",
    title: "Proximidade",
    description:
      "Atendimento direto pelo WhatsApp, sem robôs. Somos gente de verdade que ama o que faz.",
    accent: "accent-green",
  },
]

const STATS = [
  { emoji: "☕", number: "500+", label: "Canecas vendidas" },
  { emoji: "🇧🇷", number: "26", label: "Estados atendidos" },
  { emoji: "💬", number: "50+", label: "Frases diferentes" },
  { emoji: "⭐", number: "4.9", label: "Estrelas de avaliação" },
]

export default function SobreNos() {
  return (
    <>
      <SEO
        title="Sobre Nós"
        description="Conheça a Fora da Caneca. De Bananeiras (PB), transformamos momentos simples em sorrisos com canecas criativas e personalizadas."
        path="/sobre"
      />

      {/* Hero */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        {/* Floating emojis */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <span className="absolute top-[8%] left-[5%] text-3xl animate-float opacity-25">☕</span>
          <span className="absolute top-[15%] right-[10%] text-2xl animate-float-reverse opacity-20 delay-300">🎨</span>
          <span className="absolute bottom-[20%] left-[8%] text-2xl animate-float opacity-20 delay-500">💕</span>
          <span className="absolute bottom-[10%] right-[5%] text-3xl animate-float-reverse opacity-25 delay-200">✨</span>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800 animate-fade-in-up">
              Sobre a{" "}
              <span className="font-display text-5xl md:text-7xl text-gradient">
                {SITE_CONFIG.name}
              </span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed animate-fade-in-up delay-200">
              Nascemos em Bananeiras com uma missão simples:{" "}
              <strong className="text-gray-800">
                transformar momentos simples em sorrisos
              </strong>
              . Através de canecas com frases criativas, engraçadas e cheias de
              personalidade, levamos alegria pra mesa de café de pessoas por todo
              o Brasil.
            </p>
          </div>
        </Container>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20 bg-brand-gray relative">
        <Container>
          <SectionTitle
            emoji="📖"
            title="Nossa História"
            subtitle="Como tudo começou"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Visual placeholder */}
            <div className="relative order-2 md:order-1">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-brand-pink/10 to-brand-orange/10 border border-gray-200 flex items-center justify-center relative overflow-hidden">
                <span className="text-9xl">☕</span>
                {/* Decorative emojis */}
                <span className="absolute top-4 right-6 text-2xl animate-float opacity-40">💕</span>
                <span className="absolute bottom-6 left-4 text-xl animate-float-reverse opacity-40 delay-300">✨</span>
                <span className="absolute top-8 left-8 text-lg animate-float opacity-30 delay-500">🎨</span>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-brand-pink to-brand-orange rounded-2xl -z-10 opacity-20" />
            </div>

            <div className="order-1 md:order-2">
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Tudo começou com uma caneca personalizada pra um amigo. A
                  reação foi tão boa que pensamos: &ldquo;por que não levar essa
                  alegria pra mais gente?&rdquo;
                </p>
                <p>
                  Desde então, já criamos centenas de canecas com frases que vão
                  do humor ao romântico, da música ao café. Cada peça é feita com
                  carinho, pensando em quem vai receber.
                </p>
                <p>
                  O nome <strong className="text-gray-800">Fora da Caneca</strong>{" "}
                  nasceu da ideia de ir além do comum - porque nossas canecas não
                  são apenas recipientes, são expressões de personalidade.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20">
        <Container>
          <SectionTitle
            emoji="💎"
            title="Nossos Valores"
            subtitle="O que nos move e faz cada caneca ser especial"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {VALUES.map((value, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl bg-white border border-gray-100 ${value.accent} card-hover`}
              >
                <span className="text-3xl block mb-3">{value.emoji}</span>
                <h3 className="font-bold text-lg mb-2 text-gray-800">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Numbers */}
      <section className="py-16 md:py-20 bg-brand-gray">
        <Container>
          <SectionTitle
            emoji="📊"
            title="Em Números"
            subtitle="Nosso impacto até aqui"
          />
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-brand-pink to-brand-orange rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {STATS.map((stat, i) => (
                <div key={i}>
                  <span className="text-2xl block mb-2">{stat.emoji}</span>
                  <p className="text-3xl md:text-4xl font-bold text-white">
                    {stat.number}
                  </p>
                  <p className="text-white/80 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-3xl block mb-3 animate-bounce-gentle">☕</span>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Bora tomar um café?</h2>
            <p className="text-gray-500 mb-8">
              Entre em contato e vamos criar a caneca perfeita pra você!
            </p>
            <Button
              variant="whatsapp"
              size="lg"
              onClick={openWhatsAppGeneral}
            >
              <WhatsAppIcon size={20} />
              Falar no WhatsApp
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
