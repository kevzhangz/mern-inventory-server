import dbErrorHandler from '../helpers/dbErrorHandler.js'
import generator from '../helpers/generator.js'
import extend from 'lodash/extend.js'
import Supplier from '../models/supplier.model.js'
import Purchase from '../models/purchase.model.js'

const supplierProjections = {
  '_id': false,
  '__v': false
}

const findAll = async (req, res) => {
  try {
    let result = await Supplier.find({}, supplierProjections)
    return res.status(200).json({result})
  } catch (err) {
    return res.status(500).json({
      error: dbErrorHandler.getErrorMessage(err)
    })
  }
}

const create = async (req, res) => {
  req.body.id = generator.generateId(6)

  const supplier = new Supplier(req.body)
  try {
    let result = await supplier.save()
    return res.status(200).json({
      messages: 'Supplier successfully created',
      result
    })
  } catch (err) {
    return res.status(500).json({
      error: dbErrorHandler.getErrorMessage(err)
    })
  }
}

const read = async (req, res) => {
  try {
    const supplier = await Supplier.findOne({id: req.params.id}, supplierProjections)
    return res.status(200).json(supplier)
  } catch (err) {
    return res.status(500).json({
      error: dbErrorHandler.getErrorMessage(err)
    })
  }

}

const update = async (req, res) => {
  try {
    let supplier = req.supplier
    supplier = extend(supplier, req.body)
    await supplier.save()
    return res.status(200).json({
      messages: 'Successfully updated supplier'
    })
  } catch (err) {
    return res.status(500).json({
      error: dbErrorHandler.getErrorMessage(err)
    })
  }

}

const destroy = async (req, res) => {
  try {
    let supplier = await Supplier.findOne({id: req.params.id})

    // Delete related purchase with the supplier
    await Purchase.deleteMany({supplier: supplier._id})
    await supplier.deleteOne()

    return res.status(200).json({
      messages: 'Successfully deleted supplier'
    })
  } catch (err) {
    return res.status(500).json({
      error: dbErrorHandler.getErrorMessage(err)
    })
  }
}

const supplierById = async (req, res, next, id) => {
  try {
    const supplier = await Supplier.findOne({id})
    req.supplier = supplier
    next()
  } catch (err) {
    return res.status(500).json({
      error: dbErrorHandler.getErrorMessage(err)
    })
  }
}

export default {
  findAll,
  create,
  read,
  update,
  destroy,
  supplierById
}