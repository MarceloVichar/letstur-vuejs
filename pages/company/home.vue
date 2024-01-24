<template>
  <div>
    <div v-if="loadedQuery">
      <FiltersForm :model-value="$route.query" @update:modelValue="refreshSearch" />
      <div class="grid gap-3">
        <Can permission="events view any">
          <EventsInfos />
        </Can>
        <Can permission="sales view any">
          <SalesInfos />
        </Can>
      </div>
    </div>
  </div>
</template>

<script setup>
import Can from '~/components/shared/Can.vue';
import EventsInfos from '~/components/app/company/dashboard/events/EventsInfos.vue';
import SalesInfos from '~/components/app/company/dashboard/sales/SalesInfos.vue';
import FiltersForm from '~/components/app/company/dashboard/FiltersForm.vue';

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'Dashboard',
})

const loadedQuery = ref(false)

onMounted(async () => {
  if (!getQueryParam('startDate') && !getQueryParam('endDate')) {
    await setQueryParam({
      ['startDate']: useDayjs()().startOf('month').toISOString(),
      ['endDate']: useDayjs()().endOf('month').toISOString(),
    })
  }
  setTimeout(() => {
    loadedQuery.value = true
  }, 100)
})

function refreshSearch(val) {
  setQueryParam({
    ['startDate']: val?.startDate,
    ['endDate']: val?.endDate,
  })
}
</script>
