import { QueryTemplate } from '../models/QueryTemplate'

export const nos_date_template: QueryTemplate = {
  queryString:
    "select id, Data as date, `Nome Concelho` as concelho, `Nome Região` as regiao, percent from stay_at_home where Data = DATE('{DATE}');",
  queryPlaceholder: '{DATE}',
}

export const nos_date_range_template: QueryTemplate = {
  queryString:
    'select id, Data as date, `Nome Concelho` as concelho, `Nome Região` as regiao, percent from stay_at_home where Data between {DATE_RANGE};',
  queryPlaceholder: '{DATE_RANGE}',
}
