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
        v-model="mutableForm.data.cnh"
        name="cnh"
        rules="required|min:2"
      >
        <CustomInput
          v-bind="field"
          v-model="field.value"
          required
          type="text"
          placeholder="Cnh"
          label="Cnh"
          :errors="useErrorBag(errors, mutableForm.errors, 'cnh')"
        />
      </VeeField>
      <VeeField
        v-slot="{ field, errors }"
        v-model="mutableForm.data.cnhType"
        name="cnhType"
        rules="required"
      >
        <CustomSelect
          v-bind="field"
          v-model="field.value"
          required
          label="Tipo de CNH"
          hide-all-option
          :items="cnhTypesArray"
          :errors="useErrorBag(errors, mutableForm.errors, 'cnhType')"
        />
      </VeeField>
    </div>
    <div class="grid md:grid-cols-2 gap-3">
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
    </div>
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
          mask="['(##) #####-####', '(##) ####-####']"
          type="text"
          placeholder="Telefone"
          label="Telefone"
          :errors="useErrorBag(errors, mutableForm.errors, 'phone')"
        />
      </VeeField>
      <VeeField
        v-slot="{ field, errors }"
        v-model="mutableForm.data.dateOfBirth"
        name="dateOfBirth"
        rules="required"
      >
        <CustomDatePicker
          v-bind="field"
          v-model="field.value"
          required
          :max-date="maxDate"
          placeholder="Data de nascimento"
          label="Data de nascimento"
          :errors="useErrorBag(errors, mutableForm.errors, 'dateOfBirth')"
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
import CustomSelect from '~/components/shared/form/CustomSelect.vue';
import MaskedInput from '~/components/shared/form/MaskedInput.vue';
import {CnhTypesEnum} from '~/enums/CnhTypesEnum';
import CustomDatePicker from '~/components/shared/form/CustomDatePicker.vue';

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

const cnhTypesArray = Object.values(CnhTypesEnum)

const maxDate = useDayjs()().subtract(18, 'year').format('YYYY-MM-DD')

const onSubmit = () => {
  if (props.sending) return
  emit('update:modelValue', mutableForm)
  emit('submit')
}
</script>
