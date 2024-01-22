<template>
  <div class="badge py-1 badge-outline" :class="statusColorClass">
    {{ statusLabel }}
  </div>
</template>

<script setup>
import {SaleStatus} from '~/data/objects';
import {SaleStatusEnum} from '~/enums/SaleStatusEnum';

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
})

const statusLabel = computed(() => {
  return SaleStatus.find((item) => item.value === props.status)?.label
})

const statusColorClass = computed(() => {
  switch (props.status) {
    case SaleStatusEnum.PENDING:
      return 'badge-info'
    case SaleStatusEnum.CONFIRMED:
      return 'badge-success'
    default:
      return ''
  }
})

</script>
