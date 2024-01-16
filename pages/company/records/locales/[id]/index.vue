<template>
  <div class="">
    <div class="mb-2">
      <button class="btn btn-secondary" @click="$router.back()">
        Voltar
      </button>
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl mb-4">
        Detalhes do local
      </h2>
      <DataList
        :pending="pending"
        class=" p-2 rounded bg-base-100"
        :data="data"
        :headers="headers"
      >
        <template #columnResponsiblePhone>
          {{ useFormattedPhone(data?.responsiblePhone) }}
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
import LocaleService from '~/services/api/company/records/locale/LocaleService';
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import {useFormattedDateTime} from '~/composables/format-field-helpers';

definePageMeta({
  permission: 'locales view',
})

const route = useRoute()
const router = useRouter()

async function fetchData() {
  return await (new LocaleService()).get(route.params?.id)
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
  {value: 'zipCode', label: 'CEP'},
  {value:'street', label: 'Rua'},
  {value: 'number', label: 'Número'},
  {value: 'complement', label: 'Complemento'},
  {value: 'district', label: 'Bairro'},
  {value: 'city', label: 'Cidade'},
  {value: 'uf', label: 'UF'},
  {value: 'responsibleName', label: 'Responsável'},
  {value: 'responsiblePhone', label: 'Telefone'},
  {value: 'createdAt', label: 'Criado em'},
  {value: 'updatedAt', label: 'Atualizado em'},
]

</script>
