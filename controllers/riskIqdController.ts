import { Request, Response } from 'express'
import { queryString } from '../db/queryBuilder'
import moment from 'moment'

import { riskIqd_date_template, riskIqd_date_range_template } from '../constants/queryTemplates'
import performQuery from '../db/query'

import { groupBy, iteratee } from 'lodash'
import strings from '../constants/strings'
import { RiskIQDResponse } from '../models/RiskIQDResponse'
import { AvailableDate } from '../models/AvailableDate'

const responseForDate = (date: string, isPred: boolean, data: any = []): AvailableDate => {
  return {
    date,
    isPred,
    data,
  }
}

const nodeForGroup = (group: any, key: string): any => {
  const { risk, iqd, isPred } = group
  const node: any = {}
  node[key] = [parseInt(risk), parseInt(iqd)]
  return node
}

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
      let response: AvailableDate = responseForDate(req.params.date, false)
      let responseObject: RiskIQDResponse = { response: [response] }

      keys.forEach((key) => {
        const node = grouped[key].map((group) => {
          response.isPred = group.isPred === 1
          return nodeForGroup(group, key)
        })
        response.data.push(node)
      })
      res.status(200).send(responseObject)
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
      let response: AvailableDate
      let responseObject: RiskIQDResponse = { response: [] }
      keys.forEach((key) => {
        const node = grouped[key].map((group) => {
          response = responseForDate(
            moment(group.date).format(strings.dateFormat),
            group.isPred === 1
          )
          return nodeForGroup(group, key)
        })

        const item = responseObject.response.filter((it) => it.date === response.date)[0]
        if (!item) {
          responseObject.response.push(response)
        } else {
          item.data.push(node)
        }
      })
      res.status(200).send({ response: responseObject })
    }
  )
}
