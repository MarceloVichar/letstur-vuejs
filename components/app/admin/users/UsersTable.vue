<template>
  <CustomTable
    :headers="headers"
    :items="data"
    :pagination="meta"
    :loading="pending"
    actions
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
    <template #actions="{item}">
      <TableActionButton
        icon="ci:search-magnifying-glass"
        label="Visualizar"
        type="info"
        @onClick="emit('view', item)"
      />
      <TableActionButton
        v-if="item?.id !== auth.user?.id"
        icon="ic:round-mode-edit"
        label="Editar"
        type="warning"
        @onClick="emit('edit', item)"
      />
      <TableActionButton
        v-if="item?.id !== auth.user?.id"
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
import {userRoles} from '~/data/objects';
import TableActionButton from '~/components/shared/TableActionButton.vue';
import {useAuth} from '~/store/auth';

const auth = useAuth()

const headers = [
  {value: 'name', label: 'Nome'},
  {value: 'roles.0', label: 'Função'},
  {value: 'company.name', label: 'Empresa'},
  {value: 'createdAt', label: 'Cadastrado em'},
]

defineProps(['data', 'meta', 'pending'])
const emit = defineEmits(['edit', 'onChangePage', 'delete', 'view'])

const getRoleLabel = (role) => {
  return userRoles?.find((userRole) => userRole.value === role)?.label || role
}

</script>
