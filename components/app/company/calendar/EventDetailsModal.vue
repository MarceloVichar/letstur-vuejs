<template>
  <CustomModal @close="emit('close')">
    <div class="md:w-[700px]">
      <h2 class="text-center font-bold text-xl mb-4">
        Detalhes do evento
      </h2>
      <DataList
        class=" p-2 rounded bg-base-100"
        :data="event"
        :headers="headers"
      >
        <template #columnTourPriceCents>
          <span v-if="_get(event, 'tour.priceCents')">
            {{ useFormattedRealMoney(event.tour?.priceCents) }}
          </span>
        </template>
        <template #columnDepartureDateTime>
          {{ useFormattedDateTime(event?.departureDateTime) }}
        </template>
        <template #columnArrivalDateTime>
          {{ useFormattedDateTime(event?.arrivalDateTime) }}
        </template>
      </DataList>
    </div>
  </CustomModal>
</template>

<script setup>
import CustomModal from '~/components/shared/CustomModal.vue';
import DataList from '~/components/shared/DataList.vue';

defineProps({
  event: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close'])

const headers = [
  {value: 'id', label: 'ID'},
  {value: 'totalSeats', label: 'Total de assentos'},
  {value: 'availableSeats', label: 'Lugares disponíveis'},
  {value: 'departureDateTime', label: 'Partida'},
  {value: 'arrivalDateTime', label: 'Chegada'},
  {value: 'tour.name', label: 'Passeio'},
  {value: 'driver.name', label: 'Motorista'},
  {value: 'vehicle.model', label: 'Veículo'},
  {value: 'tourGuide.name', label: 'Guia de passeio'},
]
</script>
