<template>
  <CustomTable
    :headers="headers"
    :items="data"
    :pagination="meta"
    :loading="pending"
    actions
    @onChangePage="emit('onChangePage', $event)"
  >
    <template #columnCreatedAt="{item}">
      {{ useFormattedDateTime(item?.createdAt) }}
    </template>
    <template #columnUpdatedAt="{item}">
      {{ useFormattedDateTime(item?.updatedAt) }}
    </template>
    <template #actions="{item}">
      <TableActionButton
        icon="ci:search-magnifying-glass"
        label="Visualizar"
        type="info"
        @onClick="emit('view', item)"
      />
      <TableActionButton
        icon="ic:round-mode-edit"
        label="Editar"
        type="warning"
        @onClick="emit('edit', item)"
      />
      <TableActionButton
        icon="ic:round-delete"
        label="Deletar"
        type="error"
        @onClick="emit('delete', item)"
      />
    </template>
  </CustomTable>
</template>

<script setup>
import CustomTable from '~/components/shared/CustomTable.vue';
import {useFormattedDateTime} from '~/composables/format-field-helpers';
import TableActionButton from '~/components/shared/TableActionButton.vue';

const headers = [
  {value: 'name', label: 'Nome'},
  {value: 'email', label: 'Email'},
  {value: 'createdAt', label: 'Criado em'},
  {value: 'updatedAt', label: 'Atualizado em'},
]

defineProps(['data', 'meta', 'pending'])
const emit = defineEmits(['edit', 'onChangePage', 'delete', 'view'])

</script>
