<template>
  <div class="flex flex-col items-center justify-center">
    index
  </div>
</template>

<script setup>
import {useAuth} from '~/store/auth';

const router = useRouter()
const auth = useAuth()

onMounted(() => {
  auth.isAdmin
    ? router.push('/admin/home')
    : router.push('/client/home')
})
</script>
