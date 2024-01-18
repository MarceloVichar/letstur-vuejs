<template>
  <CustomTable
    :headers="headers"
    :items="data"
    :pagination="meta"
    :loading="pending"
    actions
    @onChangePage="emit('onChangePage', $event)"
  >
    <template #columnTourPriceCents="{item}">
      <span v-if="_get(item, 'tour.priceCents')">
        {{ useFormattedRealMoney(item.tour.priceCents) }}
      </span>
    </template>
    <template #columnDuration="{item}">
      <span v-if="_get(item, 'departureDateTime') && _get(item, 'arrivalDateTime')">
        {{ useDayjs()(item?.arrivalDateTime).diff(item?.departureDateTime, 'hour') }} horas
      </span>
    </template>
    <template #columnDepartureDateTime="{item}">
      {{ useFormattedDateTime(item?.departureDateTime) }}
    </template>
    <template #columnCreatedAt="{item}">
      {{ useFormattedDateTime(item?.createdAt) }}
    </template>
    <template #columnUpdatedAt="{item}">
      {{ useFormattedDateTime(item?.updatedAt) }}
    </template>
    <template #actions="{item}">
      <Can permission="events view">
        <TableActionButton
          icon="ci:search-magnifying-glass"
          label="Visualizar"
          type="primary"
          @onClick="emit('view', item)"
        />
      </Can>
      <Can permission="events update">
        <TableActionButton
          icon="ic:round-mode-edit"
          label="Editar"
          type="warning"
          @onClick="emit('edit', item)"
        />
      </Can>
      <Can permission="events delete">
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

const headers = [
  {value: 'tour.name', label: 'Passeio'},
  {value: 'tour.priceCents', label: 'Preço'},
  {value: 'departureDateTime', label: 'Partida'},
  {value: 'duration', label: 'Duração'},
  {value: 'availableSeats', label: 'Lugares disponíveis'},
  {value: 'createdAt', label: 'Cadastrado em'},
]

defineProps(['data', 'meta', 'pending'])

const emit = defineEmits(['edit', 'onChangePage', 'delete', 'view'])

</script>
