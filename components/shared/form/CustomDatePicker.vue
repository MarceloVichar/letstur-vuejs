<template>
  <div>
    <DatePicker
      v-model="mutableModel"
      locale="pt"
      :popover="{ visibility: 'focus' }"
      :min-date="minDate"
      :max-date="maxDate"
      :is-dark="colorMode?.value === 'darkTheme'"
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
  </div>
</template>

<script setup>
import 'v-calendar/style.css';
import {DatePicker} from 'v-calendar';

const colorMode = useColorMode();

const props = defineProps({
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
      return null
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
  endOfDay: {
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

const mutableModel = ref(props.modelValue)

watch(
  () => mutableModel.value,
  () => {
    updateValue()
  })

const updateValue = () => {
  const value = useDayjs()(mutableModel.value).toString()
  if (props.endOfDay) {
    emit('update:modelValue', useDayjs()(value).endOf('day').toISOString())
  } else {
    emit('update:modelValue', useDayjs()(value).toISOString())
  }
}
</script>

<style>
.vc-popover-content-wrapper {
  z-index: 30;
}
</style>
