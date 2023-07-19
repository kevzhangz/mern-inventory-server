import express from 'express'
import supplierCtrl from '../controllers/supplier.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/api/supplier')
      .get(authCtrl.checkSignin, supplierCtrl.findAll)
      .post(authCtrl.checkSignin, supplierCtrl.create)

router.route('/api/supplier/:id')
      .get(authCtrl.checkSignin, supplierCtrl.read)
      .put(authCtrl.checkSignin, supplierCtrl.update)
      .delete(authCtrl.checkSignin, supplierCtrl.destroy)

router.param('id', supplierCtrl.supplierById)

export default router;