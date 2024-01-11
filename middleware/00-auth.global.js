import {useAuth} from '@/store/auth'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuth()

  const unauthenticatedRoutes = ['/auth/login']

  if (unauthenticatedRoutes.includes(to.path)) {
    if (auth.isAuthenticated) {
      useNotify('warning', 'Você já está autenticado')
      return navigateTo('/')
    }
    return
  }

  if (!auth.isAuthenticated) {
    return navigateTo('/auth/login')
  }
})
