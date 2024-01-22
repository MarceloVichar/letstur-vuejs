<template>
  <div>
    <div class="mb-2">
      <BackScreenButton />
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl">
        Editar usuário
      </h2>
      <ProfileForm
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
import AuthService from '~/services/api/auth/AuthService';
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import {useAuth} from '~/store/auth';
import ProfileForm from '~/components/app/shared/profile/ProfileForm.vue';
import BackScreenButton from '~/components/shared/BackScreenButton.vue';

const authService = new AuthService()
const auth = useAuth()

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
  await auth.ensureUserIsLoaded()
  syncData(auth.user)
  return auth.user
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
  await  authService.updateProfile({
    ...form.data,
    roles: [form.data.role],
  })
    .then(async () => {
      await auth.fetchUser()
      useNotify('success', 'Usuário editado com sucesso.')
      navigateTo('/profile')
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
