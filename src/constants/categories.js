import { Laugh, Coffee, Heart, Music, Sparkles } from "lucide-react"

export const CATEGORIES = [
  {
    id: "humor",
    name: "Humor",
    description: "Frases engraçadas pra alegrar seu dia",
    icon: Laugh,
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: "cafe",
    name: "Café",
    description: "Para quem não vive sem um cafézinho",
    icon: Coffee,
    color: "from-amber-700 to-yellow-600",
  },
  {
    id: "romanticas",
    name: "Românticas",
    description: "Presentes perfeitos pra quem você ama",
    icon: Heart,
    color: "from-pink-500 to-red-500",
  },
  {
    id: "musica",
    name: "Música",
    description: "Para quem respira música",
    icon: Music,
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: "personalizadas",
    name: "Personalizadas",
    description: "Crie do seu jeito, com sua frase",
    icon: Sparkles,
    color: "from-brand-pink to-brand-orange",
  },
]
