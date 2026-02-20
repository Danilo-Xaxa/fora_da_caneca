import { Heart, Coffee, Sparkles, Users, Star, Palette } from "lucide-react"
import Container from "../components/ui/Container"
import SectionTitle from "../components/ui/SectionTitle"
import Button from "../components/ui/Button"
import WhatsAppIcon from "../components/ui/WhatsAppIcon"
import { openWhatsAppGeneral } from "../utils/whatsapp"
import { SITE_CONFIG } from "../constants/siteConfig"
import SEO from "../components/ui/SEO"

const VALUES = [
  {
    icon: Sparkles,
    title: "Criatividade",
    description:
      "Cada caneca é uma obra única, com frases e designs que voce não encontra em lugar nenhum.",
  },
  {
    icon: Heart,
    title: "Carinho",
    description:
      "Fazemos cada peça com atenção e dedicação, porque sabemos que sua caneca vai carregar momentos especiais.",
  },
  {
    icon: Coffee,
    title: "Paixao por Café",
    description:
      "Café é a nossa inspiração. Acreditamos que cada xícara merece uma caneca a altura.",
  },
  {
    icon: Star,
    title: "Qualidade",
    description:
      "Usamos materiais de primeira qualidade para garantir que sua caneca dure por muito tempo.",
  },
  {
    icon: Palette,
    title: "Personalizacao",
    description:
      "Você imagina, a gente cria. Canecas personalizadas do seu jeito, com sua frase e estilo.",
  },
  {
    icon: Users,
    title: "Proximidade",
    description:
      "Atendimento direto pelo WhatsApp, sem robôs. Somos gente de verdade que ama o que faz.",
  },
]

export default function SobreNos() {
  return (
    <>
      <SEO
        title="Sobre Nos"
        description="Conheca a Fora da Caneca. De Bananeiras/PB, transformamos momentos simples em sorrisos com canecas criativas e personalizadas."
        path="/sobre"
      />

      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800">
              Sobre a{" "}
              <span className="font-display text-5xl md:text-7xl bg-gradient-to-r from-brand-pink to-brand-orange bg-clip-text text-transparent">
                {SITE_CONFIG.name}
              </span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed">
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
      <section className="py-20 bg-brand-gray">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-brand-pink font-medium uppercase tracking-wide text-sm">
                Nossa História
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-gray-800">
                De uma idéia simples a canecas pra todo Brasil
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Tudo começou com uma caneca personalizada pra um amigo. A
                  reação foi tão boa que pensamos: &ldquo;por que nao levar essa
                  alegria pra mais gente?&rdquo;
                </p>
                <p>
                  Desde então, já criamos centenas de canecas com frases que vão
                  do humor ao romantico, da música ao cafe. Cada peça é feita com
                  carinho, pensando em quem vai receber.
                </p>
                <p>
                  O nome <strong className="text-gray-800">Fora da Caneca</strong>{" "}
                  nasceu da ideia de ir além do comum - porquê nossas canecas não
                  são apenas recipientes, são expressões de personalidade.
                </p>
              </div>
            </div>

            {/* Visual placeholder */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-brand-pink/10 to-brand-orange/10 border border-gray-200 flex items-center justify-center">
                <span className="text-9xl">☕</span>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-brand-pink to-brand-orange rounded-2xl -z-10 opacity-20" />
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20">
        <Container>
          <SectionTitle
            title="Nossos Valores"
            subtitle="O que nos move e faz cada caneca ser especial"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((value, i) => {
              const Icon = value.icon
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-brand-gray border border-gray-200 hover:border-brand-pink/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-pink to-brand-orange flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">{value.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Numbers */}
      <section className="py-20 bg-brand-gray">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Canecas vendidas" },
              { number: "26", label: "Estados atendidos" },
              { number: "50+", label: "Frases diferentes" },
              { number: "4.9", label: "Estrelas de avaliacao" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand-pink to-brand-orange bg-clip-text text-transparent">
                  {stat.number}
                </p>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
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
