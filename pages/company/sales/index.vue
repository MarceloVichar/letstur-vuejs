<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-end">
      <Can permission="sales create" text="Nova venda">
        <AddEntityButton to="/company/sales/create" />
      </Can>
    </div>
    <SalesFiltersForm />
    <SalesTable
      :data="data?.data"
      :meta="data?.meta"
      :pending="pending"
      @view="navigateTo(`/company/sales/${$event?.id}`)"
      @edit="navigateTo(`/company/sales/${$event?.id}/edit`)"
      @delete="confirmDelete($event)"
      @confirm="confirmSale($event)"
      @onChangePage="setQueryParam('page', $event)"
    />
  </div>
</template>

<script setup>
import {setQueryParam, useRouteQueryWatcher} from '~/composables/route-helpers';
import SalesTable from '~/components/app/company/sales/SalesTable.vue';
import SaleService from '~/services/api/company/sale/SaleService';
import SalesFiltersForm from '~/components/app/company/sales/SalesFiltersForm.vue';
import AddEntityButton from '~/components/shared/AddEntityButton.vue';
import Can from '~/components/shared/Can.vue';

const salesService = new SaleService()
const route = useRoute()

useHead({
  title: 'Vendas',
})

definePageMeta({
  permission: 'sales view any',
})

async function fetchSales() {
  return salesService.index({ ...route.query })
    .catch(() => {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    })
}

const {pending, data, refresh} = useLazyAsyncData('sales', await fetchSales)

useRouteQueryWatcher(refresh)

async function confirmDelete(entity) {
  const confirm = await useConfirmation({
    title: 'Cancelar venda',
    message: `Deseja realmente cancelar a venda para o cliente ${entity?.customer?.name}?`,
    cancelButtonMessage:'Não',
    confirmButtonMessage:'Sim',
  })

  if (confirm) {
    try {
      await salesService.destroy(entity.id)
      refresh()
      useNotify('success', 'Venda cancelada com sucesso.')
    } catch (error) {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    }
  }
}

async function confirmSale(entity) {
  const confirm = await useConfirmation({
    title: 'Confirmar venda',
    message: `Deseja realmente confirmar a venda ${entity.model}?`,
    type: 'success',
  })

  if (confirm) {
    try {
      await salesService.confirmSale(entity.id)
      refresh()
      useNotify('success', 'Venda confirmada com sucesso.')
    } catch (error) {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    }
  }
}
</script>
