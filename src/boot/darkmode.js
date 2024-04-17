import { boot } from 'quasar/wrappers'
import { Dark } from 'quasar'

export default boot(({ app }) => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: light)').matches
  Dark.set(prefersDark)
})