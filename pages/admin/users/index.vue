<template>
  <div class="flex flex-col gap-4">
    <h2 class="font-light text-lg">
      USUÁRIOS
    </h2>
    <div class="flex flex-col-reverse md:flex-row gap-2 w-full">
      <SearchInput
        :model-value="getQueryParam('filter[name]', '')"
        class="w-full"
        placeholder="Pesquisar usuário por nome"
        @update:modelValue="setQueryParam('filter[name]', $event)"
      />
      <CustomSelect
        :items="userRoles"
        index-field="value"
        label-field="label"
        value-field="value"
        class="w-full md:w-96"
        :model-value="getQueryParam('filter[role]', '')"
        @update:modelValue="setQueryParam('filter[role]', $event)"
      />
      <button class="btn btn-primary" @click="$router.push('/admin/users/create')">
        Cadastrar
      </button>
    </div>
    <UsersTable
      :data="data?.data"
      :meta="data?.meta"
      :pending="pending"
      @view="navigateTo(`/admin/users/${$event?.id}`)"
      @edit="navigateTo(`/admin/users/${$event?.id}/edit`)"
      @delete="confirmDelete($event)"
      @onChangePage="setQueryParam('page', $event)"
    />
  </div>
</template>

<script setup>
import SearchInput from '~/components/shared/form/SearchInput.vue';
import {getQueryParam, setQueryParam, useRouteQueryWatcher} from '~/composables/route-helpers';
import UsersTable from '~/components/app/admin/users/UsersTable.vue';
import UserService from '~/services/api/admin/UserService';
import CustomSelect from '~/components/shared/form/CustomSelect.vue';
import {userRoles} from '~/data/objects';

const usersService = new UserService()
const route = useRoute()

useHead({
  title: 'Usuários',
})

definePageMeta({
  title: 'Usuários',
})

async function fetchUsers() {
  return usersService.index({ ...route.query })
    .catch(() => {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    })
}

const {pending, data, refresh} = useLazyAsyncData('users', await fetchUsers)

useRouteQueryWatcher(refresh)

async function confirmDelete(entity) {
  const confirm = await useConfirmation({
    title: 'Excluir usuário',
    message: `Deseja realmente excluir o usuário ${entity.name}?`,
  })

  if (confirm) {
    try {
      await usersService.destroy(entity.id)
      refresh()
      useNotify('success', 'Usuário excluído com sucesso.')
    } catch (error) {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    }
  }
}
</script>
