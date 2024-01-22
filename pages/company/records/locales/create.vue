<template>
  <div>
    <div class="mb-2">
      <BackScreenButton />
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl">
        Cadastrar local
      </h2>
      <LocaleForm :model-value="form" :sending="sending" @submit="create()" />
    </CentralizedContainer>
  </div>
</template>

<script setup>
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import LocaleForm from '~/components/app/company/records/locales/LocaleForm.vue';
import LocaleService from '~/services/api/company/records/locale/LocaleService';
import BackScreenButton from '~/components/shared/BackScreenButton.vue';

definePageMeta({
  permission: 'locales create',
})

const sending = ref(false)

const form = reactive({
  errors: [],
  data: {
    name: '',
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    district: '',
    city: '',
    uf: '',
    responsibleName: '',
    responsiblePhone: '',
  },
})

async function create() {
  sending.value = true
  await (new LocaleService()).create(form.data)
    .then(() => {
      useNotify('success', 'Local cadastrado com sucesso.')
      navigateTo('/company/records/locales')
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
