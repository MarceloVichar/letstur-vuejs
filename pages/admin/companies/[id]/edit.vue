<template>
  <div>
    <div class="mb-2">
      <button class="btn btn-secondary" @click="$router.back()">
        Voltar
      </button>
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl">
        Editar empresa
      </h2>
      <CompanyForm
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
import CompanyService from '~/services/api/admin/CompanyService';
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import CompanyForm from '~/components/app/admin/companies/CompanyForm.vue';

const companyService = new CompanyService()
const route = useRoute()
const router = useRouter()

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

async function fetchData() {
  return await companyService.get(route.params?.id)
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
  await  companyService.update(route.params?.id, form.data)
    .then(() => {
      useNotify('success', 'Empresa editada com sucesso.')
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
