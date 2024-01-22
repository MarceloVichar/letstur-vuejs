<template>
  <div>
    <FullCalendar ref="calendar" :options="calendarOptions" />
    <EventDetailsModal v-if="eventModal.open" :event="eventModal.event" @close="closeModal" />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import EventDetailsModal from '~/components/app/company/calendar/EventDetailsModal.vue';

export default {
  components: {EventDetailsModal, FullCalendar},
  props: {
    events: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['dateRangeChanged'],
  data() {
    return {
      eventModal: {
        open: false,
        event: null,
      },
      currentDateRange: null,
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'dayGridMonth,dayGridWeek,dayGridDay',
          center: 'title',
          right: 'prev,today,next',
        },
        locale: 'pt-br',
        buttonText: {
          today: 'Hoje',
          month: 'Mês',
          week: 'Semana',
          day: 'Dia',
        },
        eventTimeFormat: {
          hour: '2-digit',
          minute: '2-digit',
        },
        showNonCurrentDates: false,
        datesSet: (info) => {
          if (!this.currentDateRange) {
            this.currentDateRange = info;
            return
          }
          if (info.start < this.currentDateRange?.start || info.end > this.currentDateRange?.end) {
            this.$emit('dateRangeChanged', info);
            this.currentDateRange.start = info.start;
            this.currentDateRange.end = info.end;
          }
        },
        eventClick: (info) => this.openModal(info),
        eventMouseEnter: (info) => {
          info.el.setAttribute('title', `${info.event.title} - Clique para ver mais detalhes`)
        },
        events: [],
      },
    }
  },

  watch: {
    events: {
      handler() {
        this.mapEvents()
      },
      deep: true,
    },
  },

  created() {
    this.calendarView()
    this.mapEvents()
  },

  methods: {
    calendarView() {
      if (window.innerWidth <= 640) {
        this.calendarOptions.initialView = 'dayGridDay'
        this.calendarOptions.headerToolbar.left = 'title'
        this.calendarOptions.headerToolbar.center = ''
      }
    },
    mapEvents() {
      if (!this.events?.length || !Array.isArray(this.events)) {
        this.calendarOptions.events = []
      }
      this.calendarOptions.events = this.events.map((event) => {
        return {
          ...event,
          color: event?.tour?.color,
          title: event?.tour?.name,
          start: event.departureDateTime,
        }
      })
    },
    openModal(info) {
      this.eventModal.open = true
      this.eventModal.event = { ...info?.event?.extendedProps, id: info?.event?.id } || {}
    },
    closeModal() {
      this.eventModal.open = false
      this.eventModal.event = null
    },
  },
}
</script>

<style>
.fc-button-primary {
  background-color: theme('colors.primary') !important;
  color: theme('colors.base-100') !important;
  border: none !important;
  padding: 0 0.75rem !important;
  height: 2rem !important;
  transition: 300ms ease !important;
}

.fc-button-primary:hover {
  background-color: theme('colors.primary'/ 70%) !important;
  opacity: 1 !important;
}

.fc-button-primary:focus {
  box-shadow: none !important;
}

.fc .fc-button-primary:disabled:hover {
  cursor: default;
}

.fc-daygrid-day.fc-day-today .fc-daygrid-day-number {
  color: theme('colors.base-100');
  z-index: 10;
  background-color: theme('colors.info');
  padding: 2px;
  min-width: 25px;
  text-align: center;
  border-radius: 100%;
  margin-top: 2px;
}

.fc-toolbar-title {
  font-size: 20px !important;
}

.fc .fc-toolbar.fc-header-toolbar {
  padding: 10px;
  margin-bottom: 0px;
}

.fc .fc-scrollgrid-section-header {
  color: theme('colors.accent');
}

.fc .fc-scrollgrid-section-liquid > td {
  border-right: 0;
  border-bottom: 0;
}

.fc-theme-standard .fc-scrollgrid {
  border-left: 0;
}

.fc-scrollgrid-sync-table,
.fc-daygrid-body,
.fc-daygrid-body-unbalanced,
.fc-col-header {
  width: 100% !important;
}

.fc .fc-daygrid-event {
  z-index: auto !important;
  cursor: pointer;
}

.fc-theme-standard td,
.fc-theme-standard th,
.fc-theme-standard .fc-scrollgrid,
.fc .fc-toolbar {
  border-color: theme('colors.base-300');
}

.fc-theme-standard th {
  border-right: 0;
}

.fc .fc-daygrid-event {
  margin: 1px 0px;
  padding-left: 4px;
}

.fc-h-event .fc-event-main {
  color: theme('colors.accent')
}

.fc .fc-daygrid-day-top {
  justify-content: center;
  font-size: 14px;
}

.fc .fc-more-popover .fc-popover-body {
  background-color: theme('colors.base-200') !important;
}

.fc-theme-standard .fc-popover-header {
  background-color: theme('colors.base-100') !important;;
}

.fc-theme-standard .fc-popover {
  border-color: theme('colors.base-100');
}

.fc-day-grid-container.fc-scroller {
    height: auto!important;
    overflow-y: auto;
}

@media (max-width: 640px) {
  .fc-toolbar-title {
    font-size: 16px !important;
  }
}
</style>
