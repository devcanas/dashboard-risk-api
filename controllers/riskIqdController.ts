import { Request, Response } from 'express'
import { queryString } from '../db/queryBuilder'
import moment from 'moment'

import { riskIqd_date_template, riskIqd_date_range_template } from '../constants/queryTemplates'
import performQuery from '../db/query'

import { groupBy, iteratee } from 'lodash'
import strings from '../constants/strings'
import { RiskIQDResponse } from '../models/RiskIQDResponse'
import { AvailableDate } from '../models/AvailableDate'

import fs from 'fs'

exports.getRiskIqdDate = (req: Request, res: Response, _: any) => {
  const date = req.params.date
  const documentRoot = process.env.PWD
  const colorsRiskFile = `${documentRoot}/parsedData/colors/risk/2021-01-31_riskIqd.js`
  const colorsIqdFile = `${documentRoot}/parsedData/colors/iqd/2021-01-31_riskIqd.js`
  const dataFile = `${documentRoot}/parsedData/values/2021-01-31_riskIqd.js`
  const riskColors = JSON.parse(fs.readFileSync(colorsRiskFile, 'utf8'))
  const iqdColors = JSON.parse(fs.readFileSync(colorsIqdFile, 'utf8'))
  const riskIqdData = JSON.parse(fs.readFileSync(dataFile, 'utf8'))

  res.status(200).send({
    date,
    colors: {
      risk: riskColors,
      iqd: iqdColors,
    },
    values: riskIqdData,
  })
}

exports.getRiskIqdDateRange = (req: Request, res: Response, _: any) => {}
