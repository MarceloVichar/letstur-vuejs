<template>
  <div class="">
    <div class="mb-2">
      <BackScreenButton />
    </div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl mb-4">
        Detalhes do usuário
      </h2>
      <DataList
        :pending="pending"
        class=" p-2 rounded bg-base-100"
        :data="data"
        :headers="headers"
      >
        <template #columnCompany>
          <ObjectDataList
            v-if="data?.company"
            :data="[
              {value: 'Nome', label: data?.company?.name},
              {value: 'Nome fantasia', label: data?.company?.tradingName},
              {value: 'CNPJ', label: data?.company?.cnpj},
              {value: 'Email', label: data?.company?.email},
              {value: 'Telefone', vlabellue: data?.company?.phone},
            ]"
          />
        </template>
        <template #columnRoles0>
          {{ getRoleLabel(data?.roles[0]) }}
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
import UserService from '~/services/api/admin/UserService';
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import {userRoles} from '~/data/objects';
import ObjectDataList from '~/components/shared/ObjectDataList.vue';
import BackScreenButton from '~/components/shared/BackScreenButton.vue';

const route = useRoute()
const router = useRouter()

async function fetchData() {
  return await (new UserService()).get(route.params?.id)
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
  {value: 'email', label: 'Email'},
  {value: 'roles.0', label: 'Função'},
  {value: 'company', label: 'Empresa'},
  {value: 'createdAt', label: 'Criado em'},
  {value: 'updatedAt', label: 'Atualizado em'},
]

const getRoleLabel = (role) => {
  return userRoles?.find((userRole) => userRole.value === role)?.label || role
}
</script>
