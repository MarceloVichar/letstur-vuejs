<template>
  <div class="">
    <div class="mb-2">
      <BackScreenButton />
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl mb-4">
        Detalhes do guia de passeio
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
import TourGuideService from '~/services/api/company/records/tour-guide/TourGuideService';
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import {useFormattedDateTime} from '~/composables/format-field-helpers';
import BackScreenButton from '~/components/shared/BackScreenButton.vue';

definePageMeta({
  permission: 'tour-guides view',
})

const route = useRoute()
const router = useRouter()

async function fetchData() {
  return await (new TourGuideService()).get(route.params?.id)
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
  {value: 'document', label: 'Documento'},
  {value: 'email', label: 'Email'},
  {value: 'phone', label: 'Telefone'},
  {value: 'createdAt', label: 'Criado em'},
  {value: 'updatedAt', label: 'Atualizado em'},
]
</script>
