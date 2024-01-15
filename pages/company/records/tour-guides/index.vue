<template>
  <div class="flex flex-col gap-4">
    <h2 class="font-light text-lg">
      GUIAS DE PASSEIO
    </h2>
    <div class="flex flex-col-reverse md:flex-row gap-2 w-full">
      <SearchInput
        :model-value="getQueryParam('filter[name]', '')"
        class="w-full"
        placeholder="Pesquisar guia de passeio por nome"
        @update:modelValue="setQueryParam('filter[name]', $event)"
      />
      <NuxtLink class="btn btn-primary" to="/company/records/tour-guides/create">
        Cadastrar
      </NuxtLink>
    </div>
    <TourGuidesTable
      :data="data?.data"
      :meta="data?.meta"
      :pending="pending"
      @view="navigateTo(`/company/records/tour-guides/${$event?.id}`)"
      @edit="navigateTo(`/company/records/tour-guides/${$event?.id}/edit`)"
      @delete="confirmDelete($event)"
      @onChangePage="setQueryParam('page', $event)"
    />
  </div>
</template>

<script setup>
import SearchInput from '~/components/shared/form/SearchInput.vue';
import {getQueryParam, setQueryParam, useRouteQueryWatcher} from '~/composables/route-helpers';
import TourGuidesTable from '~/components/app/company/records/tour-guides/TourGuidesTable.vue';
import TourGuideService from '~/services/api/company/records/tour-guide/TourGuideService';

const tourGuidesService = new TourGuideService()
const route = useRoute()

useHead({
  title: 'Guias de passeio',
})

definePageMeta({
  permission: 'tour-guides view any',
})

async function fetchTourGuides() {
  return tourGuidesService.index({ ...route.query })
    .catch(() => {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    })
}

const {pending, data, refresh} = useLazyAsyncData('tourGuides', await fetchTourGuides)

useRouteQueryWatcher(refresh)

async function confirmDelete(entity) {
  const confirm = await useConfirmation({
    title: 'Excluir guia de passeio',
    message: `Deseja realmente excluir o guia de passeio ${entity.name}?`,
  })

  if (confirm) {
    try {
      await tourGuidesService.destroy(entity.id)
      refresh()
      useNotify('success', 'Guia de passeio excluído com sucesso.')
    } catch (error) {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    }
  }
}
</script>
