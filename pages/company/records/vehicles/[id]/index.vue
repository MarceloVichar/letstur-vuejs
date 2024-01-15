<template>
  <div class="">
    <div class="mb-2">
      <button class="btn btn-secondary" @click="$router.back()">
        Voltar
      </button>
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl mb-4">
        Detalhes do veículo
      </h2>
      <DataList
        :pending="pending"
        class=" p-2 rounded bg-base-100"
        :data="data"
        :headers="headers"
      >
        <template #columnOwnerDocument="{item}">
          {{ useFormattedDocument(item?.ownerDocument) }}
        </template>
        <template #columnOwnerPhone="{item}">
          {{ useFormattedPhone(item?.ownerPhone) }}
        </template>
        <template #columnType="{item}">
          {{ getVehicleTypeLabel(item?.type) }}
        </template>
        <template #columnLicensePlate="{item}">
          {{ useFormattedLicensePlate(item?.licensePlate) }}
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
import VehicleService from '~/services/api/company/records/vehicle/VehicleService';
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import {useFormattedDateTime} from '~/composables/format-field-helpers';
import {vehicleTypes} from '~/data/objects';

definePageMeta({
  permission: 'vehicles view',
})

const route = useRoute()
const router = useRouter()

async function fetchData() {
  return await (new VehicleService()).get(route.params?.id)
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
  {value: 'model', label: 'Modelo'},
  {value: 'type', label: 'Tipo'},
  {value: 'licensePlate', label: 'Placa'},
  {value: 'numberOfSeats', label: 'Número de assentos'},
  {value: 'ownerName', label: 'Nome do proprietário'},
  {value: 'ownerDocument', label: 'Documento do proprietário'},
  {value: 'ownerEmail', label: 'Email do proprietário'},
  {value: 'ownerPhone', label: 'Telefone do proprietário'},
  {value: 'createdAt', label: 'Criado em'},
  {value: 'updatedAt', label: 'Atualizado em'},
]

const getVehicleTypeLabel = (currentVehicleType) => {
  return vehicleTypes.find((vehicleType) => vehicleType.value === currentVehicleType)?.label || currentVehicleType
}
</script>
