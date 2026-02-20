import { Link } from "react-router-dom"
import { Home, ArrowLeft, Search } from "lucide-react"
import Container from "../components/ui/Container"
import Button from "../components/ui/Button"
import SEO from "../components/ui/SEO"

export default function NaoEncontrada() {
  return (
    <section className="py-20 md:py-32">
      <SEO
        title="Pagina nao encontrada"
        description="A pagina que voce procura nao existe. Volte para a pagina inicial ou navegue pelo catalogo."
        path="/404"
      />
      <Container>
        <div className="text-center max-w-lg mx-auto">
          <p className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-brand-pink to-brand-orange bg-clip-text text-transparent mb-4">
            404
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Ops! Pagina nao encontrada
          </h1>
          <p className="text-gray-500 mb-8">
            Parece que essa caneca saiu do catalogo... Mas temos varias outras
            esperando por voce!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/">
              <Button size="lg">
                <Home size={18} />
                Voltar ao Inicio
              </Button>
            </Link>
            <Link to="/catalogo">
              <Button variant="outline" size="lg">
                <Search size={18} />
                Ver Catalogo
              </Button>
            </Link>
          </div>
          <button
            onClick={() => window.history.back()}
            className="mt-6 inline-flex items-center gap-2 text-gray-400 hover:text-brand-pink transition-colors text-sm cursor-pointer"
          >
            <ArrowLeft size={16} />
            Voltar a pagina anterior
          </button>
        </div>
      </Container>
    </section>
  )
}
