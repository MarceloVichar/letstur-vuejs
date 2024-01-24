<template>
  <div>
    <span>Vendas</span>
    <div v-if="pending" class="flex justify-center items-center py-12">
      <Loader />
    </div>
    <div v-else class="grid gap-4">
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          title="Total confirmado"
          type="success"
          :text="useFormattedRealMoney(confirmedSales?.amountCents || 0)"
          class="sm:col-span-2 lg:col-span-1"
        />
        <Card
          title="Vendas confirmadas"
          type="success"
          :text="confirmedSales?.count || 0"
        />
        <Card
          title="Vendas pendentes"
          type="info"
          :text="pendingSales?.count || 0"
        />
      </div>
      <div class="grid lg:grid-cols-3 gap-4 w-full">
        <SalesPerDayBarChart :sales="data?.salesByDate" class="lg:col-span-2" />
        <SalesInfosPieChart :sales-by-status="data?.salesByStatus" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Card from '~/components/shared/Card.vue';
import DashboardService from '~/services/api/company/dashboard/DashboardService';
import Loader from '~/components/shared/Loader.vue';
import {SaleStatusEnum} from '~/enums/SaleStatusEnum';
import SalesInfosPieChart from '~/components/app/company/dashboard/sales/SalesInfosPieChart.vue';
import SalesPerDayBarChart from '~/components/app/company/dashboard/sales/SalesPerDayBarChart.vue';

const dashboardService = new DashboardService();

const route = useRoute()

async function fetchEvents() {
  if (!route.query.startDate || !route.query.endDate) {
    return
  }
  return dashboardService.getSalesInfos(route.query)
    .catch(() => {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    })
}

const {pending, data, refresh} = useLazyAsyncData('salesInfo', await fetchEvents)

const confirmedSales = computed(() => {
  return data.value?.salesByStatus?.find(sale => sale?.status === SaleStatusEnum.CONFIRMED)
})

const pendingSales = computed(() => {
  return data.value?.salesByStatus?.find(sale => sale?.status === SaleStatusEnum.PENDING)
})

useRouteQueryWatcher(refresh)
</script>
