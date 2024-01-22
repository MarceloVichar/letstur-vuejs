<template>
  <div class="bg-cover bg-center relative bg-no-repeat bg-login-background duration-500">
    <div class="h-screen w-screen grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 bg-primary bg-opacity-30">
      <div
        class="flex-col items-center justify-center h-full w-full hidden text-6xl text-secondary text-center lg:flex"
      />
      <div class="h-full bg-base-200 bg-opacity-80 lg:bg-opacity-100">
        <div class="flex flex-col gap-8 justify-center items-center h-full px-4">
          <figure class="w-48">
            <img
              src="/images/logo.png"
              alt="logo"
            >
          </figure>
          <div class="w-full sm:w-96 py-4 bg-base-200 lg:bg-transparent">
            <slot />
          </div>
        </div>
      </div>
    </div>
    <div class="absolute bottom-8 left-8 bg-base-100 bg-opacity-70 py-2 px-5 rounded-full flex gap-4">
      <ThemeSelector class="scale-150" />
    </div>
  </div>
</template>

<script setup>
import ThemeSelector from '~/components/shared/ThemeSelector.vue';

</script>
