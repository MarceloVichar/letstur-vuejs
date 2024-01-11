import {useAuth} from '@/store/auth'
import {hasPermission} from '~/composables/helpers';

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuth()

  if (!auth.isAuthenticated) {
    return
  }

  let pagePermission = to.meta?.permission
  if (typeof pagePermission === 'string') {
    pagePermission = [pagePermission]
  }

  if (!hasPermission(pagePermission)) {
    useNotify('warning', 'Sem permissão')
    return navigateTo('/')
  }
})
