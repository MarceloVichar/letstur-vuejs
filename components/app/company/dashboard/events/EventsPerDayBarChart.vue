<template>
  <div class="grid w-full p-2 overflow-hidden bg-base-100 shadow rounded-lg">
    <p class="text-sm">
      Eventos por dia
    </p>
    <VChart :option="chartOptions" class="h-72" />
  </div>
</template>

<script setup>
import VChart from 'vue-echarts';

const props = defineProps({
  events: {
    type: Array,
    required: true,
  },
});

const chartOptions = ref({
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'shadow',
    },
  },
  color: '#33C8B6',
  xAxis: [
    {
      type: 'category',
      data: [],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: 'Eventos',
      type: 'bar',
      barWidth: '60%',
      data: [],
    },
  ],
});

watch(() => props.events, () => setChartData());

onMounted(
  () => setChartData(),
)

const setChartData = () => {
  chartOptions.value.xAxis[0].data = props.events?.map(event => useDayjs()(event?.date).format('DD/MM'))
  chartOptions.value.series[0].data = props.events?.map(event => event?.count)
};

</script>
