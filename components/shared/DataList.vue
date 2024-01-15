<template>
  <div class="flex flex-col gap-2">
    <div v-if="pending" class="flex justify-center my-12">
      <Loader class="mx-auto align-top" />
    </div>
    <div v-else>
      <div v-for="header in headers" :key="header.value" class="text-start break-all py-1">
        <span class="font-bold capitalize">{{ header.label }}:</span>
        <br>
        <slot :name="generateColumnName(header.value)" :item="data">
          <span>{{ getItemAttr(header.value) ? getItemAttr(header.value) : 'Não informado' }}</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '~/components/shared/Loader.vue';

export default {
  components: {Loader},
  props: {
    headers: {
      type: Array,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    pending: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getItemAttr (attr) {
      return _get(this.data, attr, '')
    },
    generateColumnName (headerKey) {
      return 'column' + _upperFirst(_camelCase(headerKey))
    },
  },
}
</script>
