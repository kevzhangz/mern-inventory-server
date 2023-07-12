import authCtrl from '../controllers/auth.controller.js'
import sellCtrl from '../controllers/sell.controller.js'
import productCtrl from '../controllers/product.controller.js'
import express from 'express'

const router = express.Router()

router.route('/api/sell')
      .get(authCtrl.checkSignin, sellCtrl.findAll)

router.route('/api/sell/:productId')
      .post(authCtrl.checkSignin, sellCtrl.create)

router.param('productId', productCtrl.productById)

export default router