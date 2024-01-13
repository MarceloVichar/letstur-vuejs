<template>
  <div
    class="px-2 py-1 min-h-min flex justify-between items-center bg-primary text-base-100"
  >
    <LayoutTopbarHamburger
      class="xl:hidden flex items-center"
      @openSidebar="emits('openSidebar')"
    />
    <NuxtLink to="/" class="flex justify-center items-center">
      <img
        src="/images/light-logo.png"
        alt="logo"
        class="h-8 w-max"
      >
    </NuxtLink>
    <div class="flex justify-end gap-2">
      <ThemeSelector class="scale-125 mr-1" />
      <div class="flex items-center gap-4">
        <div class="dropdown dropdown-end">
          <label
            tabindex="0"
            class="btn btn-ghost btn-circle avatar mr-2"
          >
            <Icon name="ic:baseline-account-circle" class="text-4xl" />
          </label>
          <ul
            tabindex="0"
            class="mt-3 p-2 shadow-lg menu menu-compact dropdown-content rounded-box w-52 bg-base-100 text-base-content lg:z-50"
          >
            <li>
              <a>Meu perfil</a>
            </li>
            <li>
              <a @click.prevent="logout">Sair</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~/store/auth';
import Breadcrumb from '~/components/layout/topbar/Breadcrumb.vue';
import ThemeSelector from '~/components/shared/ThemeSelector.vue';

const emits = defineEmits(['openSidebar'])
const authStore = useAuth()
const router = useRouter()

function logout() {
  authStore.logout()
    .then(() => {
      router.push('/auth/login')
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        router.push('/auth/login')
      }
    })
}
</script>
