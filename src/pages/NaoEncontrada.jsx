import { Link } from "react-router-dom"
import { Home, ArrowLeft, Search } from "lucide-react"
import Container from "../components/ui/Container"
import Button from "../components/ui/Button"
import SEO from "../components/ui/SEO"

export default function NaoEncontrada() {
  return (
    <section className="py-20 md:py-32">
      <SEO
        title="Pagina não encontrada"
        description="A pagina que você procura não existe. Volte para a pagina inicial ou navegue pelo catálogo."
        path="/404"
      />
      <Container>
        <div className="text-center max-w-lg mx-auto">
          <p className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-brand-pink to-brand-orange bg-clip-text text-transparent mb-4">
            404
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Ops! Página não encontrada
          </h1>
          <p className="text-gray-500 mb-8">
            Parece que essa caneca saiu do catálogo... Mas temos várias outras
            esperando por você!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/">
              <Button size="lg">
                <Home size={18} />
                Voltar ao Início
              </Button>
            </Link>
            <Link to="/catalogo">
              <Button variant="outline" size="lg">
                <Search size={18} />
                Ver Catálogo
              </Button>
            </Link>
          </div>
          <button
            onClick={() => window.history.back()}
            className="mt-6 inline-flex items-center gap-2 text-gray-400 hover:text-brand-pink transition-colors text-sm cursor-pointer"
          >
            <ArrowLeft size={16} />
            Voltar a página anterior
          </button>
        </div>
      </Container>
    </section>
  )
}
