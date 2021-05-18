import { Request, Response } from 'express'
import moment from 'moment'
import menuModel from '../constants/menuModel'
import strings from '../constants/strings'
import { AvailableDate } from '../models/AvailableDate'
import { InitResponse } from '../models/InitResponse'
import clientEndpoints from '../constants/clientEndpoints'

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
  res.status(200).send({
    menus: menuModel,
    clientEndpoints: { url: `${req.protocol}://${req.get('host')}`, ...clientEndpoints },
  })
}
