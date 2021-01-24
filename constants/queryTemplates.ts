import { QueryTemplate } from '../models/QueryTemplate'

export const nos_date_template: QueryTemplate = {
  queryString:
    "select Data as date, `Nome Concelho` as concelho, percent from stay_at_home where Data = DATE('{DATE}');",
  queryPlaceholder: '{DATE}',
}

export const nos_date_range_template: QueryTemplate = {
  queryString:
    'select Data as date, `Nome Concelho` as concelho, percent from stay_at_home where Data between {DATE_RANGE};',
  queryPlaceholder: '{DATE_RANGE}',
}

export const nos_concelho_template: QueryTemplate = {
  queryString:
    'select Data as date, `Nome Concelho` as concelho, percent from stay_at_home where `Nome Concelho` = {CONCELHO} LIMIT 30;',
  queryPlaceholder: '{CONCELHO}',
}

export const riskIqd_date_template: QueryTemplate = {
  queryString:
    "select uuid, date, risk, iqd from property where date = '{DATE}';",
  queryPlaceholder: '{DATE}',
}

export const riskIqd_date_range_template: QueryTemplate = {
  queryString:
    'select uuid, date, risk, iqd from property where date between {DATE_RANGE};',
  queryPlaceholder: '{DATE_RANGE}',
}