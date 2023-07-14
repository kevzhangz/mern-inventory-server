import express from 'express'
import supplierCtrl from '../controllers/supplier.controller.js'

const router = express.Router()

router.route('/api/supplier')
      .get(supplierCtrl.findAll)
      .post(supplierCtrl.create)

router.route('/api/supplier/:id')
      .get(supplierCtrl.read)
      .put(supplierCtrl.update)
      .delete(supplierCtrl.destroy)

router.param('id', supplierCtrl.supplierById)

export default router;