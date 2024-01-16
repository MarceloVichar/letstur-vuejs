<template>
  <div class="flex flex-col gap-4">
    <h2 class="font-light text-lg">
      TIPOS DE PASSEIO
    </h2>
    <div class="flex flex-col-reverse md:flex-row gap-2 w-full">
      <SearchInput
        :model-value="getQueryParam('filter[name]', '')"
        class="w-full"
        placeholder="Pesquisar tipo de passeio por nome"
        @update:modelValue="setQueryParam('filter[name]', $event)"
      />
      <NuxtLink class="btn btn-primary" to="/company/records/tour-types/create">
        Cadastrar
      </NuxtLink>
    </div>
    <TourTypesTable
      :data="data?.data"
      :meta="data?.meta"
      :pending="pending"
      @view="navigateTo(`/company/records/tour-types/${$event?.id}`)"
      @edit="navigateTo(`/company/records/tour-types/${$event?.id}/edit`)"
      @delete="confirmDelete($event)"
      @onChangePage="setQueryParam('page', $event)"
    />
  </div>
</template>

<script setup>
import SearchInput from '~/components/shared/form/SearchInput.vue';
import {getQueryParam, setQueryParam, useRouteQueryWatcher} from '~/composables/route-helpers';
import TourTypesTable from '~/components/app/company/records/tour-types/TourTypesTable.vue';
import TourTypeService from '~/services/api/company/records/tour-type/TourTypeService';

const tourTypesService = new TourTypeService()
const route = useRoute()

useHead({
  title: 'Tipos de passeio',
})

definePageMeta({
  permission: 'tour-types view any',
})

async function fetchTourTypes() {
  return tourTypesService.index({ ...route.query })
    .catch(() => {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    })
}

const {pending, data, refresh} = useLazyAsyncData('tourTypes', await fetchTourTypes)

useRouteQueryWatcher(refresh)

async function confirmDelete(entity) {
  const confirm = await useConfirmation({
    title: 'Excluir tipo de passeio',
    message: `Deseja realmente excluir o tipo de passeio ${entity.name}?`,
  })

  if (confirm) {
    try {
      await tourTypesService.destroy(entity.id)
      refresh()
      useNotify('success', 'Tipo de passeio excluído com sucesso.')
    } catch (error) {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    }
  }
}
</script>
