<template>
  <div>
    <div class="mb-2">
      <button class="btn btn-secondary" @click="$router.back()">
        Voltar
      </button>
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl">
        Cadastrar empresa
      </h2>
      <CompanyForm :model-value="form" :sending="sending" @submit="create()" />
    </CentralizedContainer>
  </div>
</template>

<script setup lang="ts">
import CompanyService from '~/services/api/admin/CompanyService';
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import CompanyForm from '~/components/app/admin/companies/CompanyForm.vue';

const sending = ref(false)

const form = reactive({
  errors: [],
  data: {
    name: undefined,
    cnpj: undefined,
    email: undefined,
    phone: undefined,
    ie: undefined,
    secondaryPhone: undefined,
    tradingName: undefined,
    ownerName: undefined,
    ownerPassword: undefined,
    ownerPassword_confirmation: undefined,
    ownerEmail: undefined,
  },
})

async function create() {
  sending.value = true
  await (new CompanyService()).create(form.data)
    .then(() => {
      useNotify('success', 'Empresa cadastrada com sucesso.')
      navigateTo('/admin/companies')
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
