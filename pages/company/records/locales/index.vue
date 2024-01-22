<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col-reverse md:flex-row gap-2 w-full">
      <SearchInput
        :model-value="getQueryParam('filter[name]', '')"
        class="w-full"
        placeholder="Pesquisar local por nome"
        @update:modelValue="setQueryParam('filter[name]', $event)"
      />
      <AddEntityButton to="/company/records/locales/create" />
    </div>
    <LocalesTable
      :data="data?.data"
      :meta="data?.meta"
      :pending="pending"
      @view="navigateTo(`/company/records/locales/${$event?.id}`)"
      @edit="navigateTo(`/company/records/locales/${$event?.id}/edit`)"
      @delete="confirmDelete($event)"
      @onChangePage="setQueryParam('page', $event)"
    />
  </div>
</template>

<script setup>
import SearchInput from '~/components/shared/form/SearchInput.vue';
import {getQueryParam, setQueryParam, useRouteQueryWatcher} from '~/composables/route-helpers';
import LocalesTable from '~/components/app/company/records/locales/LocalesTable.vue';
import LocaleService from '~/services/api/company/records/locale/LocaleService';
import AddEntityButton from '~/components/shared/AddEntityButton.vue';

const localesService = new LocaleService()
const route = useRoute()

useHead({
  title: 'Locais',
})

definePageMeta({
  permission: 'locales view any',
})

async function fetchLocales() {
  return localesService.index({ ...route.query })
    .catch(() => {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    })
}

const {pending, data, refresh} = useLazyAsyncData('locales', await fetchLocales)

useRouteQueryWatcher(refresh)

async function confirmDelete(entity) {
  const confirm = await useConfirmation({
    title: 'Excluir local',
    message: `Deseja realmente excluir o local ${entity.name}?`,
  })

  if (confirm) {
    try {
      await localesService.destroy(entity.id)
      refresh()
      useNotify('success', 'Local excluído com sucesso.')
    } catch (error) {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    }
  }
}
</script>
