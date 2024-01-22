<template>
  <VeeForm class="grid p-1 gap-1 w-full" @submit="onSubmit">
    <div v-if="mutableForm?.data?.eventSales?.length > 0" class="flex flex-col-reverse gap-5">
      <div
        v-for="(item, index) in mutableForm.data.eventSales"
        :key="index"
        class="slide relative border border-base-300 border-opacity-10 shadow-md rounded w-full h-full p-2 bg-base-100 flex flex-col gap-4"
      >
        <p class="text-center">
          {{ item?.tour }}
        </p>
        <div v-for="(passenger, pI) in item?.passengers" :key="`${index}${pI}`" class="flex flex-col sm:flex-row sm:gap-2">
          <CustomInput
            :key="`name-${pI}${index}`"
            v-model="passenger.name"
            required
            type="text"
            placeholder="Nome do passageiro"
            label="Nome"
          />
          <MaskedInput
            :key="`doc-${pI}${index}`"
            v-model="passenger.document"
            unmasked
            required
            mask="['##.###.###/####-##', '###.###.###-##']"
            type="text"
            placeholder="Documento"
            label="Documento"
          />
        </div>
      </div>
    </div>
    <p class="text-sm">
      (<span class="text-error">*</span>) Campo obrigatório
    </p>
    <div class="flex justify-between gap-2 my-4">
      <button class="btn" @click="emit('previousStep')">
        Voltar
      </button>
      <SubmitButton
        :disabled="!formIsValid"
        :loading="props.sending"
        type="submit"
        class="btn btn-primary"
      >
        Finalizar
      </SubmitButton>
    </div>
  </VeeForm>
</template>

<script setup>
import SubmitButton from '~/components/shared/form/SubmitButton.vue';
import CustomInput from '~/components/shared/form/CustomInput.vue';
import MaskedInput from '~/components/shared/form/MaskedInput.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  sending: {
    type: Boolean,
    default: false,
  },
  action: {
    type: String,
    default: 'create',
  },
})

const emit = defineEmits(['onSubmit', 'update:modelValue', 'previousStep'])

const form = _cloneDeep(props.modelValue)
const mutableForm = reactive(form)

const formIsValid = computed(() => {
  return mutableForm?.data?.eventSales?.every((eventSale) => {
    return eventSale?.passengers?.every((passenger) => {
      return passenger?.name && passenger?.document
    })
  })
})

onMounted(async () => {
})

watch(
  () => props.modelValue,
  (newValue) => {
    Object.assign(mutableForm, newValue)
  },
  {immediate: true, deep: true},
)

const onSubmit = () => {
  if (props.sending) return
  emit('update:modelValue', mutableForm)
  emit('onSubmit')
}

</script>
