<template>
  <div class="flex flex-col gap-4">
    <h2 class="font-light text-lg">
      Veículos
    </h2>
    <div class="flex flex-col-reverse md:flex-row gap-2 w-full">
      <SearchInput
        :model-value="getQueryParam('filter[name]', '')"
        class="w-full"
        placeholder="Pesquisar veículo por nome"
        @update:modelValue="setQueryParam('filter[name]', $event)"
      />
      <NuxtLink class="btn btn-primary" to="/company/records/vehicles/create">
        Cadastrar
      </NuxtLink>
    </div>
    <VehiclesTable
      :data="data?.data"
      :meta="data?.meta"
      :pending="pending"
      @view="navigateTo(`/company/records/vehicles/${$event?.id}`)"
      @edit="navigateTo(`/company/records/vehicles/${$event?.id}/edit`)"
      @delete="confirmDelete($event)"
      @onChangePage="setQueryParam('page', $event)"
    />
  </div>
</template>

<script setup>
import SearchInput from '~/components/shared/form/SearchInput.vue';
import {getQueryParam, setQueryParam, useRouteQueryWatcher} from '~/composables/route-helpers';
import VehiclesTable from '~/components/app/company/records/vehicles/VehiclesTable.vue';
import VehicleService from '~/services/api/company/records/vehicle/VehicleService';

const vehiclesService = new VehicleService()
const route = useRoute()

useHead({
  title: 'Veículos',
})

definePageMeta({
  permission: 'vehicles view any',
})

async function fetchVehicles() {
  return vehiclesService.index({ ...route.query })
    .catch(() => {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    })
}

const {pending, data, refresh} = useLazyAsyncData('vehicles', await fetchVehicles)

useRouteQueryWatcher(refresh)

async function confirmDelete(entity) {
  const confirm = await useConfirmation({
    title: 'Excluir veículo',
    message: `Deseja realmente excluir o veículo ${entity.model}?`,
  })

  if (confirm) {
    try {
      await vehiclesService.destroy(entity.id)
      refresh()
      useNotify('success', 'Veículo excluído com sucesso.')
    } catch (error) {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    }
  }
}
</script>
