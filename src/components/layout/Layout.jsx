import { Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Header from "./Header"
import Footer from "./Footer"
import WhatsAppFloat from "./WhatsAppFloat"
import CartDrawer from "./CartDrawer"

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">
        Pular para o conteudo principal
      </a>
      <Header />
      <main id="main-content" className="flex-1 pt-16 md:pt-20">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <CartDrawer />
    </div>
  )
}
