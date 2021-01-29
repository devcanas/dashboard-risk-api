import { Request, Response } from 'express'
import moment from 'moment'
import {
  init_nos_template,
  init_riskIqd_template,
} from '../constants/queryTemplates'
import strings from '../constants/strings'
import performQuery from '../db/query'
import { queryString } from '../db/queryBuilder'

exports.getInit = (req: Request, res: Response, _: any) => {
  performQuery(
    queryString(init_nos_template, strings.empty),
    (err: any, init_nosRows: any, fields: any) => {
      performQuery(
        queryString(init_riskIqd_template, strings.empty),
        (err: any, init_riskIqdRows: any, fields: any) => {
          res.status(200).send({
            nos: {
              most_recent: moment(init_nosRows[0].Data).format(
                strings.dateFormat
              ),
              availableDates: init_nosRows.map((row: any) => {
                return moment(row.Data).format(strings.dateFormat)
              }),
            },
            riskIqd: {
              most_recent: moment(init_riskIqdRows[0].date).format(
                strings.dateFormat
              ),
              availableDates: init_riskIqdRows.map((row: any) => {
                return moment(row.date).format(strings.dateFormat)
              }),
            },
          })
        }
      )
    }
  )
}
