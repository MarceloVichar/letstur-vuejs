<template>
  <div>
    <transition name="overlay">
      <div v-if="showModal" class="z-50 fixed overflow-auto inset-0 h-screen w-full bg-black bg-opacity-30" />
    </transition>
    <transition name="modal-bounce">
      <div v-if="showModal" class="z-50 fixed overflow-auto inset-0 flex justify-center items-start md:items-center !pt-16 !md:pt-2 !p-2">
        <div class="relative bg-base-100 opacity-100 bg-opacity-100 shadow p-2 md:pt-2 rounded-xl shadow-xl max-h-[100vh - 10%] w-full md:w-auto md:max-w-[100%] overflow-y-auto" @click.stop>
          <div class="absolute top-1 right-1">
            <button class="btn btn-sm btn-circle btn-ghost" @click="closeModal">
              x
            </button>
          </div>
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  emits: ['close'],
  data () {
    return {
      showModal: false,
    }
  },
  watch: {
    showModal: {
      handler (val) {
        if (val) {
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.overflow = null
        }
      },
      immediate: true,
    },
  },
  created() {
    setTimeout(() => {
      this.showModal = true
    })
  },

  unmounted() {
    document.body.style.overflow = null
    this.showModal = false
  },
  methods: {
    closeModal () {
      this.showModal = false
      setTimeout(() => {
        this.$emit('close')
      }, 400)
    },
  },
}
</script>

<style scoped>
.overlay-enter-active {
  animation: fade 400ms ease;
}

.overlay-leave-active {
  animation: fade 400ms ease reverse;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-bounce-enter-active {
  animation: bounce-in 0.2s;
}
.modal-bounce-leave-active {
  animation: bounce-in 0.2s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
