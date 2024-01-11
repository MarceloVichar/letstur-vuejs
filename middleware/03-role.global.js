import {useAuth} from '@/store/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuth()

  if (!auth.isAuthenticated) {
    return
  }

  const adminPrefix = '/admin/'
  const companyPrefix = '/company/'

  const isAdmin = auth.isAdmin

  if ((!isAdmin && to.path.includes(adminPrefix)) || (isAdmin && to.path.includes(companyPrefix))) {
    useNotify('warning', 'Sem permissão')
    return navigateTo('/')
  }
})
