export function initNavigation() {
  const header = document.querySelector('.site-header')
  const toggle = header?.querySelector('.menu-toggle')
  const navigation = header?.querySelector('.main-nav')
  if (!header || !toggle || !navigation) return

  const close = (restoreFocus = false) => {
    header.classList.remove('is-open')
    toggle.setAttribute('aria-expanded', 'false')
    if (restoreFocus) toggle.focus()
  }

  header.dataset.navigationReady = ''
  toggle.hidden = false
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true'
    header.classList.toggle('is-open', open)
    toggle.setAttribute('aria-expanded', String(open))
  })
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) close()
  })
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') close(true)
  })
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) close()
  })
  window.matchMedia('(min-width: 961px)').addEventListener('change', (event) => {
    if (event.matches) close()
  })
}
