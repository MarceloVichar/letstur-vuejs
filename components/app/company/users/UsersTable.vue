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
      <Can permission="users view">
        <TableActionButton
          icon="ci:search-magnifying-glass"
          label="Visualizar"
          type="primary"
          @onClick="emit('view', item)"
        />
      </Can>
      <Can permission="users update">
        <TableActionButton
          v-if="item?.id !== auth.user?.id"
          icon="ic:round-mode-edit"
          label="Editar"
          type="warning"
          @onClick="emit('edit', item)"
        />
      </Can>
      <Can permission="users delete">
        <TableActionButton
          v-if="item?.id !== auth.user?.id"
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
import {companyUserRoles} from '~/data/objects';
import TableActionButton from '~/components/shared/TableActionButton.vue';
import Can from '~/components/shared/Can.vue';
import {useAuth} from '~/store/auth';

const auth = useAuth()

const headers = [
  {value: 'name', label: 'Nome'},
  {value: 'roles.0', label: 'Função'},
  {value: 'createdAt', label: 'Cadastrado em'},
  {value: 'updatedAt', label: 'Atualizado em'},
]

defineProps(['data', 'meta', 'pending'])
const emit = defineEmits(['edit', 'onChangePage', 'delete', 'view'])

const getRoleLabel = (role) => {
  return companyUserRoles?.find((userRole) => userRole.value === role)?.label || role
}

</script>
