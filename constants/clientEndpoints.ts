export default {
  data: {
    nos: {
      date: {
        placeholders: ['{date}'],
        string: '/nos/date/{date}',
      },
      date_range: {
        placeholders: ['{date}', '{range}'],
        string: `/nos/date/{date}/range/{range}`,
      },
      concelho: {
        placeholders: ['{concelho}'],
        string: '/nos/concelho/{concelho}/',
      },
    },
    risk: {
      date: {
        placeholders: ['{date}'],
        string: '/riskIqd/date/{date}',
      },
      date_range: {
        placeholders: ['{date}', '{range}'],
        string: `/riskIqd/date/{date}/range/{range}`,
      },
    },
  },
  layers: {
    concelho: `layers/concelhos.js`,
    riskIqd: `layers/riskIdq.js`,
  },
}
