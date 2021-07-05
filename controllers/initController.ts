import { Request, Response } from 'express'
import menuModel from '../constants/menuModel'
import { AvailableDate } from '../models/AvailableDate'
import clientEndpoints from '../constants/clientEndpoints'
import performQuery from '../db/query'
import { queryString } from '../db/queryBuilder'
import { availableDatesCount, minAvailableDate } from '../constants/queryTemplates'
import strings from '../constants/strings'
import Database from '../db'

const getRiskAvailableDates = async (): Promise<AvailableDate> => {
  const availableDatesQueryString = queryString(availableDatesCount, strings.dataTypeIds.risk)
  const minAvailableDataQueryString = queryString(minAvailableDate, strings.dataTypeIds.risk)

  const [availableDatesCountQuery, minAvailableDateQuery]: any = await Promise.all([
    Database.shared.query({ queryString: availableDatesQueryString }),
    Database.shared.query({ queryString: minAvailableDataQueryString }),
  ])

  return {
    startDate: minAvailableDateQuery[0].date,
    dataLength: availableDatesCountQuery[0].numRows - 1,
    id: strings.dataTypeIds.risk,
  }
}

const getNosAvailableDates = () => {
  // FIXME: implement same but for NOS data
  return { id: 'nos' }
}

const getAvailableDates = async () => {
  return [await getRiskAvailableDates(), getNosAvailableDates()]
}

exports.getInit = async (req: Request, res: Response, _: any) => {
  const availableDates = await getAvailableDates()
  res.status(200).send({
    availableDates,
    menus: menuModel,
    clientEndpoints: { url: `${req.protocol}://${req.get('host')}`, ...clientEndpoints },
  })
}
