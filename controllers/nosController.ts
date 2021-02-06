import { Request, Response } from 'express'
import { queryString } from '../db/queryBuilder'
import moment from 'moment'
import {
  nos_date_template,
  nos_date_range_template,
  nos_concelho_template,
} from '../constants/queryTemplates'

import strings from '../constants/strings'
import performQuery from '../db/query'

exports.getNosDate = (req: Request, res: Response, _: any) => {
  if (!req.params.date) {
    res.status(400).send({
      status: 400,
      message: 'Bad request. Make sure date param is well formatted',
    })
    return
  }

  performQuery(
    queryString(nos_date_template, req.params.date),
    (err: any, rows: any, fields: any) => {
      res.status(200).send(
        rows.map((row: any) => {
          const date = moment(row.date).format(strings.dateFormat)
          return {
            ...row,
            date,
          }
        })
      )
    }
  )
}

exports.getNosDateRange = (req: Request, res: Response, _: any) => {
  if (
    !req.params.date ||
    !parseInt(req.params.range) ||
    parseInt(req.params.range) < 0
  ) {
    res.status(400).send({
      status: 400,
      message:
        'Bad request. Make sure date param is well formatted and range is a positive integer',
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
    queryString(nos_date_range_template, rangeString),
    (err: any, rows: any, fields: any) => {
      res.status(200).send(
        rows.map((row: any) => {
          const date = moment(row.date).format(strings.dateFormat)
          return {
            ...row,
            date,
          }
        })
      )
    }
  )
}

exports.getNosConcelho = (req: Request, res: Response, _: any) => {
  if (!req.params.concelho) {
    res.status(400).send({
      status: 400,
      message: 'Bad request. Make sure you have sent a valid concelho param',
    })
    return
  }

  const concelho = `'${req.params.concelho}'`

  performQuery(
    queryString(nos_concelho_template, concelho),
    (err: any, rows: any, fields: any) => {
      res.status(200).send(
        rows.map((row: any) => {
          const date = moment(row.date).format(strings.dateFormat)
          return {
            ...row,
            date,
          }
        })
      )
    }
  )
}
