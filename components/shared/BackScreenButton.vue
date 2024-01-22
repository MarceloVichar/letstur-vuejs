<template>
  <button class="btn !bg-gray-400 btn-circle sm:btn sm:w-auto text-base-100 fixed top-[72px] left-2 sm:top-0 sm:left-0 z-[1] sm:z-0 sm:relative" @click="navigate">
    <span class="inline sm:hidden">
      <Icon name="ic:baseline-arrow-back" class="text-4xl" />
    </span>
    <span class="hidden sm:inline text-base-100">{{ text }}</span>
  </button>
</template>

<script setup>
const router = useRouter()

const props = defineProps({
  to: {
    type: String,
    default: null,
  },
  text: {
    type: String,
    default: 'Voltar',
  },
})

const navigate = () => {
  props.to ? navigateTo(props.to) : router.back()
}
</script>
