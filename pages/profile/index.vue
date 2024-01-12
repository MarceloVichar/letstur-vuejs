<template>
  <div>
    <CentralizedContainer>
      <h2 class="text-center font-bold text-xl mb-4">
        Meu perfil
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
      <div class="text-center mt-2">
        <NuxtLink to="/profile/edit">
          <button class="btn btn-primary">
            Editar
          </button>
        </NuxtLink>
      </div>
    </CentralizedContainer>
  </div>
</template>
<script setup>
import DataList from '~/components/shared/DataList.vue';
import CentralizedContainer from '~/components/shared/CentralizedContainer.vue';
import {userRoles} from '~/data/objects';
import ObjectDataList from '~/components/shared/ObjectDataList.vue';
import {useAuth} from '~/store/auth';

const auth = useAuth()

async function fetchData() {
  await auth.ensureUserIsLoaded()
  return auth.user
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
