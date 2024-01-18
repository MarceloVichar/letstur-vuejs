<template>
  <div>
    <div class="mb-2">
      <button class="btn btn-secondary" @click="$router.back()">
        Voltar
      </button>
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl">
        Editar evento
      </h2>
      <EventForm
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
import EventService from '~/services/api/company/event/EventService';
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import EventForm from '~/components/app/company/events/EventForm.vue';

definePageMeta({
  permission: 'events update',
})

const eventService = new EventService()
const route = useRoute()
const router = useRouter()

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

async function fetchData() {
  return await eventService.get(route.params?.id)
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
  await  eventService.update(route.params?.id, form.data)
    .then(() => {
      useNotify('success', 'Evento editado com sucesso.')
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
