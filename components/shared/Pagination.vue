<template>
  <div class="flex justify-center items-center gap-2 border-x px-2 border-base-300">
    <nav>
      <button
        class="pagination-btn"
        :disabled="isFirstPage"
        @click="goToFirstPage"
      >
        &lt;&lt;
      </button>
      <button
        class="pagination-btn"
        :disabled="isFirstPage"
        @click="previousPage"
      >
        &lt;
      </button>
      <template v-for="pageNumber in displayedPages" :key="pageNumber">
        <button class="pagination-btn" :class="{ 'active-pagination-btn': pageNumber === currentPage }" @click="goToPage(pageNumber)">
          {{ pageNumber }}
        </button>
      </template>
      <button
        class="pagination-btn"
        :disabled="isLastPage"
        @click="nextPage"
      >
        &gt;
      </button>
      <button
        class="pagination-btn"
        :disabled="isLastPage"
        @click="goToLastPage"
      >
        &gt;&gt;
      </button>
    </nav>
    <p class="text-xs">
      {{ totalItems }} itens
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  totalItems: {
    type: [Number, String],
    required: true,
  },
  itemsPerPage: {
    type: [Number, String],
    default: 10,
  },
  currentPage: {
    type: [Number, String],
    default: 1,
  },
  displayedPagesCount: {
    type: Number,
    default: 5,
  },
});

const emits = defineEmits(['changePage']);

const lastPage = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));
const displayedPages = computed(() => {
  const halfDisplayed = Math.floor(props.displayedPagesCount / 2);
  const start = Math.max(props.currentPage - halfDisplayed, 1);
  const end = Math.min(start + props.displayedPagesCount - 1, lastPage.value);
  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const isFirstPage = computed(() => {
  return props.currentPage === 1
})

const isLastPage = computed(() => {
  return props.currentPage === lastPage.value
})

const goToPage = (pageNumber) => {
  if (pageNumber !== props.currentPage) {
    emits('changePage', pageNumber);
  }
};

const previousPage = () => {
  if (props.currentPage > 1) {
    emits('changePage', props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage < lastPage.value) {
    emits('changePage', props.currentPage + 1);
  }
};

const goToFirstPage = () => {
  if (props.currentPage !== 1) {
    emits('changePage', 1);
  }
};

const goToLastPage = () => {
  if (props.currentPage !== lastPage.value) {
    emits('changePage', lastPage.value);
  }
};
</script>

<style scoped>
.pagination-btn {
  width: 40px;
  height: 40px;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn:hover {
  background-color: #e2e8f0;
}

.active-pagination-btn {
  color: theme('colors.primary');
}
</style>
