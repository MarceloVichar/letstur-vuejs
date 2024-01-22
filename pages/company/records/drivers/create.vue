<template>
  <div>
    <div class="mb-2">
      <BackScreenButton />
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl">
        Cadastrar motorista
      </h2>
      <DriverForm :model-value="form" :sending="sending" @submit="create()" />
    </CentralizedContainer>
  </div>
</template>

<script setup>
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import DriverForm from '~/components/app/company/records/drivers/DriverForm.vue';
import DriverService from '~/services/api/company/records/driver/DriverService';
import BackScreenButton from '~/components/shared/BackScreenButton.vue';

definePageMeta({
  permission: 'drivers create',
})

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

async function create() {
  sending.value = true
  const params = {
    ...form.data,
    dateOfBirth: useDayjs()(form.data.dateOfBirth).format('YYYY-MM-DD'),
  }
  await (new DriverService()).create(params)
    .then(() => {
      useNotify('success', 'Motorista cadastrado com sucesso.')
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
