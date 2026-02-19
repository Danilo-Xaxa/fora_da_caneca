import { forwardRef } from "react"

const variants = {
  primary:
    "bg-gradient-to-r from-brand-pink to-brand-orange text-white hover:shadow-lg hover:shadow-brand-pink/30 hover:scale-105",
  secondary:
    "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105",
  outline:
    "border-2 border-brand-pink text-brand-pink hover:bg-brand-pink hover:text-white",
  ghost: "text-white/70 hover:text-white hover:bg-white/10",
  whatsapp:
    "bg-green-500 text-white hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/30 hover:scale-105",
}

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
}

const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    className = "",
    disabled = false,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

export default Button
