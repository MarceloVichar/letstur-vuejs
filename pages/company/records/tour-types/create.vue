<template>
  <div>
    <div class="mb-2">
      <button class="btn btn-secondary" @click="$router.back()">
        Voltar
      </button>
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl">
        Cadastrar tipo de passeio
      </h2>
      <TourTypeForm :model-value="form" :sending="sending" @submit="create()" />
    </CentralizedContainer>
  </div>
</template>

<script setup>
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import TourTypeForm from '~/components/app/company/records/tour-types/TourTypeForm.vue';
import TourTypeService from '~/services/api/company/records/tour-type/TourTypeService';

definePageMeta({
  permission: 'tour-types create',
})

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

async function create() {
  sending.value = true
  await (new TourTypeService()).create(form.data)
    .then(() => {
      useNotify('success', 'Tipo de passeio cadastrado com sucesso.')
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
