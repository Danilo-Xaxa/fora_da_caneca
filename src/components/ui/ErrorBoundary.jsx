import { Component } from "react"
import { RefreshCw, Home } from "lucide-react"
import Container from "./Container"
import Button from "./Button"

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="py-20 md:py-32">
          <Container>
            <div className="text-center max-w-lg mx-auto">
              <p className="text-7xl mb-6">😵</p>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                Algo deu errado
              </h1>
              <p className="text-gray-500 mb-8">
                Parece que houve um problema ao carregar a pagina. Verifique sua
                conexao e tente novamente.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => {
                    this.setState({ hasError: false })
                    window.location.reload()
                  }}
                >
                  <RefreshCw size={18} />
                  Tentar novamente
                </Button>
                <a href="/">
                  <Button variant="outline" size="lg">
                    <Home size={18} />
                    Voltar ao Inicio
                  </Button>
                </a>
              </div>
            </div>
          </Container>
        </section>
      )
    }

    return this.props.children
  }
}
