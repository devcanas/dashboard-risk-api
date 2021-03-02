import { Request, Response } from 'express'
import moment from 'moment'
import { init_nos_template, init_riskIqd_template } from '../constants/queryTemplates'
import strings from '../constants/strings'
import performQuery from '../db/query'
import { queryString } from '../db/queryBuilder'
import { AvailableDate } from '../models/AvailableDate'
import { InitResponse } from '../models/InitResponse'

const getFormattedData = (rows: any): AvailableDate[] => {
  return rows.map((row: any) => ({
    date: moment(row.date).format(strings.dateFormat),
    isPred: row.isPred === 1 || false,
  }))
}

const mergedDates = (set1: AvailableDate[], set2: AvailableDate[]): AvailableDate[] => {
  return [...new Set([...set1, ...set2])].sort((el1: AvailableDate, el2: AvailableDate) => {
    return moment(el1.date).diff(moment(el2.date))
  })
}

const response = (dates: AvailableDate[]): InitResponse => {
  return {
    selectedDate: dates[dates.length - 1].date,
    dates,
  }
}

const getResponseFromData = (nosData: any, riskIqdData: any): InitResponse => {
  const nosDates = getFormattedData(nosData)
  const riskIqdDates = getFormattedData(riskIqdData)
  const dates = mergedDates(nosDates, riskIqdDates)
  return response(dates)
}

exports.getInit = (req: Request, res: Response, _: any) => {
  performQuery(
    queryString(init_nos_template, strings.empty),
    (err: any, nosRows: any, fields: any) => {
      performQuery(
        queryString(init_riskIqd_template, strings.empty),
        (err: any, riskIqdRows: any, fields: any) => {
          const response = getResponseFromData(nosRows, riskIqdRows)
          res.status(200).send(response)
        }
      )
    }
  )
}
