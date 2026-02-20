import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/layout/Layout"
import ErrorBoundary from "./components/ui/ErrorBoundary"

const Home = lazy(() => import("./pages/Home"))
const Catalogo = lazy(() => import("./pages/Catalogo"))
const Produto = lazy(() => import("./pages/Produto"))
const Carrinho = lazy(() => import("./pages/Carrinho"))
const SobreNos = lazy(() => import("./pages/SobreNos"))
const Contato = lazy(() => import("./pages/Contato"))
const NaoEncontrada = lazy(() => import("./pages/NaoEncontrada"))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-brand-pink border-t-transparent rounded-full animate-spin" />
        <span className="text-gray-400 text-sm">Carregando...</span>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/produto/:slug" element={<Produto />} />
              <Route path="/carrinho" element={<Carrinho />} />
              <Route path="/sobre" element={<SobreNos />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="*" element={<NaoEncontrada />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
