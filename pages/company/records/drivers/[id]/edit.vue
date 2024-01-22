<template>
  <div>
    <div class="mb-2">
      <BackScreenButton />
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl">
        Editar motorista
      </h2>
      <DriverForm
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
import DriverService from '~/services/api/company/records/driver/DriverService';
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import DriverForm from '~/components/app/company/records/drivers/DriverForm.vue';
import BackScreenButton from '~/components/shared/BackScreenButton.vue';

definePageMeta({
  permission: 'drivers update',
})

const driverService = new DriverService()
const route = useRoute()
const router = useRouter()

const sending = ref(false)

const form = reactive({
  errors: [],
  data: {
    name: '',
    cnh: '',
    cnhType: '',
    document: '',
    email: '',
    phone: '',
    dateOfBirth: '',
  },
})

async function fetchData() {
  return await driverService.get(route.params?.id)
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
  const params = {
    ...form.data,
    dateOfBirth: useDayjs()(form.data.dateOfBirth).format('YYYY-MM-DD'),
  }
  await  driverService.update(route.params?.id, params)
    .then(() => {
      useNotify('success', 'Motorista editado com sucesso.')
      navigateTo('/company/records/drivers')
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
