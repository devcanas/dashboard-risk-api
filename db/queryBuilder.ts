import { QueryTemplate } from '../models/QueryTemplate'

export const queryString = (template: QueryTemplate, param: any): string => {
  return template.queryString.replace(template.queryPlaceholder, param)
}
