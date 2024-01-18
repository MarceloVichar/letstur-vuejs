<template>
  <div class="bg-base-200 min-h-screen">
    <TopBar class="fixed w-full top-0 z-[15]" />
    <div
      class="sidebarContainer absolute xl:fixed left-0 top-0 h-screen bg-base-100 pt-12 flex flex-col z-10 overflow-x-hidden"
      :class="{ 'w-0 xl:w-64': !layout.sidebarIsOpen, 'w-full sm:w-64': layout.sidebarIsOpen }"
    >
      <SideBar />
    </div>
    <div class="w-full min-h-screen xl:pl-64 pt-12" :class="{'h-screen overflow-y-hidden xl:overflow-y-auto xl:h-auto': layout.sidebarIsOpen}">
      <transition name="fade">
        <div
          v-if="layout.sidebarIsOpen"
          class="xl:hidden absolute h-screen w-full top-0 left-0 bg-black bg-opacity-20 z-[5] duration-200"
          @click="layout.closeSidebar()"
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
import {useLayout} from '~/store/layout';

const layout = useLayout()

</script>

<style>
.sidebarContainer {
  transition: width 0.1s ease;
}
</style>
