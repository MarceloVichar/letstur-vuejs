<template>
  <VeeForm v-slot="{ meta }" class="grid p-1 gap-1 w-full" @submit="onSubmit">
    <div class="grid md:grid-cols-2 gap-3">
      <VeeField
        v-slot="{ field, errors }"
        v-model="mutableForm.data.customer.name"
        name="customer.name"
        rules="required|min:2"
      >
        <CustomInput
          v-bind="field"
          v-model="field.value"
          required
          type="text"
          placeholder="Nome do cliente"
          label="Cliente"
          :errors="useErrorBag(errors, mutableForm.errors, 'customer.name')"
        />
      </VeeField>
      <VeeField
        v-slot="{ errors }"
        v-model="mutableForm.data.customer.document"
        name="customer.document"
        rules="required|document"
      >
        <MaskedInput
          v-model="mutableForm.data.customer.document"
          unmasked
          required
          mask="['##.###.###/####-##', '###.###.###-##']"
          type="text"
          placeholder="Documento"
          label="Documento"
          :errors="useErrorBag(errors, mutableForm.errors, 'customer.document')"
        />
      </VeeField>
      <VeeField
        v-slot="{ field, errors }"
        v-model="mutableForm.data.customer.email"
        name="customer.email"
        rules="required|email"
      >
        <CustomInput
          v-bind="field"
          v-model="field.value"
          required
          type="email"
          placeholder="Email"
          label="Email"
          :errors="useErrorBag(errors, mutableForm.errors, 'customer.email')"
        />
      </VeeField>
      <VeeField
        v-slot="{ errors }"
        v-model="mutableForm.data.customer.phone"
        name="customer.phone"
        rules="phone"
      >
        <MaskedInput
          v-model="mutableForm.data.customer.phone"
          unmasked
          mask="['(##) #####-####', '(##) ####-####']"
          placeholder="Telefone"
          label="Telefone"
          :errors="useErrorBag(errors, mutableForm.errors, 'customer.phone')"
        />
      </VeeField>
    </div>
    <p class="text-sm">
      (<span class="text-error">*</span>) Campo obrigatório
    </p>
    <div class="flex justify-between gap-2 my-4">
      <button class="btn" @click="emit('previousStep')">
        Voltar
      </button>
      <SubmitButton
        :disabled="!meta.valid"
        :loading="props.sending"
        type="submit"
        class="btn btn-primary"
      >
        Avançar
      </SubmitButton>
    </div>
  </VeeForm>
</template>

<script setup>
import CustomInput from '~/components/shared/form/CustomInput.vue';
import SubmitButton from '~/components/shared/form/SubmitButton.vue';
import MaskedInput from '~/components/shared/form/MaskedInput.vue';

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

const emit = defineEmits(['nextStep', 'previousStep', 'update:modelValue'])

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
  emit('nextStep')
}
</script>
