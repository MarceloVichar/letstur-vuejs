import ConfirmDialog from '~/components/shared/ConfirmDialog.vue';
import {createApp} from 'vue'

export const useConfirmation = ({
  title,
  message,
  cancelButtonMessage,
  confirmButtonMessage,
  type,
} = {}) => {
  return new Promise((resolve) => {
    const app = createApp(ConfirmDialog, {
      title,
      message,
      cancelButtonMessage,
      confirmButtonMessage,
      type,
      onConfirm() {
        app.unmount()
        app._container.remove()
        app._container = null
        resolve(true)
      },
      onCancel() {
        app.unmount()
        app._container.remove()
        app._container = null
        resolve(false)
      },
    })
    const container = document.createElement('div')
    document.body.appendChild(container)
    app.mount(container)
  })
}
