<template>
  <label>
    <span
      v-if="props.label"
      class="text-sm mb-1 ml-2"
      :class="{ 'requiredField': props.required }"
    >{{ props.label }}</span>
    <Money3
      v-model="mutableValue"
      v-bind="config"
      :readonly="props.readonly"
      class="input input-bordered w-full focus:outline-none"
      :class="{'input-error': Array.isArray(props.errors) && props.errors.length}"
    />
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
import {Money3} from 'v-money3';

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  label: {
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
  modelValue: {
    type: [String, Number],
    required: false,
    default: '',
  },
})

const mutableValue = ref(props.modelValue)
const isExternalChange = ref(false)

watch(
  () => props.modelValue,
  (val) => {
    isExternalChange.value = true
    mutableValue.value ? mutableValue.value = val / 100 : mutableValue.value = val
    setTimeout(() => {
      isExternalChange.value = false
    }, 50)
  },
  { immediate: true },
)

watch(
  () => mutableValue.value,
  _debounce(() => {
    if (isExternalChange.value) return
    if (mutableValue.value * 100 !== props.modelValue) {
      emit('update:modelValue', mutableValue.value * 100)
    }
  }, 10),
)

onMounted(() => {
  if(props.modelValue) {
    mutableValue.value = props.modelValue / 100
  }
})

const config = {
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  decimal: ',',
  precision: 2,
}
</script>
