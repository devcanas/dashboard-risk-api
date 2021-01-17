import { Request, Response } from 'express'
import { queryString } from '../query/queryBuilder'
import moment from 'moment'
import {
  nos_date_template,
  nos_date_range_template,
} from '../query/queryTemplates'

import strings from '../constants/strings'

import nosDB from '../db/nos'

exports.getNosDate = (req: Request, res: Response, _: any) => {
  if (!req.params.date) {
    res.status(400).send({
      status: 400,
      message: 'Bad request. Make sure date param is well formatted',
    })
    return
  }

  queryNos(
    queryString(nos_date_template, req.params.date),
    (err: any, rows: any, fields: any) => {
      res.status(200).send(rows)
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

  const date = moment(req.params.date, strings.dateFormat)

  const lowerBoundRange = date
    .subtract(req.params.range, 'days')
    .format(strings.dateFormat)

  const upperBoundRange = date
    .add(req.params.range, 'days')
    .format(strings.dateFormat)

  const rangeString = `DATE('${lowerBoundRange}') and DATE('${upperBoundRange}')`

  queryNos(
    queryString(nos_date_range_template, rangeString),
    (err: any, rows: any, fields: any) => {
      res.status(200).send(rows)
    }
  )
}

exports.getNosConcelho = (req: Request, res: Response, _: any) => {}

const queryNos = (
  queryStr: string,
  callback: (err: any, rows: any, fields: any) => void
) => {
  const db = nosDB()
  db.connect()
  db.query(queryStr, callback)
  db.end()
}
