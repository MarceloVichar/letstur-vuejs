<template>
  <div>
    <span
      v-if="props.label"
      class="text-sm mb-1 ml-2"
      :class="{ 'requiredField': props.required }"
    >{{ props.label }}</span>

    <select
      :value="props.modelValue"
      :disabled="props.disabled"
      class="select select-bordered w-full focus:outline-none"
      :class="{'select-error': Array.isArray(props.errors) && props.errors.length, 'select-sm': props.size === 'sm' }"
      @change="onChange"
    >
      <option v-if="!props.hideAllOption" value="" label="Todos(as)" />
      <option
        v-for="(item, i) in props.items"
        :key="props.indexField ? item[props.indexField] : i"
        :label="props.labelField ? item[props.labelField] : item"
        :value="props.valueField ? item[props.valueField] : item"
      >
        {{ props.labelField ? item[props.labelField] : item }}
      </option>
    </select>
    <div v-if="Array.isArray(props.errors)" class="h-6 text-error text-center text-sm px-2 break-all whitespace-normal text-ellipsis overflow-hidden">
      {{ props.errors[0] }}
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  size: {
    type: String,
    default: 'md',
  },
  label: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  hideAllOption: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Number, Boolean],
    required: true,
    default () {
      return ''
    },
  },
  items: {
    type: Array,
    required: true,
    default () {
      return []
    },
  },
  indexField: {
    type: String,
    required: false,
    default () {
      return ''
    },
  },
  valueField: {
    type: String,
    required: false,
    default () {
      return ''
    },
  },
  labelField: {
    type: String,
    required: false,
    default () {
      return ''
    },
  },
  errors: {
    type: Array,
    default () {
      return undefined
    },
  },
})

const emit = defineEmits(['update:modelValue']);

function onChange (event) {
  emit('update:modelValue', event.target.value)
}
</script>
