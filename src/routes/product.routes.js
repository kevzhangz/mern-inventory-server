import express from 'express'
import productCtrl from '../controllers/product.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/api/product')
      .get(authCtrl.checkSignin, productCtrl.findAll)
      .post(authCtrl.checkSignin, productCtrl.create)

router.route('/api/product/:id')
      .get(authCtrl.checkSignin, productCtrl.read)
      .put(authCtrl.checkSignin, productCtrl.update)
      .delete(authCtrl.checkSignin, productCtrl.destroy)

router.param('id', productCtrl.productById)

export default router;