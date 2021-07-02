export default {
  dateFormat: 'YYYY-MM-DD',
  dataTypeIds: {
    risk: 'risco',
    iqd: 'incerteza',
    sah: 'sah',
  },
  mapLocationIds: {
    continente: 'continente',
    madeira: 'madeira',
    acores: 'acores',
  },
  empty: '',
  routes: {
    init: {
      path: '/',
      create: '/createInit',
    },
    nos: {
      date: '/date/:date',
      dateRange: '/date/:date/range/:range',
      concelho: '/concelho/:concelho',
    },
    riskIqd: {
      colors: '/colors',
      date: '/date/:date',
    },
  },
}
