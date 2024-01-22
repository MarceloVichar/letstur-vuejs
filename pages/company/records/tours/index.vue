<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col-reverse md:flex-row gap-2 w-full">
      <SearchInput
        :model-value="getQueryParam('filter[name]', '')"
        class="w-full"
        placeholder="Pesquisar passeio por nome"
        @update:modelValue="setQueryParam('filter[name]', $event)"
      />
      <AddEntityButton to="/company/records/tours/create" />
    </div>
    <ToursTable
      :data="data?.data"
      :meta="data?.meta"
      :pending="pending"
      @view="navigateTo(`/company/records/tours/${$event?.id}`)"
      @edit="navigateTo(`/company/records/tours/${$event?.id}/edit`)"
      @delete="confirmDelete($event)"
      @onChangePage="setQueryParam('page', $event)"
    />
  </div>
</template>

<script setup>
import SearchInput from '~/components/shared/form/SearchInput.vue';
import {getQueryParam, setQueryParam, useRouteQueryWatcher} from '~/composables/route-helpers';
import ToursTable from '~/components/app/company/records/tours/ToursTable.vue';
import TourService from '~/services/api/company/records/tour/TourService';
import AddEntityButton from '~/components/shared/AddEntityButton.vue';

const toursService = new TourService()
const route = useRoute()

useHead({
  title: 'Passeios',
})

definePageMeta({
  permission: 'tours view any',
})

async function fetchTours() {
  return toursService.index({ ...route.query })
    .catch(() => {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    })
}

const {pending, data, refresh} = useLazyAsyncData('tours', await fetchTours)

useRouteQueryWatcher(refresh)

async function confirmDelete(entity) {
  const confirm = await useConfirmation({
    title: 'Excluir passeio',
    message: `Deseja realmente excluir o passeio ${entity.model}?`,
  })

  if (confirm) {
    try {
      await toursService.destroy(entity.id)
      refresh()
      useNotify('success', 'Passeio excluído com sucesso.')
    } catch (error) {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    }
  }
}
</script>
