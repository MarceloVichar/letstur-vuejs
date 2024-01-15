<template>
  <CustomTable
    :headers="headers"
    :items="data"
    :pagination="meta"
    :loading="pending"
    actions
    @onChangePage="emit('onChangePage', $event)"
  >
    <template #columnType="{item}">
      {{ getVehicleTypeLabel(item?.type) }}
    </template>
    <template #columnLicensePlate="{item}">
      {{ useFormattedLicensePlate(item?.licensePlate) }}
    </template>
    <template #columnCreatedAt="{item}">
      {{ useFormattedDateTime(item?.createdAt) }}
    </template>
    <template #columnUpdatedAt="{item}">
      {{ useFormattedDateTime(item?.updatedAt) }}
    </template>
    <template #actions="{item}">
      <Can permission="vehicles view">
        <TableActionButton
          icon="ci:search-magnifying-glass"
          label="Visualizar"
          type="primary"
          @onClick="emit('view', item)"
        />
      </Can>
      <Can permission="vehicles update">
        <TableActionButton
          icon="ic:round-mode-edit"
          label="Editar"
          type="warning"
          @onClick="emit('edit', item)"
        />
      </Can>
      <Can permission="vehicles delete">
        <TableActionButton
          icon="ic:round-delete"
          label="Deletar"
          type="error"
          @onClick="emit('delete', item)"
        />
      </Can>
    </template>
  </CustomTable>
</template>

<script setup>
import CustomTable from '~/components/shared/CustomTable.vue';
import {useFormattedDateTime} from '~/composables/format-field-helpers';
import TableActionButton from '~/components/shared/TableActionButton.vue';
import Can from '~/components/shared/Can.vue';
import {useAuth} from '~/store/auth';
import {vehicleTypes} from '~/data/objects';

const auth = useAuth()

const headers = [
  {value: 'model', label: 'Modelo'},
  {value: 'type', label: 'Tipo'},
  {value: 'licensePlate', label: 'Placa'},
  {value: 'cnhTypeRequired', label: 'CNH requerida'},
  {value: 'ownerName', label: 'Proprietário'},
  {value: 'createdAt', label: 'Cadastrado em'},
  {value: 'updatedAt', label: 'Atualizado em'},
]

defineProps(['data', 'meta', 'pending'])

const emit = defineEmits(['edit', 'onChangePage', 'delete', 'view'])

const getVehicleTypeLabel = (currentVehicleType) => {
  return vehicleTypes.find((vehicleType) => vehicleType.value === currentVehicleType)?.label || currentVehicleType
}

</script>
