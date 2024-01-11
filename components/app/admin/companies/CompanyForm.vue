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
        placeholder="Nome da empresa"
        label="Nome"
        :errors="useErrorBag(errors, mutableForm.errors, 'name')"
      />
    </VeeField>
    <VeeField
      v-slot="{ field, errors }"
      v-model="mutableForm.data.tradingName"
      name="tradingName"
      rules="required|min:2"
    >
      <CustomInput
        v-bind="field"
        v-model="field.value"
        required
        type="text"
        placeholder="Nome fantasia"
        label="Nome fantasia"
        :errors="useErrorBag(errors, mutableForm.errors, 'tradingName')"
      />
    </VeeField>
    <div class="grid md:grid-cols-2 gap-3">
      <VeeField
        v-slot="{ errors }"
        v-model="mutableForm.data.cnpj"
        name="cnpj"
        rules="required|cnpj"
      >
        <MaskedInput
          v-model="mutableForm.data.cnpj"
          unmasked
          required
          mask="['##.###.###/####-##']"
          type="text"
          placeholder="Cnpj"
          label="Cnpj"
          :errors="useErrorBag(errors, mutableForm.errors, 'cnpj')"
        />
      </VeeField>
      <VeeField
        v-slot="{ field, errors }"
        v-model="mutableForm.data.ie"
        name="ie"
        rules="min:2"
      >
        <CustomInput
          v-bind="field"
          v-model="field.value"
          type="text"
          placeholder="Inscrição estadual"
          label="Inscrição estadual"
          :errors="useErrorBag(errors, mutableForm.errors, 'ie')"
        />
      </VeeField>
    </div>
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
    <div class="grid sm:grid-cols-2 gap-3">
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
          mask="(##) #####-####"
          type="text"
          placeholder="Telefone"
          label="Telefone"
          :errors="useErrorBag(errors, mutableForm.errors, 'phone')"
        />
      </VeeField>
      <VeeField
        v-slot="{ errors }"
        v-model="mutableForm.data.secondaryPhone"
        name="secondaryPhone"
        rules="phone"
      >
        <MaskedInput
          v-model="mutableForm.data.secondaryPhone"
          unmasked
          mask="(##) #####-####"
          type="text"
          placeholder="Telefone 2"
          label="Telefone 2"
          :errors="useErrorBag(errors, mutableForm.errors, 'secondaryPhone')"
        />
      </VeeField>
    </div>
    <div v-if="action === 'create'">
      <div class="grid md:grid-cols-2 gap-3">
        <VeeField
          v-slot="{ field, errors }"
          v-model="mutableForm.data.ownerName"
          name="ownerName"
          rules="required|min:2"
        >
          <CustomInput
            v-bind="field"
            v-model="field.value"
            required
            type="text"
            placeholder="Nome do responsável"
            label="Nome do responsável"
            :errors="useErrorBag(errors, mutableForm.errors, 'ownerName')"
          />
        </VeeField>
        <VeeField
          v-slot="{ field, errors }"
          v-model="mutableForm.data.ownerEmail"
          name="ownerEmail"
          rules="required|email"
        >
          <CustomInput
            v-bind="field"
            v-model="field.value"
            required
            type="email"
            placeholder="Email do responsável"
            label="Email do responsável"
            :errors="useErrorBag(errors, mutableForm.errors, 'ownerEmail')"
          />
        </VeeField>
      </div>
      <div class="grid md:grid-cols-2 gap-3">
        <VeeField
          v-slot="{ field, errors }"
          v-model="mutableForm.data.ownerPassword"
          name="ownerPassword"
          rules="required|min:8"
        >
          <CustomPassInput
            v-bind="field"
            v-model="field.value"
            required
            placeholder="Senha do responsável"
            label="Senha do responsável"
            :errors="useErrorBag(errors, mutableForm.errors, 'ownerPassword')"
          />
        </VeeField>
        <VeeField
          v-slot="{ field, errors }"
          v-model="mutableForm.data.ownerPassword_confirmation"
          name="ownerPassword_confirmation"
          rules="required|confirmed:@ownerPassword"
        >
          <CustomPassInput
            v-bind="field"
            v-model="field.value"
            required
            placeholder="Confirme a senha"
            label="Confirme a senha"
            :errors="useErrorBag(errors, mutableForm.errors, 'ownerPassword_confirmation')"
          />
        </VeeField>
      </div>
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
import CustomPassInput from '~/components/shared/form/CustomPassInput.vue';

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
