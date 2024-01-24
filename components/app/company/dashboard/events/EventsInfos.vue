<template>
  <div>
    <span>Eventos</span>
    <div v-if="pending" class="flex justify-center items-center py-12">
      <Loader />
    </div>
    <div v-else class="grid gap-4">
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          title="Total de eventos"
          type="info"
          :text="data?.totalEvents"
          class="sm:col-span-2 lg:col-span-1"
        />
        <Card title="Total de lugares" type="warning" :text="data?.totalSeats" />
        <Card title="Lugares disponíveis" type="success" :text="data?.totalAvailableSeats" />
      </div>
      <div class="grid lg:grid-cols-3 gap-4 w-full">
        <EventsPerDayBarChart class="lg:col-span-2" :events="data?.datesWithEvents" />
        <EventSalesPieChart
          :available-seats="data?.totalAvailableSeats"
          :occupied-seats="data?.totalSeats - data?.totalAvailableSeats"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Card from '~/components/shared/Card.vue';
import DashboardService from '~/services/api/company/dashboard/DashboardService';
import EventSalesPieChart from '~/components/app/company/dashboard/events/EventInfosPieChart.vue';
import EventsPerDayBarChart from '~/components/app/company/dashboard/events/EventsPerDayBarChart.vue';
import Loader from '~/components/shared/Loader.vue';

const dashboardService = new DashboardService();

const route = useRoute()

async function fetchEvents() {
  if (!route.query.startDate || !route.query.endDate) {
    return
  }
  return dashboardService.getEventsInfos(route.query)
    .catch(() => {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    })
}

const {pending, data, refresh} = useLazyAsyncData('eventsInfos', await fetchEvents)

useRouteQueryWatcher(refresh)
</script>
