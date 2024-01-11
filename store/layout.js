import {defineStore} from 'pinia'
import {useStorage} from '@vueuse/core';

export const useLayout = defineStore('layout', {
  state: () => {
    return {
      theme: useStorage('nuxt-color-mode', 'lightTheme'),
    }
  },

  getters: {
    getTheme() {
      return this.theme
    },
  },

  actions: {
    setTheme(theme) {
      this.theme = theme
    },
  },
})
