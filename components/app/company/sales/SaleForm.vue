<template>
  <div>
    <div class="flex justify-start sm:justify-center">
      <ul class="steps steps-vertical sm:steps-horizontal">
        <li
          v-for="(step, index) in steps"
          :key="step.title"
          class="step"
          :class="{'step-primary': currentStepIndex >= index}"
        >
          {{ step.title }}
        </li>
      </ul>
    </div>
    <section class="mt-6">
      <component
        :is="currentStep.component"
        v-model="mutableForm"
        :sending="sending"
        @nextStep="currentStepIndex++"
        @previousStep="currentStepIndex--"
        @onSubmit="onSubmit"
      />
    </section>
  </div>
</template>

<script setup>

import EventsStep from '~/components/app/company/sales/form-steps/EventsStep.vue';
import CustomerStep from '~/components/app/company/sales/form-steps/CustomerStep.vue';
import PassengersStep from '~/components/app/company/sales/form-steps/PassengersStep.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  sending: {
    type: Boolean,
    default: false,
  },
  action: {
    type: String,
    default: 'create',
  },
})

const emit = defineEmits(['submit', 'update:modelValue'])

const form = _cloneDeep(props.modelValue)
const mutableForm = reactive(form)
const currentStepIndex = ref(0)

const steps = [
  { title: 'Passeios', component: EventsStep },
  { title: 'Cliente', component: CustomerStep },
  { title: 'Passageiros', component: PassengersStep },
]

const currentStep = computed(() => steps[currentStepIndex.value])

watch(
  () => props.modelValue,
  (newValue) => {
    Object.assign(mutableForm, newValue)
  },
  { immediate: true, deep: true },
)

watch(() => props.modelValue?.errors, (newValue) => {
  const hasEventSalesErrors = Object.keys(newValue).find((key) => key.startsWith('eventSales'))
  if (hasEventSalesErrors) {
    currentStepIndex.value = 0
  }
  const hasCustomerErrors = Object.keys(newValue).find((key) => key.startsWith('customer'))
  if (hasCustomerErrors) {
    currentStepIndex.value = 1
  }
}, { deep: true })

const onSubmit = () => {
  if (props.sending) return
  emit('update:modelValue', mutableForm)
  emit('submit')
}
</script>
