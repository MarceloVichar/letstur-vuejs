<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-2 w-full">
      <SearchInput
        :model-value="getQueryParam('filter[name]', '')"
        class="w-full"
        placeholder="Pesquisar empresa por nome"
        @update:modelValue="setQueryParam('filter[name]', $event)"
      />
      <button class="btn btn-primary">
        Cadastrar
      </button>
    </div>
    <CompaniesTable
      :data="data?.data"
      :meta="data?.meta"
      :pending="pending"
      @onChangePage="setQueryParam('page', $event)"
    />
  </div>
</template>
<script setup lang="ts">
import SearchInput from '~/components/shared/form/SearchInput.vue';
import CompaniesTable from '~/components/app/admin/companies/CompaniesTable.vue';
import {getQueryParam, setQueryParam, useRouteQueryWatcher} from '~/composables/route-helpers';
import CompanyService from '~/services/api/admin/CompanyService';

const companiesService = new CompanyService()
const route = useRoute()

async function fetchUsers() {
  return companiesService.index({ ...route.query })
}

const {pending, data, refresh} = useLazyAsyncData('users', await fetchUsers)

console.log(data.value)

useRouteQueryWatcher(refresh)
</script>
