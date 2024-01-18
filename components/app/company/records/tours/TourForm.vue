<template>
  <VeeForm v-slot="{ meta, errors }" class="grid p-1 gap-1 w-full" @submit="onSubmit">
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
        v-model="mutableForm.data.roundTrip"
        name="roundTrip"
        rules="required|integer|min_value:0"
      >
        <CustomInput
          v-bind="field"
          v-model="field.value"
          required
          type="number"
          placeholder="Distância (Em Km)"
          label="Distância (Em Km)"
          :errors="useErrorBag(errors, mutableForm.errors, 'roundTrip')"
        />
      </VeeField>
      <VeeField
        v-slot="{ field, errors }"
        v-model="mutableForm.data.priceCents"
        name="priceCents"
        rules="required|min_value:0"
      >
        <CustomMoneyInput
          v-model="field.value"
          required
          type="text"
          label="Preço"
          :errors="useErrorBag(errors, mutableForm.errors, 'priceCents')"
        />
      </VeeField>
    </div>
    <VeeField
      v-slot="{ field, errors }"
      v-model="mutableForm.data.note"
      name="note"
      rules="min:2|max:255"
    >
      <CustomInput
        v-bind="field"
        v-model="field.value"
        type="text"
        placeholder="Observação"
        label="Observação"
        :errors="useErrorBag(errors, mutableForm.errors, 'note')"
      />
    </VeeField>
    <div class="grid md:grid-cols-2 md:gap-3">
      <VeeField
        v-slot="{ errors }"
        v-model="mutableForm.data.localeId"
        name="localeId"
        rules="required"
      >
        <AutoComplete
          v-model="mutableForm.data.localeId"
          required
          label-field="name"
          value-field="id"
          label="Local"
          :items="locales"
          :errors="useErrorBag(errors, mutableForm.errors, 'localeId')"
          @search="(search, loading) => searchLocales(search, loading)"
        />
      </veefield>
      <VeeField
        v-slot="{ field, errors }"
        v-model="mutableForm.data.tourTypeId"
        name="tourTypeId"
        rules="required"
      >
        <CustomSelect
          v-bind="field"
          v-model="field.value"
          required
          label="Tipo de passeio"
          hide-all-option
          :items="tourTypes"
          index-field="id"
          value-field="id"
          label-field="name"
          :errors="useErrorBag(errors, mutableForm.errors, 'tourTypeId')"
        />
      </veefield>
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
import CustomMoneyInput from '~/components/shared/form/CustomMoneyInput.vue';
import LocaleService from '~/services/api/company/records/locale/LocaleService';
import TourTypeService from '~/services/api/company/records/tour-type/TourTypeService';
import CustomSelect from '~/components/shared/form/CustomSelect.vue';
import AutoComplete from '~/components/shared/form/AutoComplete.vue';

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

const locales = ref([])
const tourTypes = ref([])

onMounted(async () => {
  await fetchLocales({ 'filter[id]': mutableForm.data.localeId })
  await fetchTourTypes()
})

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

const searchLocales = _debounce(async (search, loading) => {
  loading(true)
  await fetchLocales({ 'filter[name]': search })
  loading(false)
}, 500)

async function fetchLocales(params) {
  return await new LocaleService().index(params)
    .then((response) => {
      locales.value = response.data
    })
    .catch(() => {
      useNotify('warning', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    })
}

async function fetchTourTypes() {
  return await new TourTypeService().index({ perPage: 100, 'filter[isTransfer]': false})
    .then((response) => {
      tourTypes.value = response.data
    })
    .catch(() => {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    })
}
</script>
