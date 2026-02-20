import { Outlet, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import Header from "./Header"
import Footer from "./Footer"
import WhatsAppFloat from "./WhatsAppFloat"
import CartDrawer from "./CartDrawer"

export default function Layout() {
  const { pathname } = useLocation()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), 20)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">
        Pular para o conteudo principal
      </a>
      <Header />
      <main
        id="main-content"
        className={`flex-1 pt-16 md:pt-20 transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
      >
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <CartDrawer />
    </div>
  )
}
