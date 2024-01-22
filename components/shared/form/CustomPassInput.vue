<template>
  <label>
    <span
      v-if="label"
      class="text-sm mb-1 ml-2"
      :class="{ 'requiredField': required }"
    >{{ label }}</span>
    <div class="relative">
      <input
        v-model="mutableValue"
        :type="type"
        class="input input-bordered w-full focus:outline-none"
        :class="{'input-error': Array.isArray(errors) && errors.length}"
        :placeholder="placeholder"
        @input="$emit('input', mutableValue)"
      >
      <div
        class="absolute right-2 bottom-4 cursor-pointer selection:bg-transparent"
        @click="showPassword =! showPassword"
      >
        <Icon v-if="showPassword" name="ion:lock-closed-sharp" />
        <Icon v-else name="ion:lock-open-sharp" />
      </div>
    </div>
    <div
      v-if="Array.isArray(errors)"
      class="h-6 text-error text-center text-sm px-2 break-all whitespace-normal text-ellipsis overflow-hidden"
      :title="errors[0]"
    >
      {{ errors[0] }}
    </div>
  </label>
</template>

<script>
export default {
  name: 'CustomPassInput',
  props: {
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    errors: {
      type: Array,
      default() {
        return undefined
      },
    },
    required: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      required: false,
      default: '',
    },
  },
  emits: ['input'],
  data() {
    return {
      showPassword: false,
      mutableValue: this.value,
    }
  },
  computed: {
    type() {
      return this.showPassword ? 'text' : 'password'
    },
  },
  watch: {
    value: {
      handler(val) {
        this.mutableValue = val
      },
    },
  },
}
</script>
