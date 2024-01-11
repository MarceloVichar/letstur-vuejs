<template>
  <div class="">
    <div class="mb-2">
      <button class="btn btn-secondary" @click="$router.back()">
        Voltar
      </button>
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl mb-4">
        Detalhes da empresa
      </h2>
      <DataList
        :pending="pending"
        class=" p-2 rounded bg-base-100"
        :data="data"
        :headers="headers"
      >
        <template #columnCnpj="{item}">
          <span v-if="item?.cnpj">
            {{ useFormattedDocument(item?.cnpj) }}
          </span>
        </template>
        <template #columnPhone="{item}">
          <span v-if="item?.phone">
            {{ useFormattedPhone(item?.phone) }}
          </span>
        </template>
        <template #columnSecondaryPhone="{item}">
          <span v-if="item?.secondaryPhone">
            {{ useFormattedPhone(item?.secondaryPhone) }}
          </span>
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
import CompanyService from '~/services/api/admin/CompanyService';
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import {useFormattedDocument, useFormattedPhone} from '~/composables/format-field-helpers';

const route = useRoute()
const router = useRouter()

async function fetchData() {
  return await (new CompanyService()).get(route.params?.id)
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
  {value: 'name', label: 'Nome'},
  {value: 'tradingName', label: 'Nome fantasia'},
  {value: 'cnpj', label: 'CNPJ'},
  {value: 'ie', label: 'Iscrição estadual'},
  {value: 'email', label: 'Email'},
  {value: 'phone', label: 'Telefone'},
  {value: 'secondaryPhone', label: 'Telefone 2'},
  {value: 'createdAt', label: 'Criado em'},
  {value: 'updatedAt', label: 'Atualizado em'},
]

</script>
