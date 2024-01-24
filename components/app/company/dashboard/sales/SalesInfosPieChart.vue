<template>
  <div class="grid w-full p-2 overflow-hidden bg-base-100 shadow rounded-lg">
    <p class="text-sm">
      Vendas por status
    </p>
    <VChart :option="chartOptions" class="h-72" />
  </div>
</template>

<script setup>
import VChart from 'vue-echarts';
import {SaleStatus} from '~/data/objects';

const props = defineProps({
  salesByStatus: {
    type: Array,
    required: true,
  },
});

const chartOptions = ref({
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      radius: '90%',
      name: 'Vendas',
      type: 'pie',
      avoidLabelOverlap: true,
      emphasis: {
        label: {
          show: false,
          fontSize: 16,
        },
      },
      label: {
        show: false,
        position: 'center',
      },
      data: [],
      color: ['#10B981', '#57B7E8'],
    },
  ],
});

watch(() => props.availableSeats, () => setChartData());
watch(() => props.occupiedSeats, () => setChartData());

onMounted(
  () => setChartData(),
)

const setChartData = () => {
  chartOptions.value.series[0].data = props.salesByStatus?.map(sale => ({
    value: sale?.count,
    name: SaleStatus?.find(status => status?.value === sale?.status)?.label || sale?.status,
  }));
};

</script>
