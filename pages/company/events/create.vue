<template>
  <div>
    <div class="mb-2">
      <button class="btn btn-secondary" @click="$router.back()">
        Voltar
      </button>
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl">
        Cadastrar evento
      </h2>
      <EventForm :model-value="form" :sending="sending" @submit="create()" />
    </CentralizedContainer>
  </div>
</template>

<script setup>
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import EventForm from '~/components/app/company/events/EventForm.vue';
import EventService from '~/services/api/company/event/EventService';

definePageMeta({
  permission: 'events create',
})

const sending = ref(false)

const form = reactive({
  errors: [],
  data: {
    departureDateTime: '',
    arrivalDateTime: '',
    driverId: '',
    tourId: '',
    vehicleId: '',
    tourGuideId: '',
  },
})

async function create() {
  sending.value = true
  await (new EventService()).create(form.data)
    .then(() => {
      useNotify('success', 'Evento cadastrado com sucesso.')
      navigateTo('/company/events')
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
