<template>
  <VeeForm v-slot="{ meta }" class="flex justify-end items-center gap-2 w-full" @submit="onSubmit">
    <VeeField
      v-slot="{ field, errors }"
      v-model="mutableForm.startDate"
      name="startDate"
      :rules="() => ({ required: true, minDate: minDate, maxDate: mutableForm.endDate })"
    >
      <CustomDatePicker
        v-bind="field"
        v-model="field.value"
        required
        class="w-full md:w-56"
        :max-date="mutableForm.endDate || null"
        placeholder="Data inicial"
        label="A partir de"
        :errors="errors"
      />
    </VeeField>
    <VeeField
      v-slot="{ field, errors }"
      v-model="mutableForm.endDate"
      name="endDate"
      :rules="() => ({ required: true, minDate: mutableForm.startDate, maxDate: maxDate })"
    >
      <CustomDatePicker
        v-bind="field"
        v-model="field.value"
        required
        class="w-full md:w-56"
        :min-date="mutableForm.startDate || null"
        :max-date="maxDate"
        end-of-day
        placeholder="Data final"
        label="Até"
        :errors="errors"
      />
    </VeeField>
    <button
      :disabled="!meta.valid || !datesAreValid"
      type="submit"
      class="btn btn-primary"
    >
      Buscar
    </button>
  </VeeForm>
</template>

<script setup>
import CustomDatePicker from '~/components/shared/form/CustomDatePicker.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['submit', 'update:modelValue'])

const form = _cloneDeep(props.modelValue)
const mutableForm = reactive(form)

watch(
  () => props.modelValue,
  (newValue) => {
    Object.assign(mutableForm, newValue)
  },
  { immediate: true, deep: true },
)

const onSubmit = () => {
  if (props.sending) return
  emit('update:modelValue', mutableForm)
  emit('submit')
}
const minDate = computed(() => {
  return mutableForm.endDate ? useDayjs()(mutableForm.endDate).subtract(31, 'day').toISOString() : undefined
})

const maxDate = computed(() => {
  return mutableForm.startDate ? useDayjs()(mutableForm.startDate).add(31, 'day').toISOString() : undefined
})

const datesAreValid = computed(() => {
  const startDate = useDayjs()(mutableForm.startDate)
  const endDate = useDayjs()(mutableForm.endDate)
  return startDate.diff(endDate, 'day') <= 31 && endDate.diff(startDate, 'day') <= 31
})

</script>
