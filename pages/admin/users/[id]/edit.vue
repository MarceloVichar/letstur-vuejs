<template>
  <div>
    <div class="mb-2">
      <BackScreenButton />
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl">
        Editar usuário
      </h2>
      <UserForm
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
import UserService from '~/services/api/admin/UserService';
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import UserForm from '~/components/app/admin/users/UserForm.vue';
import BackScreenButton from '~/components/shared/BackScreenButton.vue';

const userService = new UserService()
const route = useRoute()
const router = useRouter()

const sending = ref(false)

const form = reactive({
  errors: [],
  data: {
    name: undefined,
    password: undefined,
    password_confirmation: undefined,
    email: undefined,
    role: undefined,
    companyId: undefined,
  },
})

async function fetchData() {
  return await userService.get(route.params?.id)
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
    if (loadedData?.roles && loadedData?.roles[0]) form.data.role = loadedData?.roles[0]
  })
}

async function edit() {
  sending.value = true
  await  userService.update(route.params?.id, {
    ...form.data,
    roles: [form.data.role],
  })
    .then(() => {
      useNotify('success', 'Usuário editado com sucesso.')
      navigateTo('/admin/users')
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
