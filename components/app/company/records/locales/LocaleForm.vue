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
        v-model="mutableForm.data.responsibleName"
        name="responsibleName"
        rules="required|min:2"
      >
        <CustomInput
          v-bind="field"
          v-model="field.value"
          required
          type="text"
          placeholder="Responsável"
          label="Responsável"
          :errors="useErrorBag(errors, mutableForm.errors, 'responsibleName')"
        />
      </VeeField>
      <VeeField
        v-slot="{ errors }"
        v-model="mutableForm.data.responsiblePhone"
        name="responsiblePhone"
        rules="required|phone"
      >
        <MaskedInput
          v-model="mutableForm.data.responsiblePhone"
          unmasked
          required
          mask="['(##) #####-####', '(##) ####-####']"
          type="text"
          placeholder="Telefone do responsável"
          label="Telefone do responsável"
          :errors="useErrorBag(errors, mutableForm.errors, 'responsiblePhone')"
        />
      </VeeField>
    </div>
    <div>
      <h2 class="text-center">
        Endereço
      </h2>
      <VeeField
        v-slot="{ errors }"
        v-model="mutableForm.data.zipCode"
        name="zipCode"
        rules="min:8|max:8|required"
      >
        <MaskedInput
          v-model="mutableForm.data.zipCode"
          unmasked
          required
          mask="#####-###"
          type="text"
          placeholder="Cep"
          label="Cep"
          :errors="useErrorBag(errors, mutableForm.errors, 'zipCode')"
        />
      </VeeField>
      <p class="text-center text-xs">
        Digite o CEP para preencher o endereço automaticamente, ou
        <span class="text-info cursor-pointer" @click="showAddressFields = true">
          preencha manualmente
        </span>
      </p>
      <div v-if="loadingAddress" class="flex justify-center my-4">
        <Loader />
      </div>
      <div v-if="showAddressFields && !loadingAddress" class="grid md:grid-cols-2 gap-3 my-3">
        <VeeField
          v-slot="{ field, errors }"
          v-model="mutableForm.data.street"
          name="street"
          rules="required|min:2"
        >
          <CustomInput
            v-bind="field"
            v-model="field.value"
            required
            type="text"
            placeholder="Rua"
            label="Rua"
            :errors="useErrorBag(errors, mutableForm.errors, 'street')"
          />
        </VeeField>
        <VeeField
          v-slot="{ errors }"
          v-model="mutableForm.data.number"
          name="number"
          rules="min:1|max:4"
        >
          <MaskedInput
            v-model="mutableForm.data.number"
            unmasked
            mask="####"
            placeholder="Número"
            label="Número"
            :errors="useErrorBag(errors, mutableForm.errors, 'number')"
          />
        </VeeField>
        <VeeField
          v-slot="{ field, errors }"
          v-model="mutableForm.data.complement"
          name="complement"
          rules="min:2"
        >
          <CustomInput
            v-bind="field"
            v-model="field.value"
            type="text"
            placeholder="Complemento"
            label="Complemento"
            :errors="useErrorBag(errors, mutableForm.errors, 'complement')"
          />
        </VeeField>
        <VeeField
          v-slot="{ field, errors }"
          v-model="mutableForm.data.district"
          name="district"
          rules="min:2"
        >
          <CustomInput
            v-bind="field"
            v-model="field.value"
            type="text"
            placeholder="Bairro"
            label="Bairro"
            :errors="useErrorBag(errors, mutableForm.errors, 'district')"
          />
        </VeeField>
        <VeeField
          v-slot="{ field, errors }"
          v-model="mutableForm.data.city"
          name="city"
          rules="min:2|required"
        >
          <CustomInput
            v-bind="field"
            v-model="field.value"
            required
            type="text"
            placeholder="Cidade"
            label="Cidade"
            :errors="useErrorBag(errors, mutableForm.errors, 'city')"
          />
        </VeeField>
        <VeeField
          v-slot="{ errors }"
          v-model="mutableForm.data.uf"
          name="uf"
          rules="min:2|max:2|required"
        >
          <MaskedInput
            v-model="mutableForm.data.uf"
            unmasked
            required
            mask="@@"
            placeholder="UF"
            label="UF"
            :errors="useErrorBag(errors, mutableForm.errors, 'uf')"
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
import cep from 'cep-promise'
import Loader from '~/components/shared/Loader.vue';

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

const showAddressFields = ref(false)
const loadingAddress = ref(false)

const form = _cloneDeep(props.modelValue)
const mutableForm = reactive(form)

onMounted(() => {
  if (props.action === 'edit') {
    showAddressFields.value = true
  }
})

watch(
  () => props.modelValue,
  (newValue) => {
    Object.assign(mutableForm, newValue)
  },
  { immediate: true, deep: true },
)

watch(() => mutableForm.data?.zipCode, _debounce((val) => {
  if (val?.length === 8) getAddress(val)
}, 50))

const getAddress = (zipCode) => {
  loadingAddress.value = true
  cep(zipCode.toString())
    .then((response) => {
      mutableForm.data.street = response?.street
      mutableForm.data.district = response?.neighborhood
      mutableForm.data.city = response?.city
      mutableForm.data.uf = response?.state
      mutableForm.data.complement = ''
      mutableForm.data.number = ''
    })
    .catch(() => {
      useNotify('warning', 'Ops! Cep não encontrado')
    })
    .finally(() => {
      loadingAddress.value = false
      showAddressFields.value = true
    })
}

const onSubmit = () => {
  if (props.sending) return
  emit('update:modelValue', mutableForm)
  emit('submit')
}
</script>
