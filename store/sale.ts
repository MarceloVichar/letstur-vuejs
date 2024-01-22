import {defineStore} from 'pinia'
import AuthService from '~/services/api/auth/AuthService';

export const useAuth = defineStore('sale', {
  state: () => {
    return {
      token: null,
      user: {},
    }
  },

  getters: {
    isUserLoaded() {
      return !!this.user.id
    },
    getToken() {
      return this.token
    },
    isAuthenticated() {
      return !!this.token
    },
    isAdmin() {
      return this.userRoles.includes('admin')
    },
    userRoles() {
      return this.user?.roles || []
    },
    userPermissions() {
      return this.user?.permissions || []
    },
  },

  actions: {
    setUser(user) {
      this.user = user
    },

    setToken(data) {
      this.token = data
    },

    async login(form) {
      return new AuthService().login(form)
        .then(async (response) => {
          await this.setToken(_get(response, 'access_token'))

          return response;
        })
    },

    removeLocalUserData() {
      this.user = {}
    },

    removeAuthInfo() {
      this.removeLocalUserData()
      this.token = null
    },

    async logout() {
      return new AuthService()
        .logout()
        .then(() => {
          this.removeAuthInfo()
        })
        .catch((error) => {
          if (error.data?.message === 'Unauthenticated.')
            return this.removeAuthInfo()

          throw error;
        })
    },

    async fetchUser() {
      return new AuthService().getProfile()
        .then((response) => {
          this.setUser(response)

        })
        .catch((error) => {
          if (error.data?.message === 'Unauthenticated.')
            this.removeAuthInfo()

          navigateTo('/auth/login')
        })
    },

    async ensureUserIsLoaded() {
      if (!this.isUserLoaded) {
        return await this.fetchUser()
      }
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
})
