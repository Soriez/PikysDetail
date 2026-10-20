export function resolveSiteUrl({ siteUrl, productionHost } = {}) {
  const value = siteUrl || (productionHost && `https://${productionHost}`)
  if (!value) return null

  const url = new URL(value)
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
    throw new Error('SITE_URL debe ser el origen HTTPS público, sin ruta, parámetros ni credenciales.')
  }
  return url.origin
}

export function deploymentMetadata(options) {
  const origin = resolveSiteUrl(options)
  const image = origin ? `${origin}/social-preview.jpg` : '/social-preview.jpg'

  return {
    name: 'deployment-metadata',
    transformIndexHtml(_html, context) {
      if (!context.filename.endsWith('index.html')) return []
      return [
        { tag: 'meta', attrs: { property: 'og:image', content: image } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: image } },
        ...(origin ? [
          { tag: 'link', attrs: { rel: 'canonical', href: `${origin}/` } },
          { tag: 'meta', attrs: { property: 'og:url', content: `${origin}/` } },
        ] : []),
      ]
    },
    generateBundle() {
      const sitemap = origin ? `Sitemap: ${origin}/sitemap.xml\n` : ''
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n${sitemap}` })
      if (origin) {
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>\n` })
      }
    },
  }
}
