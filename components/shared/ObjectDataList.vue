<template>
  <div class="mb-2 pl-12">
    <p v-for="item in props.data" :key="item.id">
      <strong>{{ item.value }}: </strong>{{ item.label }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true,
    default() {
      return []
    },
  },
})
</script>
