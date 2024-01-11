import { useAuth } from '@/store/auth'

export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuth()
  if (auth.isAuthenticated) {
    await auth.ensureUserIsLoaded()
  }
})
