<template>
  <CustomTable
    :headers="headers"
    :items="data"
    :pagination="meta"
    :loading="pending"
    :actions="actions"
    @onChangePage="emit('onChangePage', $event)"
  >
    <template #columnCreatedAt="{item}">
      {{ useFormattedDateTime(item?.createdAt) }}
    </template>
    <template #columnUpdatedAt="{item}">
      {{ useFormattedDateTime(item?.updatedAt) }}
    </template>
  </CustomTable>
</template>

<script setup>
import CustomTable from '~/components/shared/CustomTable.vue';
import {useFormattedDateTime} from '~/composables/format-field-helpers';

const headers = [
  {value: 'name', label: 'Nome'},
  {value: 'email', label: 'Email'},
  {value: 'createdAt', label: 'Criado em'},
  {value: 'updatedAt', label: 'Atualizado em'},
]

defineProps(['data', 'meta', 'pending'])
const emit = defineEmits(['edit', 'onChangePage', 'delete', 'view'])

const actions = [
  {value: 'view', label: 'Visualizar', icon: 'ci:search-magnifying-glass', type: 'info', onClick: (item) => emit('view', item)},
  {value: 'edit', label: 'Editar', icon: 'ic:round-mode-edit', type: 'warning', onClick: (item) => emit('edit', item)},
  {value: 'delete', label: 'Deletar', icon: 'ic:round-delete', type:'error', onClick: (item) => emit('delete', item)},
]

</script>
