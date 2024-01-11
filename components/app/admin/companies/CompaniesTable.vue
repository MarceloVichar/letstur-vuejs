<template>
  <CustomTable
    :headers="headers"
    :items="data"
    :pagination="meta"
    :loading="pending"
    :actions="actions"
    @onChangePage="emit('onChangePage', $event)"
  />
</template>

<script setup>
import CustomTable from '~/components/shared/CustomTable.vue';

const headers = [
  {value: 'name', text: 'Nome'},
  {value: 'tradingName', text: 'Nome Fantasia'},
  {value: 'createdAt', text: 'Criado em'},
  {value: 'updatedAt', text: 'Atualizado em'},
]

defineProps(['data', 'meta', 'pending'])
const emit = defineEmits(['edit', 'onChangePage', 'delete'])

const actions = [
  {value: 'edit', label: 'Editar', icon: 'ic:round-mode-edit', type: 'warning', onClick: emit('edit')},
  {value: 'delete', label: 'Deletar', icon: 'ic:round-delete', type:'error', onClick: emit('delete')},
]

</script>
