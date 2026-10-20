import test from 'node:test'
import assert from 'node:assert/strict'
import { resolveSiteUrl, deploymentMetadata } from '../scripts/deployment-metadata.js'

test('local builds do not invent a production domain', () => {
  assert.equal(resolveSiteUrl(), null)
  const plugin = deploymentMetadata()
  const tags = plugin.transformIndexHtml('', { filename: '/project/index.html' })
  assert.equal(tags.some(tag => tag.attrs.rel === 'canonical'), false)
  const assets = []
  plugin.generateBundle.call({ emitFile: asset => assets.push(asset) })
  assert.deepEqual(assets.map(asset => asset.fileName), ['robots.txt'])
  assert.equal(assets[0].source, 'User-agent: *\nAllow: /\n')
})

test('explicit custom domain takes precedence over the Vercel production host', () => {
  assert.equal(resolveSiteUrl({ siteUrl: 'https://detail.example/', productionHost: 'preview.example' }), 'https://detail.example')
  assert.equal(resolveSiteUrl({ productionHost: 'detail.vercel.app' }), 'https://detail.vercel.app')
})

test('invalid deployment origins fail rather than emitting misleading URLs', () => {
  for (const siteUrl of ['http://detail.example', 'https://detail.example/subpath', 'https://user:password@detail.example', 'https://detail.example/?q=1', 'https://detail.example/#contacto', 'invalid']) {
    assert.throws(() => resolveSiteUrl({ siteUrl }))
  }
})

test('production metadata and sitemap describe the landing, not the legacy redirect', () => {
  const plugin = deploymentMetadata({ siteUrl: 'https://detail.example' })
  const tags = plugin.transformIndexHtml('', { filename: '/project/index.html' })
  assert.equal(tags.find(tag => tag.attrs.rel === 'canonical').attrs.href, 'https://detail.example/')
  assert.equal(tags.find(tag => tag.attrs.property === 'og:image').attrs.content, 'https://detail.example/social-preview.jpg')
  assert.deepEqual(plugin.transformIndexHtml('', { filename: '/project/contacto.html' }), [])
  const assets = []
  plugin.generateBundle.call({ emitFile: asset => assets.push(asset) })
  assert.match(assets.find(asset => asset.fileName === 'robots.txt').source, /Sitemap: https:\/\/detail\.example\/sitemap\.xml/)
  assert.match(assets.find(asset => asset.fileName === 'sitemap.xml').source, /<loc>https:\/\/detail\.example\/<\/loc>/)
})
