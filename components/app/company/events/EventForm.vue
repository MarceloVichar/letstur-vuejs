<template>
  <VeeForm v-slot="{ meta }" class="grid p-1 gap-1 w-full" @submit="onSubmit">
    <div class="grid md:grid-cols-2 md:gap-3">
      <VeeField
        v-slot="{ errors }"
        v-model="mutableForm.data.tourId"
        name="tourId"
        rules="required"
      >
        <AutoComplete
          v-model="mutableForm.data.tourId"
          required
          label-field="name"
          value-field="id"
          label="Passeio"
          :items="tours"
          :errors="useErrorBag(errors, mutableForm.errors, 'tourId')"
          @search="(search, loading) => searchTours(search, loading)"
        />
      </veefield>
      <VeeField
        v-slot="{ errors }"
        v-model="mutableForm.data.vehicleId"
        name="vehicleId"
        rules="required"
      >
        <AutoComplete
          v-model="mutableForm.data.vehicleId"
          required
          label-field="model"
          value-field="id"
          label="Veículo"
          :items="vehicles"
          :errors="useErrorBag(errors, mutableForm.errors, 'vehicleId')"
          @search="(search, loading) => searchVehicles(search, loading)"
        />
      </veefield>
      <VeeField
        v-slot="{ errors }"
        v-model="mutableForm.data.driverId"
        name="driverId"
        rules="required"
      >
        <AutoComplete
          v-model="mutableForm.data.driverId"
          required
          label-field="name"
          value-field="id"
          label="Motorista"
          :items="drivers"
          :errors="useErrorBag(errors, mutableForm.errors, 'driverId')"
          @search="(search, loading) => searchDrivers(search, loading)"
        />
      </veefield>
      <VeeField
        v-slot="{ errors }"
        v-model="mutableForm.data.tourGuideId"
        name="tourGuideId"
        rules="required"
      >
        <AutoComplete
          v-model="mutableForm.data.tourGuideId"
          required
          label-field="name"
          value-field="id"
          label="Guia de passeio"
          :items="tourGuides"
          :errors="useErrorBag(errors, mutableForm.errors, 'tourGuideId')"
          @search="(search, loading) => searchTourGuides(search, loading)"
        />
      </veefield>
      <VeeField
        v-slot="{ field, errors }"
        v-model="mutableForm.data.departureDateTime"
        name="departureDateTime"
        rules="required"
      >
        <CustomDateTimePicker
          v-bind="field"
          v-model="field.value"
          required
          :min-date="new Date()"
          placeholder="Partida"
          label="Partida"
          :errors="useErrorBag(errors, mutableForm.errors, 'departureDateTime')"
        />
      </VeeField>
      <VeeField
        v-slot="{ field, errors }"
        v-model="mutableForm.data.arrivalDateTime"
        name="arrivalDateTime"
        rules="required"
      >
        <CustomDateTimePicker
          v-bind="field"
          v-model="field.value"
          required
          :min-date="mutableForm.data?.departureDateTime"
          placeholder="Chegada"
          label="Chegada"
          :errors="useErrorBag(errors, mutableForm.errors, 'arrivalDateTime')"
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
import SubmitButton from '~/components/shared/form/SubmitButton.vue';
import TourService from '~/services/api/company/records/tour/TourService';
import AutoComplete from '~/components/shared/form/AutoComplete.vue';
import DriverService from '~/services/api/company/records/driver/DriverService';
import VehicleService from '~/services/api/company/records/vehicle/VehicleService';
import TourGuideService from '~/services/api/company/records/tour-guide/TourGuideService';
import CustomDateTimePicker from '~/components/shared/form/CustomDateTimePicker.vue';

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

const tours = ref([])
const drivers = ref([])
const vehicles = ref([])
const tourGuides = ref([])

onMounted(async () => {
  await fetchTours({ 'filter[id]': mutableForm.data.tourId })
  await fetchDrivers({ 'filter[id]': mutableForm.data.driverId })
  await fetchVehicles({ 'filter[id]': mutableForm.data.vehicleId })
  await fetchTourGuides({ 'filter[id]': mutableForm.data.tourGuideId })
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

const searchTours = _debounce(async (search, loading) => {
  loading(true)
  await fetchTours({ 'filter[name]': search })
  loading(false)
}, 500)

const searchDrivers = _debounce(async (search, loading) => {
  loading(true)
  await fetchDrivers({ 'filter[name]': search })
  loading(false)
}, 500)

const searchVehicles = _debounce(async (search, loading) => {
  loading(true)
  await fetchVehicles({ 'filter[model]': search })
  loading(false)
}, 500)

const searchTourGuides = _debounce(async (search, loading) => {
  loading(true)
  await fetchTourGuides({ 'filter[name]': search })
  loading(false)
}, 500)

async function fetchTours(params) {
  return await new TourService().index(params)
    .then((response) => {
      tours.value = response.data
    })
    .catch(() => {
      useNotify('warning', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    })
}

async function fetchDrivers(params) {
  return await new DriverService().index(params)
    .then((response) => {
      drivers.value = response.data
    })
    .catch(() => {
      useNotify('warning', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    })
}

async function fetchVehicles(params) {
  return await new VehicleService().index(params)
    .then((response) => {
      vehicles.value = response.data
    })
    .catch(() => {
      useNotify('warning', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    })
}

async function fetchTourGuides(params) {
  return await new TourGuideService().index(params)
    .then((response) => {
      tourGuides.value = response.data
    })
    .catch(() => {
      useNotify('warning', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    })
}
</script>
