<template>
  <CustomTable
    :headers="headers"
    :items="data"
    :pagination="meta"
    :loading="pending"
    actions
    @onChangePage="emit('onChangePage', $event)"
  >
    <template #columnIsTransfer="{item}">
      <div v-if="_has(item, 'isTransfer')">
        <Icon v-if="item?.isTransfer" name="material-symbols:check-circle" class="text-lg text-success" />
        <Icon v-else name="material-symbols:cancel" class="text-lg text-error" />
      </div>
    </template>
    <template #columnIsExclusive="{item}">
      <div v-if="_has(item, 'isExclusive')">
        <Icon v-if="item?.isExclusive" name="material-symbols:check-circle" class="text-lg text-success" />
        <Icon v-else name="material-symbols:cancel" class="text-lg text-error" />
      </div>
    </template>
    <template #columnColor="{item}">
      <div
        v-if="_has(item, 'color')"
        class="w-4 h-4 rounded-full border"
        :title="item?.color"
        :style="{backgroundColor: item?.color}"
      />
    </template>
    <template #columnCreatedAt="{item}">
      {{ useFormattedDateTime(item?.createdAt) }}
    </template>
    <template #columnUpdatedAt="{item}">
      {{ useFormattedDateTime(item?.updatedAt) }}
    </template>
    <template #actions="{item}">
      <Can permission="tour-types update">
        <TableActionButton
          icon="ic:round-mode-edit"
          label="Editar"
          type="warning"
          @onClick="emit('edit', item)"
        />
      </Can>
      <Can permission="tour-types delete">
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
  {value: 'isTransfer', label: 'Transfer'},
  {value: 'isExclusive', label: 'Exclusivo'},
  {value: 'color', label: 'Cor'},
  {value: 'createdAt', label: 'Cadastrado em'},
  {value: 'updatedAt', label: 'Atualizado em'},
]

defineProps(['data', 'meta', 'pending'])

const emit = defineEmits(['edit', 'onChangePage', 'delete', 'view'])

</script>
