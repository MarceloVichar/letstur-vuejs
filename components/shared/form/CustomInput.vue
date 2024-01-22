<template>
  <label>
    <span
      v-if="props.label"
      class="text-sm mb-1 ml-2"
      :class="{ 'requiredField': props.required }"
    >{{ props.label }}</span>
    <input
      :value="props.modelValue"
      :readonly="props.readonly"
      :type="props.type"
      class="input input-bordered w-full focus:outline-none"
      :class="{'input-error': Array.isArray(props.errors) && props.errors.length}"
      :placeholder="props.placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    <div
      v-if="Array.isArray(props.errors)"
      class="h-6 text-error text-center text-sm px-2 break-all whitespace-normal text-ellipsis overflow-hidden"
      :title="props.errors[0]"
    >
      {{ props.errors[0] }}
    </div>
  </label>
</template>

<script setup>
defineEmits(['update:modelValue'])
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  errors: {
    type: Array,
    default() {
      return undefined
    },
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    required: false,
    default() {
      return 'text'
    },
  },
  modelValue: {
    type: [String, Number],
    required: false,
    default: '',
  },
})
</script>
