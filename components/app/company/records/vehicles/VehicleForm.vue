<template>
  <VeeForm v-slot="{ meta }" class="grid p-1 gap-1 w-full" @submit="onSubmit">
    <VeeField
      v-slot="{ field, errors }"
      v-model="mutableForm.data.model"
      name="model"
      rules="required|min:2"
    >
      <CustomInput
        v-bind="field"
        v-model="field.value"
        required
        type="text"
        placeholder="Modelo"
        label="Modelo"
        :errors="useErrorBag(errors, mutableForm.errors, 'model')"
      />
    </VeeField>
    <div class="grid md:grid-cols-2 gap-3">
      <VeeField
        v-slot="{ errors }"
        v-model="mutableForm.data.licensePlate"
        name="licensePlate"
        rules="required|licensePlate"
      >
        <MaskedInput
          v-model="mutableForm.data.licensePlate"
          unmasked
          required
          mask="@@@-#*##"
          type="text"
          placeholder="Placa"
          label="Placa"
          :errors="useErrorBag(errors, mutableForm.errors, 'licensePlate')"
        />
      </VeeField>
      <VeeField
        v-slot="{ field, errors }"
        v-model="mutableForm.data.type"
        name="type"
        rules="required"
      >
        <CustomSelect
          v-bind="field"
          v-model="field.value"
          required
          label="Tipo de veículo"
          hide-all-option
          :items="vehicleTypes"
          label-field="label"
          value-field="value"
          index-field="value"
          :errors="useErrorBag(errors, mutableForm.errors, 'type')"
        />
      </VeeField>
      <VeeField
        v-slot="{ field, errors }"
        v-model="mutableForm.data.cnhTypeRequired"
        name="cnhTypeRequired"
        rules="required"
      >
        <CustomSelect
          v-bind="field"
          v-model="field.value"
          required
          label="CNH requerida"
          hide-all-option
          :items="cnhTypesArray"
          :errors="useErrorBag(errors, mutableForm.errors, 'cnhTypeRequired')"
        />
      </VeeField>
      <VeeField
        v-slot="{ field, errors }"
        v-model="mutableForm.data.numberOfSeats"
        name="numberOfSeats"
        rules="required|min_value:1|max_value:150"
      >
        <CustomInput
          v-bind="field"
          v-model="field.value"
          required
          type="number"
          placeholder="Número de assentos"
          label="Número de assentos"
          :errors="useErrorBag(errors, mutableForm.errors, 'numberOfSeats')"
        />
      </VeeField>
    </div>
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
          placeholder="Nome do proprietário"
          label="Proprietário"
          :errors="useErrorBag(errors, mutableForm.errors, 'ownerName')"
        />
      </VeeField>
      <VeeField
        v-slot="{ errors }"
        v-model="mutableForm.data.ownerDocument"
        name="ownerDocument"
        rules="required|document"
      >
        <MaskedInput
          v-model="mutableForm.data.ownerDocument"
          unmasked
          required
          mask="['##.###.###/####-##', '###.###.###-##']"
          type="text"
          placeholder="Documento do proprietário"
          label="Documento do proprietário"
          :errors="useErrorBag(errors, mutableForm.errors, 'ownerDocument')"
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
          placeholder="Email do proprietário"
          label="Email do proprietário"
          :errors="useErrorBag(errors, mutableForm.errors, 'ownerEmail')"
        />
      </VeeField>
      <VeeField
        v-slot="{ errors }"
        v-model="mutableForm.data.ownerPhone"
        name="ownerPhone"
        rules="required|phone"
      >
        <MaskedInput
          v-model="mutableForm.data.ownerPhone"
          unmasked
          required
          mask="['(##) #####-####', '(##) ####-####']"
          placeholder="Telefone do proprietário"
          label="Telefone do proprietário"
          :errors="useErrorBag(errors, mutableForm.errors, 'ownerPhone')"
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
import {vehicleTypes} from '~/data/objects';

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

const onSubmit = () => {
  if (props.sending) return
  emit('update:modelValue', mutableForm)
  emit('submit')
}
</script>
