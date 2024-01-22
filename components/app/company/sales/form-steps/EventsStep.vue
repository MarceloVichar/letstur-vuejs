<template>
  <VeeForm class="grid p-1 gap-1 w-full" @submit="onSubmit">
    <div class="flex justify-end mb-2">
      <button type="button" class="btn btn-sm btn-primary" @click.prevent="addEvent">
        Adicionar evento
      </button>
    </div>
    <div v-if="mutableForm?.data?.eventSales?.length > 0" class="flex flex-col-reverse gap-5">
      <div
        v-for="(item, index) in mutableForm.data.eventSales"
        :key="index"
        class="slide relative border border-base-300 border-opacity-10 shadow-md rounded w-full h-full p-2 bg-base-100"
      >
        <div class="flex justify-end mb-2">
          <div class="text-error cursor-pointer" @click.prevent="removeEvent(index)">
            <Icon name="ic:outline-close" class="w-5 h-5" />
          </div>
        </div>
        <div class="flex flex-col md:flex-row md:gap-2">
          <AutoComplete
            v-model="item.eventId"
            required
            class="w-full"
            label-field="tour"
            value-field="id"
            label="Evento"
            :items="events"
            :errors="_get(mutableForm.errors, `data.eventSales[${index}].eventId`)"
            @update:modelValue="item.tour = events?.find(event => event?.id === item.eventId)?.tour || ''"
            @search="(search, loading) => searchEvents(search, loading)"
          />
          <CustomInput
            :key="`quantity-${index}`"
            v-model="item.quantity"
            required
            class="w-full md:w-28"
            type="number"
            placeholder="Quantidade"
            label="Quantidade"
            :errors="_get(mutableForm.errors, `data.eventSales[${index}].quantity`)"
            @update:modelValue="resizePassengers(index)"
          />
        </div>
      </div>
    </div>
    <p class="text-sm">
      (<span class="text-error">*</span>) Campo obrigatório
    </p>
    <div class="flex justify-end my-4">
      <SubmitButton
        :disabled="!formIsValid"
        :loading="props.sending"
        type="submit"
        class="btn btn-primary"
      >
        Avançar
      </SubmitButton>
    </div>
  </VeeForm>
</template>

<script setup>
import SubmitButton from '~/components/shared/form/SubmitButton.vue';
import AutoComplete from '~/components/shared/form/AutoComplete.vue';
import EventService from '~/services/api/company/event/EventService';
import CustomInput from '~/components/shared/form/CustomInput.vue';

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

const emit = defineEmits(['nextStep', 'update:modelValue'])

const form = _cloneDeep(props.modelValue)
const mutableForm = reactive(form)

const events = ref([])

onMounted(async () => {
  await fetchEvents()
  if (!mutableForm.data.eventSales || mutableForm.data.eventSales.length === 0) {
    addEvent();
  }
})

watch(
  () => props.modelValue,
  (newValue) => {
    Object.assign(mutableForm, newValue)
  },
  {immediate: true, deep: true},
)

const formIsValid = computed(() => {
  if (!mutableForm.data.eventSales || mutableForm.data.eventSales.length === 0) {
    return false;
  }

  return mutableForm.data.eventSales.every(item => {
    return item.eventId && item.quantity > 0;
  });
})
const onSubmit = () => {
  if (props.sending) return
  emit('update:modelValue', mutableForm)
  emit('nextStep')
}

const searchEvents = _debounce(async (search, loading) => {
  loading(true)
  await fetchEvents({ 'filter[tour]': search })
  loading(false)
}, 500)

async function fetchEvents(params) {
  return await new EventService().index({...params, perPage: 100})
    .then((response) => {
      response.data.forEach((event) => {
        event.tour = event?.tour?.name || ''
      })
      events.value = response.data
    })
    .catch(() => {
      useNotify('warning', 'Ops! Ocorreu algum erro, tente novamente mais tarde.')
    })
}

function addEvent() {
  const newEventSale = Object.assign({}, {
    eventId: '',
    quantity: 0,
    passengers: [],
    tour: '',
  });

  mutableForm?.data?.eventSales?.push(newEventSale);
}

function removeEvent(index) {
  mutableForm?.data?.eventSales?.splice(index, 1)
}

function resizePassengers(index) {
  const eventSale = mutableForm?.data?.eventSales[index];
  if (eventSale?.passengers?.length > eventSale?.quantity) {
    eventSale.passengers.splice(eventSale.quantity, eventSale.passengers.length - eventSale.quantity);
  } else if (eventSale?.passengers?.length < eventSale?.quantity) {
    const passengersToAdd = eventSale.quantity - eventSale.passengers.length;
    for (let i = 0; i < passengersToAdd; i++) {
      eventSale.passengers.push({
        name: '',
        document: '',
      });
    }
  }
}
</script>
