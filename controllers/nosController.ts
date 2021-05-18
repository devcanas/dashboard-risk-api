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

exports.getNosDate = (req: Request, res: Response, _: any) => {}

exports.getNosDateRange = (req: Request, res: Response, _: any) => {}

exports.getNosConcelho = (req: Request, res: Response, _: any) => {}
