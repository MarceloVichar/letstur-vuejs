<template>
  <div>
    <div class="mb-2">
      <button class="btn btn-secondary" @click="$router.back()">
        Voltar
      </button>
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl">
        Cadastrar motorista
      </h2>
      <DriverForm :model-value="form" :sending="sending" @submit="create()" />
    </CentralizedContainer>
  </div>
</template>

<!--<script setup>-->
<!--import DriverService from '~/services/api/company/records/DriverService';-->
<!--import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';-->
<!--import DriverForm from '~/components/app/company/records/drivers/DriverForm.vue';-->

<!--// definePageMeta({-->
<!--//   permission: 'drivers create',-->
<!--// })-->

<!--// const sending = ref(false)-->
<!--//-->
<!--// const form = reactive({-->
<!--//   errors: [],-->
<!--//   data: {-->
<!--//     name: undefined,-->
<!--//     cnh: undefined,-->
<!--//     cnhType: undefined,-->
<!--//     document: undefined,-->
<!--//     email: undefined,-->
<!--//     phone: undefined,-->
<!--//     dateOfBirth: undefined,-->
<!--//   },-->
<!--// })-->
<!--//-->
<!--// async function create() {-->
<!--//   sending.value = true-->
<!--//   await (new DriverService()).create(form.data)-->
<!--//     .then(() => {-->
<!--//       useNotify('success', 'Motorista cadastrado com sucesso.')-->
<!--//       navigateTo('/company/records/drivers')-->
<!--//     })-->
<!--//     .catch((error) => {-->
<!--//       if (error?.response?.status === 422) {-->
<!--//         form.errors = error?.response?.data?.errors-->
<!--//         useNotify('error', 'Preencha os campos corretamente.')-->
<!--//       } else {-->
<!--//         useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')-->
<!--//       }-->
<!--//     })-->
<!--//     .finally(() => {sending.value = false})-->
<!--// }-->

<!--</script>-->
<script setup>
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import DriverForm from '~/components/app/company/records/drivers/DriverForm.vue';
import DriverService from '~/services/api/company/records/driver/DriverService';

definePageMeta({
  permission: 'drivers create',
})

const sending = ref(false)

const form = reactive({
  errors: [],
  data: {
    name: undefined,
    cnh: undefined,
    cnhType: undefined,
    document: undefined,
    email: undefined,
    phone: undefined,
    dateOfBirth: undefined,
  },
})

async function create() {
  sending.value = true
  await (new DriverService()).create(form.data)
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
