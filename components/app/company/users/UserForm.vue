<template>
  <VeeForm v-slot="{ meta }" class="grid p-1 gap-1 w-full" @submit="onSubmit">
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
    <div class="grid md:grid-cols-2 gap-3">
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
        v-slot="{ field, errors }"
        v-model="mutableForm.data.role"
        name="role"
        rules="required"
      >
        <CustomSelect
          v-bind="field"
          v-model="field.value"
          required
          type="email"
          label="Função"
          hide-all-option
          :items="companyUserRoles"
          label-field="label"
          value-field="value"
          index-field="value"
          :errors="useErrorBag(errors, mutableForm.errors, 'roles')"
        />
      </VeeField>
    </div>
    <div v-if="action === 'create'" class="grid md:grid-cols-2 gap-3">
      <VeeField
        v-slot="{ field, errors }"
        v-model="mutableForm.data.password"
        name="password"
        rules="required|min:8"
      >
        <CustomPassInput
          v-bind="field"
          v-model="field.value"
          required
          placeholder="Senha"
          label="Senha"
          :errors="useErrorBag(errors, mutableForm.errors, 'password')"
        />
      </VeeField>
      <VeeField
        v-slot="{ field, errors }"
        v-model="mutableForm.data.password_confirmation"
        name="password_confirmation"
        rules="required|confirmed:@password"
      >
        <CustomPassInput
          v-bind="field"
          v-model="field.value"
          required
          placeholder="Confirme a senha"
          label="Confirme a senha"
          :errors="useErrorBag(errors, mutableForm.errors, 'password_confirmation')"
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
import CustomPassInput from '~/components/shared/form/CustomPassInput.vue';
import CustomSelect from '~/components/shared/form/CustomSelect.vue';
import {companyUserRoles} from '~/data/objects';

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
