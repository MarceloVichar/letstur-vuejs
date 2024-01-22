<template>
  <div class="flex flex-col md:flex-row gap-2 w-full">
    <div class="flex gap-2 w-full">
      <label class="w-full">
        <span
          class="text-sm mb-1 ml-2"
        >
          Cliente
        </span>
        <SearchInput
          :model-value="getQueryParam('filter[customer]', '')"
          class="w-full"
          placeholder="Nome do cliente"
          @update:modelValue="setQueryParam('filter[customer]', $event)"
        />
      </label>
      <CustomSelect
        :items="SaleStatus"
        :model-value="getQueryParam('filter[status]', '')"
        class="w-64"
        label="Status"
        index-field="value"
        value-field="value"
        label-field="label"
        @update:modelValue="setQueryParam('filter[status]', $event)"
      />
    </div>
    <div class=" flex gap-2">
      <CustomDatePicker
        :model-value="getQueryParam('filter[start_date]', '')"
        class="w-full"
        label="A partir de"
        placeholder="Data inicial"
        @update:modelValue="setQueryParam('filter[start_date]', $event)"
      />
      <CustomDatePicker
        :model-value="getQueryParam('filter[end_date]', '')"
        class="w-full"
        label="Até"
        placeholder="Data final"
        end-of-day
        @update:modelValue="setQueryParam('filter[end_date]', $event)"
      />
    </div>
  </div>
</template>
<script setup>
import SearchInput from '~/components/shared/form/SearchInput.vue';
import CustomDatePicker from '~/components/shared/form/CustomDatePicker.vue';
import CustomSelect from '~/components/shared/form/CustomSelect.vue';
import {SaleStatus} from '~/data/objects';
</script>
