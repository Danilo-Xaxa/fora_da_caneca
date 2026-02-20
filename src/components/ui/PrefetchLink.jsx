import { useCallback, useRef } from "react"
import { Link } from "react-router-dom"

const ROUTE_MODULES = {
  "/": () => import("../../pages/Home"),
  "/catalogo": () => import("../../pages/Catalogo"),
  "/sobre": () => import("../../pages/SobreNos"),
  "/contato": () => import("../../pages/Contato"),
  "/carrinho": () => import("../../pages/Carrinho"),
}

export default function PrefetchLink({ to, children, ...props }) {
  const prefetched = useRef(false)

  const handleMouseEnter = useCallback(() => {
    if (prefetched.current) return
    prefetched.current = true

    const loader = ROUTE_MODULES[to]
    if (loader) {
      loader()
    }
  }, [to])

  return (
    <Link to={to} onMouseEnter={handleMouseEnter} onFocus={handleMouseEnter} {...props}>
      {children}
    </Link>
  )
}
