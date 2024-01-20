<template>
  <div>
    <div class="mb-2">
      <button class="btn btn-secondary" @click="$router.back()">
        Cancelar
      </button>
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl">
        Editar venda
      </h2>
      <SaleForm
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
import SaleService from '~/services/api/company/sale/SaleService';
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import SaleForm from '~/components/app/company/sales/SaleForm.vue';

definePageMeta({
  permission: 'sales update',
})

const saleService = new SaleService()
const route = useRoute()
const router = useRouter()

const sending = ref(false)

const form = reactive({
  errors: [],
  data: {
    customer: {
      name: '',
      email: '',
      document: '',
      phone: '',
    },
    eventSales: [],
  },
})

async function fetchData() {
  return await saleService.get(route.params?.id)
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
  if (Array.isArray(loadedData?.events) && loadedData?.events.length) {
    form.data.eventSales = loadedData.events.map((event) => {
      return {
        eventId: event?.event?.id,
        quantity: event?.quantity || 0,
        passengers: event?.passengers?.map((passenger) => {
          return {
            name: passenger?.name || '',
            document: passenger?.document || '',
          }
        }),
      }
    })
  }
}

async function edit() {
  sending.value = true
  await  saleService.update(route.params?.id, form.data)
    .then(() => {
      useNotify('success', 'Venda editada com sucesso.')
      navigateTo('/company/sales')
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
