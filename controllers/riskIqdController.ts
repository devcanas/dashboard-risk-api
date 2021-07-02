import { Request, Response } from 'express'
import getColors from '../services/getColors'
import getValues from '../services/getValues'

exports.getRiskIqdColors = async (req: Request, res: Response, _: any) => {
  res.status(200).send(await getColors())
}

exports.getRiskIqdDate = (req: Request, res: Response, _: any) => {
  const date = req.params.date
  const isPredValue = req.query.isPred
  const isPred: boolean = (isPredValue !== undefined && isPredValue) as boolean

  res.status(200).send(getValues({ date, isPred }))
}
