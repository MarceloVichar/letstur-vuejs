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
import CompanyService from '~/services/api/admin/CompanyService';
import {UserRolesEnum} from '~/enums/UserRolesEnum';

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
const companies = ref([])

watch(
  () => props.modelValue,
  (newValue) => {
    Object.assign(mutableForm, newValue)
  },
  { immediate: true, deep: true },
)

watch(() => mutableForm?.data?.role, (newValue) => {
  if (newValue === UserRolesEnum.ADMIN) {
    mutableForm.data.companyId = ''
  }
})

onMounted(() => {
  getCompanies()
})

function getCompanies() {
  return new CompanyService().index({ perPage: 100})
    .then((response) => {
      companies.value = response.data
      console.log(response.data)
    })
    .catch(() => {
      useNotify('error', 'Não foi possível carregas as empresas')
    })
}

const onSubmit = () => {
  if (props.sending) return
  emit('update:modelValue', mutableForm)
  emit('submit')
}
</script>
