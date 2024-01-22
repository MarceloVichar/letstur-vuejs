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
      <Can permission="tour-guides view">
        <TableActionButton
          icon="ci:search-magnifying-glass"
          label="Visualizar"
          type="primary"
          @onClick="emit('view', item)"
        />
      </Can>
      <Can permission="tour-guides update">
        <TableActionButton
          icon="ic:round-mode-edit"
          label="Editar"
          type="warning"
          @onClick="emit('edit', item)"
        />
      </Can>
      <Can permission="tour-guides delete">
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
  {value: 'name', label: 'Nome'},
  {value: 'email', label: 'Email'},
  {value: 'createdAt', label: 'Cadastrado em'},
  {value: 'updatedAt', label: 'Atualizado em'},
]

defineProps(['data', 'meta', 'pending'])

const emit = defineEmits(['edit', 'onChangePage', 'delete', 'view'])

</script>
