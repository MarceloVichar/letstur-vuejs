<template>
  <label class="swap swap-rotate">
    <input
      v-model="dark"
      type="checkbox"
    >
    <Icon name="ic:baseline-light-mode" class="text-lg swap-off" />
    <Icon name="ic:baseline-dark-mode" class="text-lg swap-on" />
  </label>
</template>

<script setup>
import {useLayout} from '~/store/layout';

const colorMode = useColorMode();
const dark = ref(colorMode.preference === 'darkTheme');
const layout = useLayout()

watch(dark, (value) => {
  if (value) {
    colorMode.preference = 'darkTheme'
    layout.setTheme('darkTheme')
  } else {
    colorMode.preference = 'lightTheme'
    layout.setTheme('lightTheme')
  }
}, {immediate: true});

</script>
