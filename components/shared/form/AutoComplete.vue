<template>
  <div>
    <span
      v-if="props.label"
      class="text-sm mb-1 ml-2"
      :class="{ 'requiredField': props.required }"
    >{{ props.label }}</span>
    <VSelect
      :model-value="modelValue"
      :options="items"
      class="input-error"
      placeholder="Digite para pesquisar"
      :filterable="filterable"
      :reduce="(opt) => valueField ? opt[valueField] : opt"
      :label="labelField ? labelField : null"
      @update:modelValue="onChange"
      @search="onSearch"
    />
    <div
      v-if="Array.isArray(props.errors)"
      class="h-6 text-error text-center text-sm px-2 break-all whitespace-normal text-ellipsis overflow-hidden"
    >
      {{ props.errors[0] }}
    </div>
  </div>
</template>

<script setup>
import VSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

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
  modelValue: {
    type: [String, Number, Boolean],
    required: true,
    default() {
      return ''
    },
  },
  items: {
    type: Array,
    required: true,
    default() {
      return []
    },
  },
  valueField: {
    type: String,
    required: false,
    default() {
      return ''
    },
  },
  labelField: {
    type: String,
    required: false,
    default() {
      return ''
    },
  },
  errors: {
    type: Array,
    default() {
      return undefined
    },
  },
  filterable: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'search'])

function onSearch(search, loading) {
  emit('search', search, loading)
}

function onChange(value) {
  emit('update:modelValue', value)
}
</script>

<style lang="postcss">
.vs__dropdown-toggle {
  @apply input input-bordered w-full focus:outline-none;
}

.vs__selected-options {
  @apply p-0 overflow-hidden;
}

.vs__selected {
  @apply p-0 text-current;
}

.vs__dropdown-menu {
  @apply bg-base-100 absolute top-14 overflow-x-hidden;
}

.vs__search::placeholder {
  @apply text-current opacity-70;
}

.vs--single.vs--open .vs__selected {
  @apply inset-0;
}

.vs__actions {
  @apply gap-2 p-0;
}

:root {
  --vs-dropdown-option--active-bg: theme('colors.primary');
}

</style>
