<template>
  <div>
    <div class="mb-2">
      <BackScreenButton />
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl">
        Editar tipo de passeio
      </h2>
      <TourTypeForm
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
import TourTypeService from '~/services/api/company/records/tour-type/TourTypeService';
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import TourTypeForm from '~/components/app/company/records/tour-types/TourTypeForm.vue';
import BackScreenButton from '~/components/shared/BackScreenButton.vue';

definePageMeta({
  permission: 'tour-types update',
})

const tourTypeService = new TourTypeService()
const route = useRoute()
const router = useRouter()

const sending = ref(false)

const form = reactive({
  errors: [],
  data: {
    name: '',
    color: '#000000',
    isTransfer: false,
    isExclusive: false,
  },
})

async function fetchData() {
  return await tourTypeService.get(route.params?.id)
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
  await  tourTypeService.update(route.params?.id, form.data)
    .then(() => {
      useNotify('success', 'Tipo de passeio editado com sucesso.')
      navigateTo('/company/records/tour-types')
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
