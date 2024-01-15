<template>
  <div>
    <div class="mb-2">
      <button class="btn btn-secondary" @click="$router.back()">
        Voltar
      </button>
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl">
        Editar veículo
      </h2>
      <VehicleForm
        v-if="!pending"
        :model-value="form"
        :sending="sending"
        action="edit"
        @submit="edit()"
      />
    </CentralizedContainer>
  </div>
</template>
<script setup>
import VehicleService from '~/services/api/company/records/vehicle/VehicleService';
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import VehicleForm from '~/components/app/company/records/vehicles/VehicleForm.vue';

definePageMeta({
  permission: 'vehicles update',
})

const vehicleService = new VehicleService()
const route = useRoute()
const router = useRouter()

const sending = ref(false)

const form = reactive({
  errors: [],
  data: {
    licensePlate: '',
    model: '',
    type: '',
    numberOfSeats: 0,
    ownerName: '',
    ownerDocument: '',
    ownerEmail: '',
    ownerPhone: '',
    cnhTypeRequired: '',
  },
})

async function fetchData() {
  return await vehicleService.get(route.params?.id)
    .then((response) => {
      syncData(response?.item)
      return response?.item
    })
    .catch(() => {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
      router.back()
    })
}

const {pending} = await  useAsyncData(fetchData)

function syncData(loadedData) {
  Object.keys(form.data).forEach((key) => {
    if (loadedData[key]) form.data[key] = loadedData[key]
  })
}

async function edit() {
  sending.value = true
  await  vehicleService.update(route.params?.id, form.data)
    .then(() => {
      useNotify('success', 'Veículo editado com sucesso.')
      navigateTo('/company/records/vehicles')
    })
    .catch((error) => {
      if (error?.response?.status === 422) {
        form.errors = error?.response?.data?.errors
        useNotify('error', 'Preencha os campos corretamente.')
      } else {
        useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
      }
    })
    .finally(() => {sending.value = false})
}

</script>
