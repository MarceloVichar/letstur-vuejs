<template>
  <div>
    <div class="mb-2">
      <BackScreenButton />
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl">
        Cadastrar veículo
      </h2>
      <VehicleForm :model-value="form" :sending="sending" @submit="create()" />
    </CentralizedContainer>
  </div>
</template>

<script setup>
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import VehicleForm from '~/components/app/company/records/vehicles/VehicleForm.vue';
import VehicleService from '~/services/api/company/records/vehicle/VehicleService';
import BackScreenButton from '~/components/shared/BackScreenButton.vue';

definePageMeta({
  permission: 'vehicles create',
})

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

async function create() {
  sending.value = true
  await (new VehicleService()).create(form.data)
    .then(() => {
      useNotify('success', 'Veículo cadastrado com sucesso.')
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
