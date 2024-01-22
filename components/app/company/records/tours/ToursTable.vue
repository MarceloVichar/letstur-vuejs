<template>
  <CustomTable
    :headers="headers"
    :items="data"
    :pagination="meta"
    :loading="pending"
    actions
    @onChangePage="emit('onChangePage', $event)"
  >
    <template #columnRoundTrip="{item}">
      <span v-if="_get(item, 'roundTrip')">
        {{ item.roundTrip }} Km
      </span>
    </template>
    <template #columnPriceCents="{item}">
      <span v-if="_get(item, 'priceCents')">
        {{ useFormattedRealMoney(item.priceCents) }}
      </span>
    </template>
    <template #columnCreatedAt="{item}">
      {{ useFormattedDateTime(item?.createdAt) }}
    </template>
    <template #columnUpdatedAt="{item}">
      {{ useFormattedDateTime(item?.updatedAt) }}
    </template>
    <template #actions="{item}">
      <Can permission="tours view">
        <TableActionButton
          icon="ci:search-magnifying-glass"
          label="Visualizar"
          type="primary"
          @onClick="emit('view', item)"
        />
      </Can>
      <Can permission="tours update">
        <TableActionButton
          icon="ic:round-mode-edit"
          label="Editar"
          type="warning"
          @onClick="emit('edit', item)"
        />
      </Can>
      <Can permission="tours delete">
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
import {useFormattedDateTime, useFormattedRealMoney} from '~/composables/format-field-helpers';
import TableActionButton from '~/components/shared/TableActionButton.vue';
import Can from '~/components/shared/Can.vue';

const headers = [
  {value: 'name', label: 'Nome'},
  {value: 'roundTrip', label: 'Distância'},
  {value: 'priceCents', label: 'Preço'},
  {value: 'locale.name', label: 'Local'},
  {value: 'tourType.name', label: 'Tipo de passeio'},
  {value: 'createdAt', label: 'Cadastrado em'},
  {value: 'updatedAt', label: 'Atualizado em'},
]

defineProps(['data', 'meta', 'pending'])

const emit = defineEmits(['edit', 'onChangePage', 'delete', 'view'])

</script>
