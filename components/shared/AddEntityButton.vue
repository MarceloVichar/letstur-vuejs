<template>
  <button class="btn btn-primary btn-circle sm:btn sm:w-auto text-base-100 fixed top-[72px] right-2 sm:top-0 sm:right-0 z-[1] sm:z-0 sm:relative" @click="navigateTo(to)">
    <span class="inline sm:hidden">
      <Icon name="ic:baseline-add" class="text-4xl" />
    </span>
    <span class="hidden sm:inline text-base-100">{{ text }}</span>
  </button>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: 'Adicionar',
  },
})
</script>
