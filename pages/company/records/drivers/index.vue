<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col-reverse md:flex-row gap-2 w-full">
      <SearchInput
        :model-value="getQueryParam('filter[name]', '')"
        class="w-full"
        placeholder="Pesquisar motorista por nome"
        @update:modelValue="setQueryParam('filter[name]', $event)"
      />
      <Can permission="drivers create">
        <AddEntityButton to="/company/records/drivers/create" />
      </Can>
    </div>
    <DriversTable
      :data="data?.data"
      :meta="data?.meta"
      :pending="pending"
      @view="navigateTo(`/company/records/drivers/${$event?.id}`)"
      @edit="navigateTo(`/company/records/drivers/${$event?.id}/edit`)"
      @delete="confirmDelete($event)"
      @onChangePage="setQueryParam('page', $event)"
    />
  </div>
</template>

<script setup>
import SearchInput from '~/components/shared/form/SearchInput.vue';
import {getQueryParam, setQueryParam, useRouteQueryWatcher} from '~/composables/route-helpers';
import DriversTable from '~/components/app/company/records/drivers/DriversTable.vue';
import DriverService from '~/services/api/company/records/driver/DriverService';
import AddEntityButton from '~/components/shared/AddEntityButton.vue';
import Can from '~/components/shared/Can.vue';

const driversService = new DriverService()
const route = useRoute()

useHead({
  title: 'Motoristas',
})

definePageMeta({
  permission: 'drivers view any',
})

async function fetchDrivers() {
  return driversService.index({ ...route.query })
    .catch(() => {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    })
}

const {pending, data, refresh} = useLazyAsyncData('drivers', await fetchDrivers)

useRouteQueryWatcher(refresh)

async function confirmDelete(entity) {
  const confirm = await useConfirmation({
    title: 'Excluir motorista',
    message: `Deseja realmente excluir o motorista ${entity.name}?`,
  })

  if (confirm) {
    try {
      await driversService.destroy(entity.id)
      refresh()
      useNotify('success', 'Motorista excluído com sucesso.')
    } catch (error) {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    }
  }
}
</script>
