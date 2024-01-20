<template>
  <div>
    <div class="mb-2">
      <button class="btn btn-secondary" @click="$router.back()">
        Cancelar
      </button>
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl">
        Cadastrar venda
      </h2>
      <SaleForm :model-value="form" :sending="sending" @submit="create()" />
    </CentralizedContainer>
  </div>
</template>

<script setup>
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import SaleForm from '~/components/app/company/sales/SaleForm.vue';
import SaleService from '~/services/api/company/sale/SaleService';

definePageMeta({
  permission: 'sales create',
})

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

async function create() {
  sending.value = true
  await (new SaleService()).create(form.data)
    .then(() => {
      useNotify('success', 'Venda cadastrada com sucesso.')
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
