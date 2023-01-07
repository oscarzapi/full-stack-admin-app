import express from 'express'
import {getProductPredictions} from '../controllers/predictions.js'

const router = express.Router()

router.get('/products', getProductPredictions)

export default router