<template>
  <div>
    <div class="mb-2">
      <BackScreenButton />
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl">
        Editar guia de passeio
      </h2>
      <TourGuideForm
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
import TourGuideService from '~/services/api/company/records/tour-guide/TourGuideService';
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import TourGuideForm from '~/components/app/company/records/tour-guides/TourGuideForm.vue';
import BackScreenButton from '~/components/shared/BackScreenButton.vue';

definePageMeta({
  permission: 'tour-guides update',
})

const tourGuideService = new TourGuideService()
const route = useRoute()
const router = useRouter()

const sending = ref(false)

const form = reactive({
  errors: [],
  data: {
    name: '',
    document: '',
    email: '',
    phone: '',
  },
})

async function fetchData() {
  return await tourGuideService.get(route.params?.id)
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
  await  tourGuideService.update(route.params?.id, form.data)
    .then(() => {
      useNotify('success', 'Guia de passeio editado com sucesso.')
      navigateTo('/company/records/tour-guides')
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
