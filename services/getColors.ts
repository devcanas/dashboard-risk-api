import { queryString } from '../db/queryBuilder'

import { riskIqd_date_template, availableDates } from '../constants/queryTemplates'
import performQuery from '../db/query'
import strings from '../constants/strings'

import fs from 'fs'

export default async () => {
  const query = queryString(availableDates, strings.dataTypeIds.risk)
  const availableDatesRows = await performQuery(query)

  let riskPromises = availableDatesRows.map((row: any) => readFile(row, true))
  let iqdPromises = availableDatesRows.map((row: any) => readFile(row, false))
  const riskColorsValues = await Promise.all(riskPromises)
  const iqdColorsValues = await Promise.all(iqdPromises)

  return buildResponseForColors(riskColorsValues, iqdColorsValues)
}

const readFile = async (availableDate: any, isRisk: boolean): Promise<any> => {
  const documentRoot = process.env.PWD
  const folder = isRisk ? 'risk' : 'iqd'
  const path = `${documentRoot}/parsedData/colors/${folder}/${availableDate.pathname}`
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) reject(err)
      else
        resolve({
          date: availableDate.date,
          isPred: availableDate.isPred === 1,
          data: data,
        })
    })
  })
}

const buildResponseForColors = (riskValues: any, iqdValues: any): any => {
  let response: any = []
  riskValues.forEach((value: any) => {
    const item = response.filter(
      (item: any) => item.date === value.date && item.isPred === value.isPred
    )[0]
    if (item) {
      item.colors.risk = value.data
    } else {
      response.push({
        date: value.date,
        isPred: value.isPred,
        colors: { risk: value.data, iqd: [] },
      })
    }
  })

  iqdValues.forEach((value: any) => {
    const item = response.filter(
      (item: any) => item.date === value.date && item.isPred === value.isPred
    )[0]
    if (item) {
      item.colors.iqd = value.data
    } else {
      // this will probably not happen since it has already been populated above
      response.push({
        date: value.date,
        isPred: value.isPred,
        colors: { iqd: value.data },
      })
    }
  })

  // eliminate prediction rows if we have a "real" value for it
  response = response.filter((item: any) => {
    const itemsForDate = response.filter((i: any) => i.date === item.date)
    return itemsForDate === 1 || item.isPred === false
  })

  return response
}
