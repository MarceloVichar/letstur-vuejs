const route = useRoute()

export function useRouteQueryWatcher(action) {
  const router = useRouter()
  const debouncedAction = _debounce(action, 10)

  watch(
    () => route.query,
    (query, oldQuery) => {
      if (oldQuery?.page && query?.page === oldQuery?.page && query?.page !== '1') {
        router.replace({ query: { ...query, page: '1' } })
      } else if (!_isEmpty(query)) {
        debouncedAction()
      }
    },
    { deep: true },
  )
}

export const setQueryParam = (queryString, value = null) => {
  const router = useRouter()
  if (typeof queryString === 'string' || queryString instanceof String) {
    queryString = { [queryString]: value }
  }
  const alreadyHasSameQueries = _isMatch(route.query, queryString)

  if (alreadyHasSameQueries || !router) {
    return
  }

  router.replace({ query: { ...route.query, ...queryString } })
}

export const getQueryParam = (queryStringKey, defaultValue = null) => {
  let currentQueries = []
  currentQueries = route.query
  return currentQueries[queryStringKey] || defaultValue
}

export const removeQueryParam = (queryStringKey) => {
  const router = useRouter()
  if (typeof queryStringKey === 'string' || queryStringKey instanceof String) {
    queryStringKey = [queryStringKey]
  }
  const currentQueries = Object.assign({}, route.query)

  queryStringKey.forEach((item) => {
    delete currentQueries[item]
  })

  router.replace({ query: currentQueries })
}

export const hasQueryParam = (queryStringKey) => {
  return _has(route.query, queryStringKey)
}

export const setQueryPage = (action, fetchedData, list = null) => {
  const deleteAll = list
    ? list.length === fetchedData.data.length
    : fetchedData.data.length === 1
  const isLastPage = fetchedData.meta.last_page !== 1 && fetchedData.meta.last_page === parseInt(route.query.page)

  if(deleteAll && isLastPage){
    return setQueryParam('page', route.query.page - 1)
  }

  action()
}
