import { Request, Response } from 'express'
import moment from 'moment'
import {
  init_nos_template,
  init_riskIqd_template,
} from '../constants/queryTemplates'
import strings from '../constants/strings'
import performQuery from '../db/query'
import { queryString } from '../db/queryBuilder'

interface InitResponse {
  selectedDate: string
  dates: string[]
}

const getFormattedData = (rows: any): string[] => {
  return rows.map((row: any) => {
    return moment(row.date).format(strings.dateFormat)
  })
}

const mergedDates = (set1: string[], set2: string[]): string[] => {
  return [...new Set([...set1, ...set2])].sort((el1: string, el2: string) => {
    return moment(el1).diff(moment(el2))
  })
}

const response = (dates: string[]): InitResponse => {
  return {
    selectedDate: dates[dates.length - 1],
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
