<template>
  <div>
    <button
      class="btn btn-ghost"
      @click="$emit('openSidebar')"
    >
      <Icon name="ic:baseline-list" class="text-5xl" />
    </button>
  </div>
</template>

<script>
export default {
  emits: ['openSidebar'],
};
</script>
