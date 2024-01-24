<template>
  <div class="p-3 w-full rounded-lg shadow border-b-8 bg-base-100" :class="borderClass">
    <p class="text-sm">
      {{ title }}
    </p>
    <p class="text-center text-3xl font-light my-2">
      {{ text }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  text: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
})

const borderClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'border-success'
    case 'error':
      return 'border-error'
    case 'warning':
      return 'border-warning'
    case 'info':
      return 'border-info'
    case 'primary':
      return 'border-primary'
    default:
      return 'border-transparent'
  }
})
</script>
