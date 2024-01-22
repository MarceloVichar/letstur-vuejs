<template>
  <div class="flex flex-col gap-4">
    <Calendar v-if="!pending" :events="data?.data" @dateRangeChanged="(info) => setDateRange(info)" />
  </div>
</template>

<script setup>
import {useRouteQueryWatcher} from '~/composables/route-helpers';
import EventService from '~/services/api/company/event/EventService';
import Calendar from '~/components/app/company/calendar/Calendar.vue';

const eventsService = new EventService()

useHead({
  title: 'Calendário',
})

definePageMeta({
  permission: 'events view any',
})

const {width} = useWindowSize()

const dateRange = reactive({
  start: width.value > 768 ? useDayjs()().startOf('month').toISOString() : useDayjs()().startOf('day').toISOString(),
  end: width.value > 768 ? useDayjs()().endOf('month').toISOString() : useDayjs()().endOf('day').toISOString(),
})

async function fetchEvents() {
  return eventsService.index({
    'filter[departure_start_date]': dateRange?.start,
    'filter[departure_end_date]': dateRange?.end,
    perPage: 100,
  })
    .catch(() => {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    })
}

const {pending, data, refresh} = useLazyAsyncData('events', await fetchEvents)

useRouteQueryWatcher(refresh)

const setDateRange = async (info) => {
  dateRange.start = info.start
  dateRange.end = info.end
  data.value = await fetchEvents()
}
</script>
