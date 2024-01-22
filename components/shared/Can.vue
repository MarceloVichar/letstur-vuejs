<template>
  <slot v-if="can" />
</template>

<script setup>
const props = defineProps({
  role: {
    type: [String, Array],
    required: false,
    default: null,
  },
  permission: {
    type: [String, Array],
    required: false,
    default: null,
  },
})

const can = computed(() => {
  return hasRole(props.role) && hasPermission(props.permission)
})

</script>
