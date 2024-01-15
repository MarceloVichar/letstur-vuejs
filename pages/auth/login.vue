<template>
  <div class="flex flex-col items-center font-bold">
    <VeeForm v-slot="{ meta }" class="grid p-4 gap-2 w-full" @submit="onSubmit">
      <VeeField
        v-slot="{ field, errors }"
        v-model="form.data.email"
        name="email"
        rules="email|required"
      >
        <CustomInput
          v-bind="field"
          v-model="field.value"
          type="email"
          placeholder="Digite seu email"
          label="Email"
          :errors="useErrorBag(errors, form.errors, 'email')"
        />
      </VeeField>
      <VeeField
        v-slot="{ field, errors }"
        v-model="form.data.password"
        name="senha"
        rules="required"
      >
        <CustomPassInput
          v-bind="field"
          v-model="field.value"
          placeholder="Digite sua senha"
          label="Senha"
          :errors="useErrorBag(errors, form.errors, 'password')"
        />
      </VeeField>
      <div class="text-center">
        <SubmitButton
          :disabled="!meta.valid"
          :loading="isSending"
          type="submit"
          class="btn btn-primary w-full"
        >
          Entrar
        </SubmitButton>
      </div>
    </VeeForm>
  </div>
</template>

<script setup>
import {useAuth} from '~/store/auth';
import CustomInput from '~/components/shared/form/CustomInput.vue';
import CustomPassInput from '~/components/shared/form/CustomPassInput.vue';
import SubmitButton from '~/components/shared/form/SubmitButton.vue';
import {useErrorBag} from '~/composables/helpers';

definePageMeta({
  layout: 'auth',
})

const isSending = ref(false)
const authStore = useAuth()

const form = reactive({
  errors: [],
  data: {
    email: 'admin@letsgrow.com.br',
    password: '12345678',
  },
})

async function onSubmit() {
  isSending.value = true
  await authStore.login(form.data)
    .then(() => {
      navigateTo('/')
      useNotify('success', 'Login realizado com sucesso')
    })
    .catch((err) => {
      useNotify('error', _get(err, 'response.data.message', 'Não foi possível fazer login'))
    })
    .finally(() => { isSending.value = false })
}

</script>
