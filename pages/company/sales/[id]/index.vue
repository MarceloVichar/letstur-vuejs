<template>
  <div class="">
    <div class="mb-2">
      <button class="btn btn-secondary" @click="$router.back()">
        Voltar
      </button>
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl mb-4">
        Detalhes da venda
      </h2>
      <DataList
        :pending="pending"
        class=" p-2 rounded bg-base-100"
        :data="data"
        :headers="headers"
      >
        <template #columnTotalValueCents>
          <span v-if="_get(data, 'totalValueCents')">
            {{ useFormattedRealMoney(data.totalValueCents) }}
          </span>
        </template>
        <template #columnStatus>
          <SaleStatusBadge v-if="data?.status" :status="data.status" />
        </template>
        <template #columnCustomer>
          <ObjectDataList
            v-if="data?.customer"
            :data="[
              {value: 'Nome', label: data?.customer?.name},
              {value: 'Email', label: data?.customer?.email},
              {value: 'Documento', label: data?.customer?.document},
            ]"
          />
        </template>
        <template #columnSeller>
          <ObjectDataList
            v-if="data?.seller"
            :data="[
              {value: 'Id', label: data?.seller?.id},
              {value: 'Nome', label: data?.seller?.name},
              {value: 'Email', label: data?.seller?.email},
            ]"
          />
        </template>
        <template #columnEvents>
          <div v-for="event in data?.events" :key="event?.id" class="p-2 rounded shadow">
            <p>Quantidade: {{ event?.quantity }}</p>
            <p>Total: {{ useFormattedRealMoney(event?.totalValueCents) }}</p>
            <p>Id do evento: {{ event?.event?.id }}</p>
            <p>Passageiros:</p>
            <ObjectDataList
              v-for="passenger in event?.passengers"
              :key="JSON.stringify(passenger)"
              :data="[
                {value: 'Nome', label: passenger?.name},
                {value: 'Documento', label: passenger?.document},
              ]"
            />
          </div>
        </template>
        <template #columnCreatedAt>
          {{ useFormattedDateTime(data?.createdAt) }}
        </template>
        <template #columnUpdatedAt>
          {{ useFormattedDateTime(data?.updatedAt) }}
        </template>
      </DataList>
    </CentralizedContainer>
  </div>
</template>
<script setup>
import DataList from '~/components/shared/DataList.vue';
import SaleService from '~/services/api/company/sale/SaleService';
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import {useFormattedDateTime, useFormattedRealMoney} from '~/composables/format-field-helpers';
import SaleStatusBadge from '~/components/app/company/sales/SaleStatusBadge.vue';
import ObjectDataList from '~/components/shared/ObjectDataList.vue';

definePageMeta({
  permission: 'sales view',
})

const route = useRoute()
const router = useRouter()

async function fetchData() {
  return await (new SaleService()).get(route.params?.id)
    .then((response) => {
      return response?.item
    })
    .catch(() => {
      useNotify('error', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
      router.back()
    })
}

const {pending, data} = useAsyncData(await fetchData)

const headers = [
  {value: 'id', label: 'ID'},
  {value: 'status', label: 'Status'},
  {value: 'voucher', label: 'Voucher'},
  {value: 'totalValueCents', label: 'Valor'},
  {value: 'customer', label: 'Cliente'},
  {value: 'seller', label: 'Vendedor'},
  {value: 'events', label: 'Eventos'},
  {value: 'createdAt', label: 'Criado em'},
  {value: 'updatedAt', label: 'Atualizado em'},
]
</script>
