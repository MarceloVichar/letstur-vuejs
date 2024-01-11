<template>
  <div class="flex flex-col items-center font-bold">
    <h1 class="text-2xl text-primary">
      VERIFICAR CÓDIGO
    </h1>
    <!--    <VForm v-slot="{ meta }" class="grid p-4 gap-2 w-full" @submit="onSubmit">-->
    <!--      <VField-->
    <!--        v-slot="{ field, errors }"-->
    <!--        v-model="form.code"-->
    <!--        name="code"-->
    <!--        rules="required"-->
    <!--      >-->
    <!--        <CustomInput-->
    <!--          v-bind="field"-->
    <!--          v-model="field.value"-->
    <!--          type="number"-->
    <!--          placeholder="Digite seu código MFA"-->
    <!--          label="Código MFA"-->
    <!--          :errors="useErrorBag(errors, form.errors, 'code')"-->
    <!--        />-->
    <!--      </VField>-->
    <!--      <div class="text-center">-->
    <!--        <SubmitButton-->
    <!--          :disabled="!meta.valid"-->
    <!--          :loading="isSending"-->
    <!--          type="submit"-->
    <!--          class="btn btn-primary"-->
    <!--        >-->
    <!--          Verificar-->
    <!--        </SubmitButton>-->
    <!--        <br>-->
    <!--        <button type="button" class="btn btn-ghost btn-sm mt-4">-->
    <!--          Voltar para o login-->
    <!--        </button>-->
    <!--      </div>-->
    <!--    </VForm>-->
  </div>
</template>

<script setup>
import {useAuth} from '~/store/auth';

definePageMeta({
  layout: 'auth',
})

const isSending = ref(false)
const authStore = useAuth()

// async function onSubmit() {
//   isSending.value = true
//   await authStore.verifyCode(form)
//     .then(() => {
//       navigateTo(localePath('/'))
//       useNotify('success', 'Validação realizada com sucesso')
//     })
//     .catch((err) => {
//       useNotify('error', _get(err, 'response.data.message', 'Não foi possível verificar'))
//     })
//     .finally(() => { isSending.value = false })
// }

</script>
