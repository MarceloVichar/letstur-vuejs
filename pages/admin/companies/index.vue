<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-2 w-full">
      <SearchInput
        :model-value="getQueryParam('filter[name]', '')"
        class="w-full"
        placeholder="Pesquisar empresa por nome"
        @update:modelValue="setQueryParam('filter[name]', $event)"
      />
      <button class="btn btn-primary" @click="$router.push('/admin/companies/create')">
        Cadastrar
      </button>
    </div>
    <CompaniesTable
      :data="data?.data"
      :meta="data?.meta"
      :pending="pending"
      @view="navigateTo(`/admin/companies/${$event?.id}`)"
      @edit="navigateTo(`/admin/companies/${$event?.id}/edit`)"
      @delete="confirmDelete($event)"
      @onChangePage="setQueryParam('page', $event)"
    />
  </div>
</template>

<script setup>
import SearchInput from '~/components/shared/form/SearchInput.vue';
import CompaniesTable from '~/components/app/admin/companies/CompaniesTable.vue';
import {getQueryParam, setQueryParam, useRouteQueryWatcher} from '~/composables/route-helpers';
import CompanyService from '~/services/api/admin/CompanyService';

const companiesService = new CompanyService()
const route = useRoute()

useHead({
  title: 'Empresas',
})

definePageMeta({
  title: 'Empresas',
})

async function fetchUsers() {
  return companiesService.index({ ...route.query })
    .catch(() => {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    })
}

const {pending, data, refresh} = useLazyAsyncData('users', await fetchUsers)

useRouteQueryWatcher(refresh)

async function confirmDelete(entity) {
  const confirm = await useConfirmation({
    title: 'Excluir empresa',
    message: `Deseja realmente excluir a empresa ${entity.name}?`,
  })

  if (confirm) {
    try {
      await companiesService.destroy(entity.id)
      refresh()
      useNotify('success', 'Empresa excluída com sucesso.')
    } catch (error) {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    }
  }
}
</script>
