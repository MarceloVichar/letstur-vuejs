<template>
  <div>
    <div class="mb-2">
      <BackScreenButton />
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl">
        Cadastrar usuário
      </h2>
      <UserForm :model-value="form" :sending="sending" @submit="create()" />
    </CentralizedContainer>
  </div>
</template>

<script setup lang="ts">
import UserService from '~/services/api/company/user/UserService';
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import UserForm from '~/components/app/company/users/UserForm.vue';
import BackScreenButton from '~/components/shared/BackScreenButton.vue';

const sending = ref(false)

definePageMeta({
  permission: 'users create',
})

const form = reactive({
  errors: [],
  data: {
    name: undefined,
    password: undefined,
    password_confirmation: undefined,
    email: undefined,
    role: undefined,
  },
})

async function create() {
  sending.value = true
  await (new UserService()).create({
    ...form.data,
    roles: [form.data.role],
  })
    .then(() => {
      useNotify('success', 'Usuário cadastrado com sucesso.')
      navigateTo('/company/users')
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
