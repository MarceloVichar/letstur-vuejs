<template>
  <div class="grid w-full p-2 overflow-hidden bg-base-100 shadow rounded-lg">
    <p class="text-sm">
      Ocupação em eventos
    </p>
    <VChart :option="chartOptions" class="h-72" />
  </div>
</template>

<script setup>
import VChart from 'vue-echarts';

const props = defineProps({
  availableSeats: {
    type: Number,
    required: true,
  },
  occupiedSeats: {
    type: Number,
    required: true,
  },
});

const chartOptions = ref({
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      radius: ['50%', '90%'],
      name: 'Lugares',
      type: 'pie',
      avoidLabelOverlap: true,
      emphasis: {
        label: {
          show: true,
          fontSize: 16,
        },
      },
      label: {
        show: false,
        position: 'center',
      },
      data: [],
      color: ['#10B981', '#F59E0B'],
    },
  ],
});

watch(() => props.availableSeats, () => setChartData());
watch(() => props.occupiedSeats, () => setChartData());

onMounted(
  () => setChartData(),
)

const setChartData = () => {
  chartOptions.value.series[0].data = [
    {value: props.availableSeats, name: 'Disponíveis'},
    {value: props.occupiedSeats, name: 'Ocupados'},
  ];
};

</script>
