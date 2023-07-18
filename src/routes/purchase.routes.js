import authCtrl from '../controllers/auth.controller.js'
import purchaseCtrl from '../controllers/purchase.controller.js'
import productCtrl from '../controllers/product.controller.js'
import supplierCtrl from '../controllers/supplier.controller.js'
import express from 'express'

const router = express.Router()

router.route('/api/purchase')
      .get(authCtrl.checkSignin, purchaseCtrl.findAll)

router.route('/api/purchase/:supplierId/:productId')
      .post(authCtrl.checkSignin, purchaseCtrl.create)

router.route('/api/purchase/:id')
      .get(authCtrl.checkSignin, purchaseCtrl.read)
      .put(authCtrl.checkSignin, purchaseCtrl.update)
      .delete(authCtrl.checkSignin, purchaseCtrl.destroy)

router.param('supplierId', supplierCtrl.supplierById)
router.param('productId', productCtrl.productById)
router.param('id', purchaseCtrl.purchaseById)

export default router