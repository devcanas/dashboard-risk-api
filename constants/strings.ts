export default {
  dateFormat: 'YYYY-MM-DD',
  empty: '',
  routes: {
    init: {
      path: '/',
    },
    nos: {
      date: '/date/:date',
      dateRange: '/date/:date/range/:range',
      concelho: '/concelho/:concelho',
    },
    riskIqd: {
      date: '/date/:date',
      dateRange: '/date/:date/range/:range',
    },
  },
}
