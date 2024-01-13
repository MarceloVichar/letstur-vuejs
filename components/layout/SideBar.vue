<template>
  <div
    v-if="availablePages && availablePages.length > 0"
    class="flex flex-col gap-1 px-2 py-6"
  >
    <div
      v-for="(page, index) in availablePages"
      :key="index"
    >
      <nuxt-link
        v-if="!page?.children || !page.children?.length"
        :to="page.path"
      >
        <button
          class="btn btn-ghost flex gap-3 flex-nowrap w-full justify-start"
          :class="{ 'text-secondary': activeLink(page.path) }"
        >
          <Icon :name="page.icon" />
          {{ page.label }}
        </button>
      </nuxt-link>
      <div v-else>
        <DropDown
          :item="page"
          :is-visible="visibleMenu === page.label"
          @openMenu="setVisible(page.label)"
          @closeMenu="setVisible(undefined)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import menuItems from '~/support/menu-items';
import DropDown from '~/components/layout/sidebar/Dropdown.vue';
import {useAuth} from '~/store/auth';

const visibleMenu = ref('')

const route = reactive(useRoute())

const availablePages = computed(() => {
  const pages = useAuth()?.isAdmin ? menuItems['admin'] : menuItems['company']
  return getAccessibleRoutes(pages)
})

function activeLink(path) {
  return (typeof route.path === 'string') ? route.path.includes(path) : false
}

onMounted(() => {
  const currentRoute = availablePages.value.find(page => {
    return route.path.includes(page.path) && page.children?.length
  })
  if (currentRoute) {
    setVisible(currentRoute.label)
  }
})

// const getAccessibleRoutes = (menuItems) => {
//   return menuItems.filter(item => {
//     const hasRequiredRole = item.role ? hasRole(item.role) : true;
//     const hasRequiredPermission = item.permission ? hasPermission(item.permission) : true;
//
//     if (hasRequiredRole && hasRequiredPermission) {
//       if (item.children) {
//         item.children = getAccessibleRoutes(item.children);
//       }
//       return true;
//     }
//     return false;
//   });
// }

const getAccessibleRoutes = (menuItems) => {
  return menuItems.filter(item => {
    const hasRequiredRole = item.role ? hasRole(item.role) : true;
    const hasRequiredPermission = item.permission ? hasPermission(item.permission) : true;

    let childrenHavePermission = true;
    if (item.children && item.children?.length) {
      item.children = getAccessibleRoutes(item.children);
      childrenHavePermission = item.children.length > 0;
    }

    console.log(item.label, hasRequiredPermission, hasRequiredRole, childrenHavePermission)

    return hasRequiredRole && hasRequiredPermission && childrenHavePermission;
  });
}

function setVisible(label) {
  if (visibleMenu.value && label) {
    visibleMenu.value = undefined
    setTimeout(() => {
      visibleMenu.value = label
    }, 600)
    return
  }
  visibleMenu.value = label
}

</script>
