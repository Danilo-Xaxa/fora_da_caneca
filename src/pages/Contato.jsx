import { useState } from "react"
import {
  MessageCircle,
  Instagram,
  MapPin,
  Phone,
  Send,
  Clock,
} from "lucide-react"
import Container from "../components/ui/Container"
import SectionTitle from "../components/ui/SectionTitle"
import Button from "../components/ui/Button"
import WhatsAppIcon from "../components/ui/WhatsAppIcon"
import { SITE_CONFIG } from "../constants/siteConfig"
import { openWhatsAppGeneral, openWhatsAppContact } from "../utils/whatsapp"
import SEO from "../components/ui/SEO"

const CONTACT_METHODS = [
  {
    emoji: "💬",
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Nosso principal canal. Resposta rápida!",
    value: SITE_CONFIG.whatsapp.display,
    action: openWhatsAppGeneral,
    actionLabel: "Chamar no WhatsApp",
    accent: "accent-green",
    color: "from-green-400 to-green-600",
  },
  {
    emoji: "📸",
    icon: Instagram,
    title: "Instagram",
    description: "Siga pra ver novidades e lançamentos",
    value: SITE_CONFIG.instagram.handle,
    href: SITE_CONFIG.instagram.url,
    actionLabel: "Seguir no Instagram",
    accent: "accent-pink",
    color: "from-purple-500 to-pink-500",
  },
  {
    emoji: "📍",
    icon: MapPin,
    title: "Localização",
    description: "Feito com carinho no Nordeste",
    value: SITE_CONFIG.location,
    actionLabel: null,
    accent: "accent-orange",
    color: "from-brand-pink to-brand-orange",
  },
  {
    emoji: "🕐",
    icon: Clock,
    title: "Horário",
    description: "Segunda a Sábado",
    value: "9h às 18h",
    actionLabel: null,
    accent: "accent-brown",
    color: "from-blue-400 to-cyan-500",
  },
]

const INITIAL_FORM = { name: "", email: "", message: "" }

export default function Contato() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    openWhatsAppContact(form.name, form.email, form.message)
    setSubmitted(true)
    setForm(INITIAL_FORM)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section className="py-12 md:py-20 relative">
      <SEO
        title="Contato"
        description="Entre em contato com a Fora da Caneca pelo WhatsApp ou Instagram. Atendimento rápido e personalizado."
        path="/contato"
      />

      {/* Floating emojis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <span className="absolute top-[10%] right-[8%] text-2xl animate-float opacity-30">💬</span>
        <span className="absolute bottom-[15%] left-[5%] text-3xl animate-float-reverse opacity-25">☕</span>
      </div>

      <Container className="relative z-10">
        <SectionTitle
          emoji="📩"
          title="Fale Conosco"
          subtitle="Estamos sempre prontos pra te atender"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact methods */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-800">Nossos canais</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CONTACT_METHODS.map((method, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-2xl bg-white border border-gray-100 ${method.accent} card-hover`}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl shrink-0">{method.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800">{method.title}</h4>
                      <p className="text-gray-400 text-sm mt-0.5">
                        {method.description}
                      </p>
                      <p className="text-gray-700 font-medium text-sm mt-2">
                        {method.value}
                      </p>
                      {method.action && (
                        <button
                          onClick={method.action}
                          className="mt-3 text-sm text-brand-pink hover:text-brand-orange transition-colors font-medium cursor-pointer"
                        >
                          {method.actionLabel} &rarr;
                        </button>
                      )}
                      {method.href && (
                        <a
                          href={method.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 block text-sm text-brand-pink hover:text-brand-orange transition-colors font-medium"
                        >
                          {method.actionLabel} &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-lg shadow-brand-pink/5">
            <h3 className="text-xl font-bold mb-2 text-gray-800">Envie uma mensagem</h3>
            <p className="text-gray-500 text-sm mb-6">
              Preencha o formulário e entraremos em contato em breve.
            </p>

            {submitted ? (
              <div className="text-center py-12 animate-fade-in-up">
                <span className="text-6xl block mb-4">🎉</span>
                <h4 className="text-xl font-bold text-green-600 mb-2">
                  Mensagem enviada!
                </h4>
                <p className="text-gray-500">
                  Obrigado pelo contato! Responderemos em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Nome
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    className="w-full px-4 py-3 bg-brand-gray border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-brand-pink transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 bg-brand-gray border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-brand-pink transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Como podemos ajudar?"
                    className="w-full px-4 py-3 bg-brand-gray border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-brand-pink transition-colors resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Send size={18} />
                  Enviar Mensagem
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Map section CTA */}
        <div className="mt-16 text-center">
          <span className="text-2xl block mb-2 animate-bounce-gentle">⚡</span>
          <p className="text-gray-400 text-sm">
            Prefere falar diretamente? Chame no WhatsApp que respondemos
            rapidinho!
          </p>
          <Button
            variant="whatsapp"
            size="md"
            className="mt-4"
            onClick={openWhatsAppGeneral}
          >
            <WhatsAppIcon size={18} />
            {SITE_CONFIG.whatsapp.display}
          </Button>
        </div>
      </Container>
    </section>
  )
}
