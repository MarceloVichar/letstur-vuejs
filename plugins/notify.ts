import Toast, {useToast} from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((NuxtApp) => {
  NuxtApp.vueApp.use(Toast)
  const toast = useToast()
  NuxtApp.provide(
    'notify',
    (type: string = 'success', text = '', options = {}) => {
      options = {
        hideProgressBar: true,
        ...options,
      }
      // @ts-ignore
      return toast[type](text, options)
    })
})
