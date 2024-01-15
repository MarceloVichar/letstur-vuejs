<template>
  <div>
    <div class="mb-2">
      <button class="btn btn-secondary" @click="$router.back()">
        Voltar
      </button>
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl">
        Cadastrar guia de passeio
      </h2>
      <TourGuideForm :model-value="form" :sending="sending" @submit="create()" />
    </CentralizedContainer>
  </div>
</template>

<script setup>
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import TourGuideForm from '~/components/app/company/records/tour-guides/TourGuideForm.vue';
import TourGuideService from '~/services/api/company/records/tour-guide/TourGuideService';

definePageMeta({
  permission: 'tour-guides create',
})

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

async function create() {
  sending.value = true
  await (new TourGuideService()).create(form.data)
    .then(() => {
      useNotify('success', 'Guia de passeio cadastrado com sucesso.')
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
