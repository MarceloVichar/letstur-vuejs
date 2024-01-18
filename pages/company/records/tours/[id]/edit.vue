<template>
  <div>
    <div class="mb-2">
      <button class="btn btn-secondary" @click="$router.back()">
        Voltar
      </button>
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl">
        Editar passeio
      </h2>
      <TourForm
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
import TourService from '~/services/api/company/records/tour/TourService';
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import TourForm from '~/components/app/company/records/tours/TourForm.vue';

definePageMeta({
  permission: 'tours update',
})

const tourService = new TourService()
const route = useRoute()
const router = useRouter()

const sending = ref(false)

const form = reactive({
  errors: [],
  data: {
    name: '',
    roundTrip: 0,
    priceCents: 0,
    note: '',
    localeId: '',
    tourTypeId: '',
  },
})

async function fetchData() {
  return await tourService.get(route.params?.id)
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
  await  tourService.update(route.params?.id, form.data)
    .then(() => {
      useNotify('success', 'Passeio editado com sucesso.')
      navigateTo('/company/records/tours')
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
