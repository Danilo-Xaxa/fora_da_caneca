import { Laugh, Coffee, Heart, Music, Sparkles } from "lucide-react"

export const CATEGORIES = [
  {
    id: "humor",
    name: "Humor",
    description: "Frases engracadas pra alegrar seu dia",
    icon: Laugh,
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: "cafe",
    name: "Cafe Lovers",
    description: "Para quem nao vive sem um cafezinho",
    icon: Coffee,
    color: "from-amber-700 to-yellow-600",
  },
  {
    id: "romanticas",
    name: "Romanticas",
    description: "Presentes perfeitos pra quem voce ama",
    icon: Heart,
    color: "from-pink-500 to-red-500",
  },
  {
    id: "musica",
    name: "Musica",
    description: "Para quem respira musica",
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
