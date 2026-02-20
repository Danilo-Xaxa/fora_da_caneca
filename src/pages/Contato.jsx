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
import { openWhatsAppGeneral } from "../utils/whatsapp"
import SEO from "../components/ui/SEO"

const CONTACT_METHODS = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Nosso principal canal. Resposta rapida!",
    value: SITE_CONFIG.whatsapp.display,
    action: openWhatsAppGeneral,
    actionLabel: "Chamar no WhatsApp",
    color: "from-green-400 to-green-600",
  },
  {
    icon: Instagram,
    title: "Instagram",
    description: "Siga pra ver novidades e lancamentos",
    value: SITE_CONFIG.instagram.handle,
    href: SITE_CONFIG.instagram.url,
    actionLabel: "Seguir no Instagram",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: MapPin,
    title: "Localizacao",
    description: "Feito com carinho no Nordeste",
    value: SITE_CONFIG.location,
    actionLabel: null,
    color: "from-brand-pink to-brand-orange",
  },
  {
    icon: Clock,
    title: "Horario",
    description: "Segunda a Sabado",
    value: "9h as 18h",
    actionLabel: null,
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
    // TODO: integrate with Supabase or email service
    setSubmitted(true)
    setForm(INITIAL_FORM)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section className="py-12 md:py-20">
      <SEO
        title="Contato"
        description="Entre em contato com a Fora da Caneca pelo WhatsApp ou Instagram. Atendimento rapido e personalizado."
        path="/contato"
      />
      <Container>
        <SectionTitle
          title="Fale Conosco"
          subtitle="Estamos sempre prontos pra te atender"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact methods */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-800">Nossos canais</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CONTACT_METHODS.map((method, i) => {
                const Icon = method.icon
                return (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-brand-gray border border-gray-200 hover:border-brand-pink/30 transition-all"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-3`}
                    >
                      <Icon size={20} className="text-white" />
                    </div>
                    <h4 className="font-semibold mb-1 text-gray-800">{method.title}</h4>
                    <p className="text-gray-400 text-sm mb-2">
                      {method.description}
                    </p>
                    <p className="text-gray-700 font-medium text-sm">
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
                )
              })}
            </div>
          </div>

          {/* Contact form */}
          <div className="p-8 rounded-2xl bg-brand-gray border border-gray-200">
            <h3 className="text-xl font-bold mb-2 text-gray-800">Envie uma mensagem</h3>
            <p className="text-gray-500 text-sm mb-6">
              Preencha o formulario e entraremos em contato em breve.
            </p>

            {submitted ? (
              <div className="text-center py-12">
                <span className="text-6xl block mb-4">✉️</span>
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
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-brand-pink transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-brand-pink transition-colors"
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
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-brand-pink transition-colors resize-none"
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
          <p className="text-gray-400 text-sm">
            Prefere falar diretamente? Chame no WhatsApp que respondemos
            rapidinho! ⚡
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
