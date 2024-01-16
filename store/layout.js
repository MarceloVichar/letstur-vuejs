import {defineStore} from 'pinia'
import {useStorage} from '@vueuse/core';

export const useLayout = defineStore('layout', {
  state: () => {
    return {
      theme: useStorage('nuxt-color-mode', 'lightTheme'),
      sidebarIsOpen: false,
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
    toggleSidebar() {
      this.sidebarIsOpen = !this.sidebarIsOpen
    },
    openSidebar() {
      this.sidebarIsOpen = true
    },
    closeSidebar() {
      this.sidebarIsOpen = false
    },
  },
})
