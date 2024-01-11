<template>
  <input
    type="text"
    :value="props.modelValue"
    class="input input-bordered w-full"
    :placeholder="placeholder"
    @input="update($event.target.value)"
  >
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Pesquisar',
  },
})

const emit = defineEmits(['update:modelValue'])

const update = _debounce((event) => {
  emit('update:modelValue', event)
}, 300)

</script>
