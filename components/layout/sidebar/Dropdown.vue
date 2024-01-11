<template>
  <div>
    <button
      class="btn btn-ghost flex flex-nowrap w-full justify-between"
      :class="{ 'text-secondary': !!childrenActive }"
      @click="isVisible ? $emit('closeMenu') : $emit('openMenu')"
    >
      <span class="flex items-center gap-3">
        <Icon :name="item.icon" />
        {{ item.label }}
      </span>
      <Icon
        name="ic:baseline-expand-more"
        class="duration-300 text-lg"
        :class="{ 'rotate-180': isVisible }"
      />
    </button>
    <div
      class="overflow-hidden max-h-0 transition-all duration-200 flex flex-col gap-2"
      :class="{ '!max-h-64 py-1 pb-4 px-4 ': isVisible }"
    >
      <nuxt-link
        v-for="(child, index) in item?.children"
        :key="index"
        :to="pathRoute.includes(child.path) ? null : child.path"
        class="ml-4 mb-1 w-fit cursor-pointer"
      >
        <div
          class="uppercase text-sm w-fit justify-start items-start font-light hover:font-normal"
          :class="{ 'text-secondary': pathRoute.includes(child.path) }"
        >
          {{ child?.label }}
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropDown',
  props: {
    item: {
      type: Object,
      required: true,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      pathRoute: this.$route.path,
      childrenActive: false,
    };
  },
  watch: {
    '$route.path': {
      handler(value) {
        this.activeDrop();
        this.pathRoute = value;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    activeDrop() {
      this.childrenActive = this.item.children?.find((item) => {
        return item.path === this.$route.path;
      });
    },
  },
};
</script>
