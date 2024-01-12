<template>
  <CustomTable
    :headers="headers"
    :items="data"
    :pagination="meta"
    :loading="pending"
    :actions="actions"
    @onChangePage="emit('onChangePage', $event)"
  >
    <template #columnRoles0="{item}">
      {{ getRoleLabel(item?.roles?.[0]) }}
    </template>
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
import {userRoles} from '~/data/objects';

const headers = [
  {value: 'name', label: 'Nome'},
  {value: 'roles.0', label: 'Função'},
  {value: 'company.name', label: 'Empresa'},
  {value: 'createdAt', label: 'Cadastrado em'},
]

defineProps(['data', 'meta', 'pending'])
const emit = defineEmits(['edit', 'onChangePage', 'delete', 'view'])

const actions = [
  {value: 'view', label: 'Visualizar', icon: 'ci:search-magnifying-glass', type: 'info', onClick: (item) => emit('view', item)},
  {value: 'edit', label: 'Editar', icon: 'ic:round-mode-edit', type: 'warning', onClick: (item) => emit('edit', item)},
  {value: 'delete', label: 'Deletar', icon: 'ic:round-delete', type:'error', onClick: (item) => emit('delete', item)},
]

const getRoleLabel = (role) => {
  return userRoles?.find((userRole) => userRole.value === role)?.label || role
}

</script>
