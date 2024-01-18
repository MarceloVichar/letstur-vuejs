<template>
  <div class="">
    <div class="mb-2">
      <button class="btn btn-secondary" @click="$router.back()">
        Voltar
      </button>
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl mb-4">
        Detalhes do passeio
      </h2>
      <DataList
        :pending="pending"
        class=" p-2 rounded bg-base-100"
        :data="data"
        :headers="headers"
      >
        <template #columnRoundTrip="{item}">
          <span v-if="_get(item, 'roundTrip')">
            {{ item.roundTrip }} Km
          </span>
        </template>
        <template #columnPriceCents="{item}">
          <span v-if="_get(item, 'priceCents')">
            {{ useFormattedRealMoney(item.priceCents) }}
          </span>
        </template>
        <template #columnLocale>
          <ObjectDataList
            v-if="data?.locale"
            :data="[
              {value: 'Nome', label: data?.locale?.name},
              {value: 'Cep', label: data?.locale?.zipCode},
              {value: 'Rua', label: data?.locale?.street},
              {value: 'Número', label: data?.locale?.number},
              {value: 'Complemento', label: data?.locale?.complement},
              {value: 'Bairro', label: data?.locale?.district},
              {value: 'Cidade', label: data?.locale?.city},
              {value: 'Estado', label: data?.locale?.uf},
              {value: 'Responsável', label: data?.locale?.responsibleName},
              {value: 'Telefone', label: data?.locale?.responsiblePhone},
            ]"
          />
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
import TourService from '~/services/api/company/records/tour/TourService';
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import {useFormattedDateTime, useFormattedRealMoney} from '~/composables/format-field-helpers';
import ObjectDataList from '~/components/shared/ObjectDataList.vue';

definePageMeta({
  permission: 'tours view',
})

const route = useRoute()
const router = useRouter()

async function fetchData() {
  return await (new TourService()).get(route.params?.id)
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
  {value: 'name', label: 'Nome'},
  {value: 'roundTrip', label: 'Distância'},
  {value: 'priceCents', label: 'Preço'},
  {value: 'note', label: 'Observação'},
  {value: 'locale', label: 'Local'},
  {value: 'tourType.name', label: 'Tipo de passeio'},
  {value: 'createdAt', label: 'Criado em'},
  {value: 'updatedAt', label: 'Atualizado em'},
]
</script>
