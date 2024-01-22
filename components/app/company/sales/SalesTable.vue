<template>
  <CustomTable
    :headers="headers"
    :items="data"
    :pagination="meta"
    :loading="pending"
    actions
    @onChangePage="emit('onChangePage', $event)"
  >
    <template #columnTotalValueCents="{item}">
      <span v-if="_get(item, 'totalValueCents')">
        {{ useFormattedRealMoney(item.totalValueCents) }}
      </span>
    </template>
    <template #columnCreatedAt="{item}">
      {{ useFormattedDateTime(item?.createdAt) }}
    </template>
    <template #columnUpdatedAt="{item}">
      {{ useFormattedDateTime(item?.updatedAt) }}
    </template>
    <template #columnStatus="{item}">
      <SaleStatusBadge v-if="item?.status" :status="item.status" />
    </template>
    <template #actions="{item}">
      <Can permission="sales view">
        <TableActionButton
          icon="ci:search-magnifying-glass"
          label="Visualizar"
          type="primary"
          @onClick="emit('view', item)"
        />
      </Can>
      <Can permission="sales confirm">
        <TableActionButton
          v-if="item?.status === SaleStatusEnum.PENDING"
          icon="ic:round-check"
          label="Confirmar"
          type="success"
          @onClick="emit('confirm', item)"
        />
      </Can>
      <Can permission="sales delete">
        <TableActionButton
          v-if="item?.status === SaleStatusEnum.PENDING"
          icon="ic:close"
          label="Cancelar venda"
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
import SaleStatusBadge from '~/components/app/company/sales/SaleStatusBadge.vue';
import {SaleStatusEnum} from '~/enums/SaleStatusEnum';

const headers = [
  {value: 'voucher', label: 'Voucher'},
  {value: 'customer.name', label: 'Cliente'},
  {value: 'totalValueCents', label: 'Valor'},
  {value: 'seller.name', label: 'Vendedor'},
  {value: 'createdAt', label: 'Criado em'},
  {value: 'status', label: 'Status'},
]

defineProps(['data', 'meta', 'pending'])

const emit = defineEmits(['edit', 'onChangePage', 'delete', 'view', 'confirm'])

</script>
