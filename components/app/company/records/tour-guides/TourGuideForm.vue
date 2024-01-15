<template>
  <VeeForm v-slot="{ meta }" class="grid p-1 gap-1 w-full" @submit="onSubmit">
    <div class="grid md:grid-cols-2 gap-3">
      <VeeField
        v-slot="{ field, errors }"
        v-model="mutableForm.data.name"
        name="name"
        rules="required|min:2"
      >
        <CustomInput
          v-bind="field"
          v-model="field.value"
          required
          type="text"
          placeholder="Nome"
          label="Nome"
          :errors="useErrorBag(errors, mutableForm.errors, 'name')"
        />
      </VeeField>
      <VeeField
        v-slot="{ errors }"
        v-model="mutableForm.data.document"
        name="document"
        rules="required|document"
      >
        <MaskedInput
          v-model="mutableForm.data.document"
          unmasked
          required
          mask="['##.###.###/####-##', '###.###.###-##']"
          type="text"
          placeholder="Documento"
          label="Documento"
          :errors="useErrorBag(errors, mutableForm.errors, 'document')"
        />
      </VeeField>
      <VeeField
        v-slot="{ field, errors }"
        v-model="mutableForm.data.email"
        name="email"
        rules="required|email"
      >
        <CustomInput
          v-bind="field"
          v-model="field.value"
          required
          type="email"
          placeholder="Email"
          label="Email"
          :errors="useErrorBag(errors, mutableForm.errors, 'email')"
        />
      </VeeField>
      <VeeField
        v-slot="{ errors }"
        v-model="mutableForm.data.phone"
        name="phone"
        rules="required|phone"
      >
        <MaskedInput
          v-model="mutableForm.data.phone"
          unmasked
          required
          mask="['(##) #####-####', '(##) ####-####']"
          type="text"
          placeholder="Telefone"
          label="Telefone"
          :errors="useErrorBag(errors, mutableForm.errors, 'phone')"
        />
      </VeeField>
    </div>
    <p class="text-sm">
      (<span class="text-error">*</span>) Campo obrigatório
    </p>
    <div class="text-center my-4">
      <SubmitButton
        :disabled="!meta.valid"
        :loading="props.sending"
        type="submit"
        class="btn btn-primary"
      >
        Salvar
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
</script>
