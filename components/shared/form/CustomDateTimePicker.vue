<template>
  <DatePicker
    :model-value="modelValue"
    locale="pt"
    :popover="{ visibility: 'focus' }"
    :min-date="minDate"
    :max-date="maxDate"
    mode="dateTime"
    :is-dark="colorMode?.value === 'darkTheme'"
    is24hr
    hide-time-header

    @update:modelValue="updateValue"
  >
    <template #default="{ inputValue, inputEvents }">
      <label>
        <span
          v-if="label"
          class="text-sm mb-1 ml-2"
          :class="{ 'requiredField': required }"
        >{{ label }}</span>
        <input
          :value="inputValue"
          readonly
          class="input input-bordered w-full focus:outline-none"
          :class="{'input-error': Array.isArray(errors) && errors.length}"
          :placeholder="placeholder"
          v-on="inputEvents"
        >
        <div
          v-if="Array.isArray(errors)"
          class="h-6 text-error text-center text-sm px-2 break-all whitespace-normal text-ellipsis overflow-hidden"
          :title="errors[0]"
        >
          {{ errors[0] }}
        </div>
      </label>
    </template>
  </DatePicker>
</template>

<script setup>
import 'v-calendar/style.css';
import {DatePicker} from 'v-calendar';

const colorMode = useColorMode();

defineProps({
  modelValue: {
    type: [String, Number, Date],
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  errors: {
    type: Array,
    default() {
      return []
    },
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  minDate: {
    type: [String, Date],
    default() {
      return null
    },
  },
  maxDate: {
    type: [String, Date],
    default() {
      return null
    },
  },
})

const emit = defineEmits(['update:modelValue'])

const updateValue = _debounce((value) => {
  const date = useDayjs()(value).toString()
  emit('update:modelValue', useDayjs()(date).toISOString())
}, 100)

</script>

<style>
.vc-popover-content-wrapper {
  z-index: 30;
}
</style>
