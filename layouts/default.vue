<template>
  <div class="bg-base-200 min-h-screen">
    <TopBar class="fixed w-full top-0 z-50" @openSidebar="openSidebar()" />
    <div
      class="sidebarContainer absolute xl:fixed left-0 top-0 h-screen bg-base-100 pt-12 flex flex-col z-20 overflow-x-hidden"
      :class="{ 'w-0 xl:w-64': !sidebarIsOpened, 'w-64': sidebarIsOpened }"
    >
      <SideBar />
    </div>
    <div class="w-full min-h-screen xl:pl-64 pt-12" :class="{'h-screen overflow-y-hidden xl?overflow-y-auto xl:h-auto': sidebarIsOpened}">
      <transition name="fade">
        <div
          v-if="sidebarIsOpened"
          class="xl:hidden absolute h-screen w-full top-0 left-0 bg-black bg-opacity-20 z-10 duration-200"
          @click="closeSidebar()"
        />
      </transition>
      <div class="px-1 lg:px-4 pt-6 pb-4 w-full h-full">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import TopBar from '~/components/layout/TopBar.vue';
import SideBar from '~/components/layout/SideBar.vue';

const sidebarIsOpened = ref(false)

function openSidebar() {
  sidebarIsOpened.value = true
}
function closeSidebar () {
  sidebarIsOpened.value = false
}
</script>

<style>
.sidebarContainer {
  transition: width 0.3s ease;
}
</style>
