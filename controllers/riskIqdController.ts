import { Request, Response } from 'express'
import { queryString } from '../db/queryBuilder'
import moment from 'moment'

import {
  riskIqd_date_template,
  riskIqd_date_range_template,
} from '../constants/queryTemplates'
import performQuery from '../db/query'

import { groupBy } from 'lodash'
import strings from '../constants/strings'

exports.getRiskIqdDate = (req: Request, res: Response, _: any) => {
  if (!req.params.date) {
    res.status(400).send({
      status: 400,
      message: 'Bad request. Make sure date param is well formatted',
    })
    return
  }

  performQuery(
    queryString(riskIqd_date_template, req.params.date),
    (err: any, rows: any, fields: any) => {
      if (err) console.log(err)
      const grouped = groupBy(rows, 'uuid')
      const keys = Object.keys(grouped)
      let response: any = {}
      keys.forEach((key) => {
        const group = grouped[key].map((g) => {
          const { risk, iqd, date } = g
          return {
            Risk: risk,
            IQD: iqd,
            date: moment(date).format(strings.dateFormat),
          }
        })
        response[key] = group
      })
      res.status(200).send(response)
    }
  )
}

exports.getRiskIqdDateRange = (req: Request, res: Response, _: any) => {
  if (!req.params.date) {
    res.status(400).send({
      status: 400,
      message: 'Bad request. Make sure date param is well formatted',
    })
    return
  }

  const lowerBoundRange = moment(req.params.date, strings.dateFormat)
    .subtract(req.params.range, 'days')
    .format(strings.dateFormat)

  const upperBoundRange = moment(req.params.date, strings.dateFormat)
    .add(req.params.range, 'days')
    .format(strings.dateFormat)

  const rangeString = `'${lowerBoundRange}' and '${upperBoundRange}';`

  performQuery(
    queryString(riskIqd_date_range_template, rangeString),
    (err: any, rows: any, fields: any) => {
      if (err) console.log(err)
      const grouped = groupBy(rows, 'uuid')
      const keys = Object.keys(grouped)
      let response: any = {}
      keys.forEach((key) => {
        const group = grouped[key].map((g) => {
          const { risk, iqd, date } = g
          return {
            Risk: risk,
            IQD: iqd,
            date: moment(date).format(strings.dateFormat),
          }
        })
        response[key] = group
      })
      res.status(200).send(response)
    }
  )
}
