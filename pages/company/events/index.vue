<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col-reverse md:flex-row gap-2 w-full">
      <SearchInput
        :model-value="getQueryParam('filter[tour]', '')"
        class="w-full"
        placeholder="Pesquisar evento por nome"
        @update:modelValue="setQueryParam('filter[tour]', $event)"
      />
      <AddEntityButton to="/company/events/create" />
    </div>
    <EventsTable
      :data="data?.data"
      :meta="data?.meta"
      :pending="pending"
      @view="navigateTo(`/company/events/${$event?.id}`)"
      @edit="navigateTo(`/company/events/${$event?.id}/edit`)"
      @delete="confirmDelete($event)"
      @onChangePage="setQueryParam('page', $event)"
    />
  </div>
</template>

<script setup>
import SearchInput from '~/components/shared/form/SearchInput.vue';
import {getQueryParam, setQueryParam, useRouteQueryWatcher} from '~/composables/route-helpers';
import EventsTable from '~/components/app/company/events/EventsTable.vue';
import EventService from '~/services/api/company/event/EventService';
import AddEntityButton from '~/components/shared/AddEntityButton.vue';

const eventsService = new EventService()
const route = useRoute()

useHead({
  title: 'Eventos',
})

definePageMeta({
  permission: 'events view any',
})

async function fetchEvents() {
  return eventsService.index({ ...route.query })
    .catch(() => {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    })
}

const {pending, data, refresh} = useLazyAsyncData('events', await fetchEvents)

useRouteQueryWatcher(refresh)

async function confirmDelete(entity) {
  const confirm = await useConfirmation({
    title: 'Excluir evento',
    message: `Deseja realmente excluir o evento ${entity.model}?`,
  })

  if (confirm) {
    try {
      await eventsService.destroy(entity.id)
      refresh()
      useNotify('success', 'Evento excluído com sucesso.')
    } catch (error) {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    }
  }
}
</script>
