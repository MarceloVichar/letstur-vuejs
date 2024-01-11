<template>
  <div class="breadcrumbs">
    <ul>
      <li
        v-for="(crumb, index) in crumbs"
        :key="index"
        property="itemListElement"
        typeof="ListItem"
      >
        <Nuxt-link
          v-if="!isCurrentRoute(crumb.path)"
          property="item"
          typeof="WebPage"
          :to="crumb.path"
          class="hidden xl:inline uppercase"
        >
          <span property="name" class="font-light text-xs hover:brightness-200">{{ crumbTitle(crumb) }}</span>
        </Nuxt-link>
        <div v-else class="font-light cursor-default uppercase">
          {{ crumbTitle(crumb) }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const router = useRouter()
const route = useRoute()

const crumbs = computed(() => {
  const routes = router.getRoutes()
  const fullPath = route.fullPath
  const params = fullPath.startsWith('/')
    ? fullPath.substring(1).split('/')
    : fullPath.split('/')
  const crumbs = []
  let path = ''
  params.forEach(async (param) => {
    path = `${path}/${param}`
    const match = routes.find(route => route.path === path)
    if (match?.path) {
      const pathParts = match?.path?.split('/')
      const pathName = pathParts[pathParts.length - 1]
      crumbs.push({
        title: param.replace(/-/g, ' ').split('?')[0],
        ...match,
        name: pathName,
      })
    }
  })
  return crumbs
})

function isCurrentRoute (crumbPath) {
  return route.path === crumbPath
}

const crumbTitle = (crumb) => {
  return _truncate(crumb?.name?.toUpperCase().replace(/-/g, '_'), {
    length: 20,
    omission: '...',
  })
}
</script>

<style scoped>
ol {
  list-style: none;
}

li {
  display: inline;
}

li a {
  color: theme('colors.base-content');
}
</style>
