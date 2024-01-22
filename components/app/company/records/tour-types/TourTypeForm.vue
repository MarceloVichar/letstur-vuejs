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
        v-slot="{ field, errors }"
        v-model="mutableForm.data.color"
        name="color"
        rules=""
      >
        <CustomColorInput
          v-bind="field"
          v-model="field.value"
          label="Cor"
          :errors="useErrorBag(errors, mutableForm.errors, 'color')"
        />
      </VeeField>
      <label class="label cursor-pointer border-b border-base-content">
        <span class="label-text">Transfer</span>
        <input v-model="mutableForm.data.isTransfer" type="checkbox" class="checkbox checkbox-primary">
      </label>
      <label class="label cursor-pointer border-b border-base-content">
        <span class="label-text">Exclusivo</span>
        <input v-model="mutableForm.data.isExclusive" type="checkbox" class="checkbox checkbox-primary">
      </label>
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
import CustomColorInput from '~/components/shared/form/CustomColorInput.vue';

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
