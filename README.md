# Fora da Caneca

E-commerce de canecas personalizadas com frases criativas e humoristicas.

Produtos personalizados do seu jeito — de Bananeiras (PB) para todo o Brasil.

[![Instagram](https://img.shields.io/badge/@foradacaneca-E4405F?style=flat&logo=instagram&logoColor=white)](https://www.instagram.com/foradacaneca/)
[![WhatsApp](https://img.shields.io/badge/(81)%2099336--7273-25D366?style=flat&logo=whatsapp&logoColor=white)](https://wa.me/5581993367273)

---

## Sobre

Fora da Caneca transforma momentos simples em sorrisos com canecas que vao do humor acido ao romantico, passando por café e rock'n'roll.

O site funciona como catálogo digital com carrinho de compras. O cliente monta seu pedido e finaliza diretamente pelo WhatsApp.

## Funcionalidades

- **Catalogo** com filtro por 5 categorias (Humor, Café, Românticas, Música, Personalizadas)
- **Busca por texto** com normalizacao de acentos
- **Ordenacao** por destaques, preco e ordem alfabetica
- **Carrinho de compras** persistido no localStorage (Zustand)
- **Pedido via WhatsApp** com mensagem pre-formatada (itens + total)
- **Botao flutuante** de WhatsApp em todas as paginas
- **Cart drawer** lateral para visualizacao rapida
- **Pagina de produto** com badges de desconto, urgencia e produtos relacionados
- **SEO** com meta tags dinamicas, Open Graph, JSON-LD Product schema, sitemap.xml e robots.txt
- **PWA** com manifest.json para "Adicionar a tela inicial"
- **Performance** com code splitting por rota, prefetch no hover e chunk splitting do router
- **Acessibilidade** com aria-labels, skip link, focus visible e contraste WCAG AA
- **Design responsivo** mobile-first
- **ErrorBoundary** global com pagina de erro amigavel
- **Pagina 404** customizada
- **Skeleton loading** no catálogo durante carregamento
- **Transicao suave** entre paginas (opacity CSS)

## Tech Stack

| Tecnologia | Versao | Uso |
| --- | --- | --- |
| [React](https://react.dev) | 19.2 | UI com componentes funcionais |
| [Vite](https://vite.dev) | 7.3 | Build tool e dev server |
| [Tailwind CSS](https://tailwindcss.com) | 4.2 | Estilizacao utility-first |
| [React Router](https://reactrouter.com) | 7.13 | Roteamento SPA |
| [Zustand](https://zustand.docs.pmnd.rs) | 5.0 | Estado global (carrinho) |
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
│   ├── ui/          # Button, Badge, Container, SectionTitle, SEO,
│   │                # ErrorBoundary, PrefetchLink, WhatsAppIcon
│   ├── layout/      # Header, Footer, Layout, WhatsAppFloat, CartDrawer
│   └── product/     # ProductCard, ProductCardSkeleton, ProductGrid, CategoryFilter
├── pages/           # Home, Catalogo, Produto, Carrinho, SobreNos, Contato, NaoEncontrada
├── stores/          # cartStore (Zustand + localStorage persist)
├── utils/           # formatPrice, whatsapp
├── constants/       # products (8 produtos), categories (5 categorias), siteConfig
├── App.jsx          # Rotas com lazy loading + ErrorBoundary
├── main.jsx         # Entry point (React 19 createRoot)
└── index.css        # Tailwind @theme (cores, fontes da marca)
```

## Paginas

| Rota | Pagina | Descricao |
| --- | --- | --- |
| `/` | Home | Hero, categorias, destaques, como funciona, CTA WhatsApp |
| `/catalogo` | Catalogo | Grid de produtos com busca, filtro e ordenacao |
| `/produto/:slug` | Produto | Detalhe com quantidade, carrinho, WhatsApp e JSON-LD |
| `/carrinho` | Carrinho | Itens, resumo e finalizacao via WhatsApp |
| `/sobre` | Sobre Nos | Historia da marca, valores e numeros |
| `/contato` | Contato | Formulario, WhatsApp e Instagram |
| `*` | 404 | Pagina não encontrada |

## Identidade Visual

A marca usa um gradiente rosa-laranja como assinatura:

```
Rosa:       #E91E63   (primaria, CTAs)
Laranja:    #FF9800   (gradiente, acentos)
Marrom:     #5D4037   (textos, tematica café)
Escuro:     #1A1A2E   (fundo principal)
Rosa claro: #FCE4EC   (hover, backgrounds)
```

**Gradiente:** `linear-gradient(135deg, #E91E63, #FF9800)`

**Fontes**: Dancing Script (titulos decorativos) + Lora (corpo de texto), via Google Fonts.

**Estilo**: Fundo escuro com cards claros, bordas arredondadas, sombras suaves, gradiente da marca nos CTAs.

## WhatsApp

O WhatsApp e o canal principal de vendas. A integracao inclui:

- Botao flutuante em todas as paginas
- Botao "Pedir pelo WhatsApp" em cada produto
- "Finalizar pelo WhatsApp" no carrinho com lista de itens e total
- Links no header, footer e pagina de contato

Todas as mensagens sao pre-formatadas com o contexto adequado.

## Build de Producao

Ultimo build limpo, sem warnings:

- **index.js**: 206 KB (66 KB gzip) — bundle principal
- **router.js**: 48 KB (17 KB gzip) — React Router (chunk separado)
- **CSS**: 42 KB (7 KB gzip) — Tailwind
- **Pages**: 1-6 KB cada — lazy loaded por rota

## Roadmap

- [x] Catalogo com filtro por categorias, busca e ordenacao
- [x] Carrinho de compras com persistencia local
- [x] Pedido via WhatsApp (mensagem pre-formatada)
- [x] Design responsivo mobile-first
- [x] Code splitting por rota + prefetch no hover
- [x] SEO (meta tags, Open Graph, JSON-LD, sitemap, robots.txt)
- [x] PWA manifest
- [x] Pagina 404 customizada
- [x] ErrorBoundary global
- [x] Skeleton loading e transicoes entre paginas
- [ ] Imagens reais dos produtos (substituir placeholders)
- [ ] Conteudo real (textos, historia da marca)
- [ ] Backend com Supabase (produtos, pedidos)
- [ ] Pagamento online com Mercado Pago
- [ ] Calculo de frete com Melhor Envio

## Licenca

Projeto privado de uso exclusivo da marca Fora da Caneca.
