import { SITE_CONFIG } from "../../constants/siteConfig"

const BASE_URL = "https://foradacaneca.com.br"

export default function SEO({
  title,
  description,
  path = "",
  image = "/og-image.jpg",
  type = "website",
  jsonLd = null,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : `${SITE_CONFIG.name} | Canecas Personalizadas`
  const fullDescription = description || SITE_CONFIG.description
  const url = `${BASE_URL}${path}`
  const imageUrl = image.startsWith("http") ? image : `${BASE_URL}${image}`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content={SITE_CONFIG.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </>
  )
}
