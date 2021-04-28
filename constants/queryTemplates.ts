import { QueryTemplate } from '../models/QueryTemplate'
import config from 'config'

export const init_nos_template: QueryTemplate = {
  queryString: `select distinct Data as date from ${config.get(
    'database.nosTableName'
  )} order by Data desc;`,
  queryPlaceholder: '',
}

export const init_riskIqd_template: QueryTemplate = {
  queryString: 'select distinct date, isPred from property order by date desc;',
  queryPlaceholder: '',
}

export const nos_date_template: QueryTemplate = {
  queryString: `select Data as date, \`Nome Concelho\` as concelho, percent from ${config.get(
    'database.nosTableName'
  )} where Data = DATE('{DATE}');`,
  queryPlaceholder: '{DATE}',
}

export const nos_date_range_template: QueryTemplate = {
  queryString: `select Data as date, \`Nome Concelho\` as concelho, percent from ${config.get(
    'database.nosTableName'
  )} where Data between {DATE_RANGE};`,
  queryPlaceholder: '{DATE_RANGE}',
}

export const nos_concelho_template: QueryTemplate = {
  queryString: `select Data as date, \`Nome Concelho\` as concelho, percent from ${config.get(
    'database.nosTableName'
  )} where \`Nome Concelho\` = {CONCELHO} LIMIT 30;`,
  queryPlaceholder: '{CONCELHO}',
}

export const riskIqd_date_template: QueryTemplate = {
  queryString: "select uuid, date, risk, iqd, isPred from property where date = '{DATE}';",
  queryPlaceholder: '{DATE}',
}

export const riskIqd_date_range_template: QueryTemplate = {
  queryString:
    'select uuid, date, risk, iqd, isPred from property where date between {DATE_RANGE};',
  queryPlaceholder: '{DATE_RANGE}',
}
