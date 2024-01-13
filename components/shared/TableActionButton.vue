<template>
  <div
    class="tooltip tooltip-left cursor-pointer"
    :data-tip="label"
    :class="actionClasses"
    @click="emit('onClick')"
  >
    <Icon class="text-2xl lg:text-lg" :name="icon" :class="actionClasses" />
  </div>
</template>

<script setup>

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['onClick'])

const actionClasses = computed(() => {
  switch (props.type) {
    case 'error':
      return 'text-error lg:text-current hover:text-error'
    case 'warning':
      return 'text-warning lg:text-current hover:text-warning'
    case 'success':
      return 'text-success lg:text-current hover:text-success'
    case 'info':
      return 'text-info lg:text-current hover:text-info'
    case 'primary':
      return 'text-primary lg:text-current hover:text-primary'
    default:
      return ''
  }
})
</script>
