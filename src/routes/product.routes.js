import express from 'express'
import productCtrl from '../controllers/product.controller.js'

const router = express.Router()

router.route('/api/product')
      .get(productCtrl.findAll)
      .post(productCtrl.create)

router.route('/api/product/:id')
      .get(productCtrl.read)
      .put(productCtrl.update)
      .delete(productCtrl.destroy)

router.param('id', productCtrl.productById)

export default router;