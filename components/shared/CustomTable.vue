<template>
  <div class="overflow-x-auto rounded">
    <slot name="options" />

    <table class="w-full border-none lg:border border-accent-content">
      <thead class="hidden lg:table-header-group">
        <slot name="header" :headers="headers">
          <tr class="border-t border-x-0 border-b-2 border-accent-content shadow bg-base-100">
            <th
              v-for="header in headers"
              :key="header.label"
              class="!rounded-b-none !static  capitalize text-sm p-3 text-start"
            >
              {{ header.label }}
            </th>
            <th v-if="typeof actions === 'boolean' ? actions : actions?.length" />
          </tr>
        </slot>
      </thead>

      <tbody class="grid grid-cols-1 md:grid-cols-2 md:gap-5 lg:table-row-group">
        <slot name="body" :items="items">
          <tr v-if="loading">
            <td colspan="100%">
              <div class="flex justify-center my-12">
                <Loader class="mx-auto align-top" />
              </div>
            </td>
          </tr>
          <tr
            v-for="item in items"
            v-else
            :key="item.id || JSON.stringify(item)"
            class="mb-5 md:mb-0 bg-base-100 bg-opacity-60 hover:bg-opacity-100 border-b last-border-b-0 border-accent-content text-sm font-normal  block  lg:table-row relative"
          >
            <td
              v-for="header in headers"
              :key="header.value"
              class="!whitespace-normal border-b-0 bg-transparent px-3 py-2 lg:py-4 flex justify-between items-center gap-1 text-right lg:text-left lg:table-cell border-b lg:border-b-0 box-content h-5"
            >
              <span class="inline-block lg:hidden font-bold">{{ header.label }}</span>
              <div class="break-all lg:break-normal">
                <slot :name="columnSlotName(header.value)" :item="item">
                  {{ getItemAttr(item, header.value) }}
                </slot>
              </div>
            </td>
            <td v-if="typeof actions === 'boolean' ? actions : actions?.length" class="!whitespace-normal border-b-0 bg-transparent px-3 py-2 lg:py-4 flex justify-center lg:justify-end items-center gap-1">
              <slot name="actions" :item="item">
                <div class="flex justify-end gap-4 lg:gap-2 cursor-pointer">
                  <div
                    v-for="action in actions"
                    :key="action.label"
                  >
                    <div
                      v-if="typeof action.hidden === 'function' ? !action.hidden(item) : !action.hidden"
                      class="tooltip tooltip-left"
                      :data-tip="action?.label"
                      :class="actionClasses(action)"
                      @click="action.onClick(item)"
                    >
                      <Icon class="text-2xl lg:text-lg" :name="action.icon" :class="actionClasses(action)" />
                    </div>
                  </div>
                </div>
              </slot>
            </td>
          </tr>
          <tr v-if="isEmpty(items)">
            <slot name="emptyBody">
              <td class="text-lg text-gray-600 text-center !py-12 font-bold" colspan="100%">
                <label>Nenhum item encontrado</label>
              </td>
            </slot>
          </tr>
        </slot>
      </tbody>
    </table>
    <div
      v-if="!loading && items?.length && !hidePagination && pagination?.last_page > 1"
      class="w-full flex justify-center bg-base-300"
    >
      <Pagination
        :current-page="pagination?.current_page"
        :items-per-page="pagination?.per_page"
        :total-items="pagination?.total"
        @changePage="page => changePage(page)"
      />
    </div>
  </div>
</template>

<script>
import Loader from '~/components/shared/Loader.vue';
import Pagination from '~/components/shared/Pagination.vue';

export default {
  name: 'CustomTable',
  components: {Pagination, Loader},
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      default() {
        return []
      },
    },
    actions: {
      type: [Array, Boolean],
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    hidePagination: {
      type: Boolean,
      default: false,
    },
    pagination: {
      type: Object,
      default() {
        return {
          current_page: 1,
          from: 1,
          last_page: 1,
          per_page: 20,
          to: 0,
          total: 0,
        }
      },
    },
  },

  emits: ['onSortBy', 'onChangePage', 'onHandleChecked'],

  methods: {
    isEmpty: _isEmpty,
    getItemAttr(item, attr) {
      return _get(item, attr, '-')
    },

    columnSlotName(headerValue) {
      return 'column' + _upperFirst(_camelCase(headerValue))
    },
    changePage(page) {
      console.log('dispatching changePage', page )
      this.$emit('onChangePage', page)
    },
    actionClasses(action) {
      switch (action?.type) {
        case 'error':
          return 'text-error lg:text-current hover:text-error'
        case 'warning':
          return 'text-warning lg:text-current hover:text-warning'
        case 'success':
          return 'text-success lg:text-current hover:text-success'
        case 'info':
          return 'text-info lg:text-current hover:text-info'
        case 'primary':
          return 'text-primary lg:text-current hover:text-primary'
        default:
          return ''
      }
    },
  },
}
</script>
