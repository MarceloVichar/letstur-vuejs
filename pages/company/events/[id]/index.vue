<template>
  <div class="">
    <div class="mb-2">
      <BackScreenButton />
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl mb-4">
        Detalhes do evento
      </h2>
      <DataList
        :pending="pending"
        class=" p-2 rounded bg-base-100"
        :data="data"
        :headers="headers"
      >
        <template #columnTourPriceCents="{item}">
          <span v-if="_get(item, 'tour.priceCents')">
            {{ useFormattedRealMoney(item.tour.priceCents) }}
          </span>
        </template>
        <template #columnDepartureDateTime="{item}">
          {{ useFormattedDateTime(item?.departureDateTime) }}
        </template>
        <template #columnArrivalDateTime="{item}">
          {{ useFormattedDateTime(item?.arrivalDateTime) }}
        </template>
        <template #columnCreatedAt>
          {{ useFormattedDateTime(data?.createdAt) }}
        </template>
        <template #columnUpdatedAt>
          {{ useFormattedDateTime(data?.updatedAt) }}
        </template>
      </DataList>
    </CentralizedContainer>
  </div>
</template>
<script setup>
import DataList from '~/components/shared/DataList.vue';
import EventService from '~/services/api/company/event/EventService';
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import {useFormattedDateTime, useFormattedRealMoney} from '~/composables/format-field-helpers';
import BackScreenButton from '~/components/shared/BackScreenButton.vue';

definePageMeta({
  permission: 'events view',
})

const route = useRoute()
const router = useRouter()

async function fetchData() {
  return await (new EventService()).get(route.params?.id)
    .then((response) => {
      return response?.item
    })
    .catch(() => {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
      router.back()
    })
}

const {pending, data} = useAsyncData(await fetchData)

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
  {value: 'createdAt', label: 'Criado em'},
  {value: 'updatedAt', label: 'Atualizado em'},
]
</script>
