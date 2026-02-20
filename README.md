# Fora da Caneca

E-commerce de canecas personalizadas com frases criativas e humoristicas.

Produtos personalizados do seu jeito — de Bananeiras/PB para todo o Brasil.

[![Instagram](https://img.shields.io/badge/@foradacaneca-E4405F?style=flat&logo=instagram&logoColor=white)](https://www.instagram.com/foradacaneca/)
[![WhatsApp](https://img.shields.io/badge/(81)%2099336--7273-25D366?style=flat&logo=whatsapp&logoColor=white)](https://wa.me/5581993367273)

---

## Sobre

Fora da Caneca transforma momentos simples em sorrisos com canecas que vao do humor acido ao romantico, passando por cafe e rock'n'roll.

O site funciona como catalogo digital com carrinho de compras. O cliente monta seu pedido e finaliza diretamente pelo WhatsApp.

## Funcionalidades

- **Catalogo** com filtro por 5 categorias (Humor, Cafe, Romanticas, Musica, Personalizadas)
- **Ordenacao** por destaques, preco e ordem alfabetica
- **Carrinho de compras** persistido no localStorage
- **Pedido via WhatsApp** com mensagem pre-formatada (itens + total)
- **Botao flutuante** de WhatsApp em todas as paginas
- **Cart drawer** lateral para visualizacao rapida
- **Pagina de produto** com seletor de quantidade, badges de desconto e produtos relacionados
- **Design responsivo** mobile-first
- **Code splitting** por rota com lazy loading

## Tech Stack

| Tecnologia | Versao | Uso |
| --- | --- | --- |
| [React](https://react.dev) | 19 | UI com componentes funcionais |
| [Vite](https://vite.dev) | 7 | Build tool e dev server |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Estilizacao utility-first |
| [React Router](https://reactrouter.com) | 7 | Roteamento SPA |
| [Zustand](https://zustand.docs.pmnd.rs) | 5 | Estado global (carrinho) |
| [Lucide React](https://lucide.dev) | 0.575 | Icones SVG |

## Comecando

### Pre-requisitos

- [Node.js](https://nodejs.org) 18+
- npm 9+

### Instalacao

```bash
git clone https://github.com/seu-usuario/fora-da-caneca.git
cd fora-da-caneca
npm install
npm run dev
```

O site estara disponivel em `http://localhost:5173`.

### Scripts

| Comando | Descricao |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento com HMR |
| `npm run build` | Build de producao (output em `dist/`) |
| `npm run preview` | Preview local do build |
| `npm run lint` | Verificacao com ESLint |

## Estrutura do Projeto

```
src/
├── components/
│   ├── ui/          # Button, Badge, Container, SectionTitle, WhatsAppIcon
│   ├── layout/      # Header, Footer, Layout, WhatsAppFloat, CartDrawer
│   └── product/     # ProductCard, ProductGrid, CategoryFilter
├── pages/           # Home, Catalogo, Produto, Carrinho, SobreNos, Contato
├── stores/          # cartStore (Zustand + localStorage persist)
├── utils/           # formatPrice, whatsapp
├── constants/       # products, categories, siteConfig
├── App.jsx          # Rotas com lazy loading
├── main.jsx         # Entry point
└── index.css        # Tailwind @theme (cores, fontes da marca)
```

## Paginas

| Rota | Pagina | Descricao |
| --- | --- | --- |
| `/` | Home | Hero, categorias, destaques, como funciona, CTA WhatsApp |
| `/catalogo` | Catalogo | Grid de produtos com filtro e ordenacao |
| `/produto/:slug` | Produto | Detalhe com quantidade, carrinho e WhatsApp |
| `/carrinho` | Carrinho | Itens, resumo e finalizacao via WhatsApp |
| `/sobre` | Sobre Nos | Historia da marca, valores e numeros |
| `/contato` | Contato | Formulario, WhatsApp e Instagram |

## Identidade Visual

A marca usa um gradiente rosa-laranja como assinatura:

```
Rosa:    #E91E63
Laranja: #FF9800
Fundo:   #1A1A2E
```

**Fontes**: Dancing Script (titulos decorativos) + Lora (corpo de texto), via Google Fonts.

**Estilo**: Fundo escuro com cards claros, bordas arredondadas, sombras suaves, gradiente da marca nos CTAs.

## WhatsApp

O WhatsApp e o canal principal de vendas. A integracao inclui:

- Botao flutuante em todas as paginas
- Botao "Pedir pelo WhatsApp" em cada produto
- "Finalizar pelo WhatsApp" no carrinho com lista de itens e total
- Links no header, footer e pagina de contato

Todas as mensagens sao pre-formatadas com o contexto adequado.

## Roadmap

- [x] Catalogo com filtro por categorias e ordenacao
- [x] Carrinho de compras com persistencia local
- [x] Pedido via WhatsApp (mensagem pre-formatada)
- [x] Design responsivo mobile-first
- [x] Code splitting por rota
- [ ] Imagens reais dos produtos (substituir placeholders)
- [ ] SEO (meta tags dinamicas, JSON-LD, sitemap)
- [ ] Pagina 404 customizada
- [ ] Busca por texto no catalogo
- [ ] Backend com Supabase (produtos, pedidos)
- [ ] Pagamento online com Mercado Pago
- [ ] Calculo de frete com Melhor Envio

## Licenca

Projeto privado de uso exclusivo da marca Fora da Caneca.
