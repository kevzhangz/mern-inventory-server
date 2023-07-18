import authCtrl from '../controllers/auth.controller.js'
import sellCtrl from '../controllers/sell.controller.js'
import productCtrl from '../controllers/product.controller.js'
import express from 'express'

const router = express.Router()

router.route('/api/sell')
      .get(authCtrl.checkSignin, sellCtrl.findAll)

router.route('/api/sell/:productId')
      .post(authCtrl.checkSignin, sellCtrl.create)

router.route('/api/sell/:id')
      .get(authCtrl.checkSignin, sellCtrl.read)
      .put(authCtrl.checkSignin, sellCtrl.update)
      .delete(authCtrl.checkSignin, sellCtrl.destroy)

router.param('productId', productCtrl.productById)
router.param('id', sellCtrl.sellById)

export default router