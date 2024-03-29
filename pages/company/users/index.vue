<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col-reverse md:flex-row gap-2 w-full">
      <SearchInput
        :model-value="getQueryParam('filter[name]', '')"
        class="w-full"
        placeholder="Pesquisar usuário por nome"
        @update:modelValue="setQueryParam('filter[name]', $event)"
      />
      <CustomSelect
        :items="companyUserRoles"
        index-field="value"
        label-field="label"
        value-field="value"
        class="w-full md:w-96"
        :model-value="getQueryParam('filter[role]', '')"
        @update:modelValue="setQueryParam('filter[role]', $event)"
      />
      <Can permission="users create">
        <AddEntityButton to="/company/users/create" />
      </Can>
    </div>
    <UsersTable
      :data="data?.data"
      :meta="data?.meta"
      :pending="pending"
      @view="navigateTo(`/company/users/${$event?.id}`)"
      @edit="navigateTo(`/company/users/${$event?.id}/edit`)"
      @delete="confirmDelete($event)"
      @onChangePage="setQueryParam('page', $event)"
    />
  </div>
</template>

<script setup>
import SearchInput from '~/components/shared/form/SearchInput.vue';
import {getQueryParam, setQueryParam, useRouteQueryWatcher} from '~/composables/route-helpers';
import UsersTable from '~/components/app/company/users/UsersTable.vue';
import UserService from '~/services/api/company/user/UserService';
import CustomSelect from '~/components/shared/form/CustomSelect.vue';
import {companyUserRoles} from '~/data/objects';
import AddEntityButton from '~/components/shared/AddEntityButton.vue';
import Can from '~/components/shared/Can.vue';

const usersService = new UserService()
const route = useRoute()

useHead({
  title: 'Usuários',
})

definePageMeta({
  permission: 'users view any',
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
