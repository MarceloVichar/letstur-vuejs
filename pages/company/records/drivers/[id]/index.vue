<template>
  <div class="">
    <div class="mb-2">
      <button class="btn btn-secondary" @click="$router.back()">
        Voltar
      </button>
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl mb-4">
        Detalhes do motorista
      </h2>
      <DataList
        :pending="pending"
        class=" p-2 rounded bg-base-100"
        :data="data"
        :headers="headers"
      >
        <template #columnDocument="{item}">
          {{ useFormattedDocument(item?.document) }}
        </template>
        <template #columnPhone="{item}">
          {{ useFormattedPhone(item?.phone) }}
        </template>
        <template #columnDateOfBirth>
          {{ useFormattedDate(data?.dateOfBirth) }}
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
import DriverService from '~/services/api/company/records/driver/DriverService';
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import {useFormattedDate, useFormattedDateTime} from '~/composables/format-field-helpers';

definePageMeta({
  permission: 'drivers view',
})

const route = useRoute()
const router = useRouter()

async function fetchData() {
  return await (new DriverService()).get(route.params?.id)
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
  {value: 'cnh', label: 'CNH'},
  {value: 'cnhType', label: 'Tipo da CNH'},
  {value: 'document', label: 'Documento'},
  {value: 'email', label: 'Email'},
  {value: 'phone', label: 'Telefone'},
  {value: 'dateOfBirth', label: 'Data de nascimento'},
  {value: 'createdAt', label: 'Criado em'},
  {value: 'updatedAt', label: 'Atualizado em'},
]
</script>
