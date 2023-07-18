import dbErrorHandler from '../helpers/dbErrorHandler.js'
import Purchase from '../models/purchase.model.js'
import Product from '../models/product.model.js'
import Supplier from '../models/supplier.model.js'
import generator from '../helpers/generator.js'
import extend from 'lodash/extend.js'

const purchaseProjections = {
  '_id': false,
  '__v': false
}

const findAll = async (req, res) => {
  try {
    const result = await Purchase.find({}, purchaseProjections)
                                .populate('supplier product')
                                .populate('user', '_id name')

    return res.status(200).json({result})
  } catch (err) {
    return res.status(500).json({
      error: dbErrorHandler.getErrorMessage(err)
    })
  }
}

const create = async (req, res) => {
  try {
    let date = new Date(req.body.date)
    date = date.setHours(date.getHours() + 7)

    req.body.date = new Date(date).toISOString()
    let newPurchase = {
      id: generator.generateId(8),
      supplier: req.supplier,
      product: req.product,
      user: req.auth,
      ...req.body
    }

    if(req.body.stock < 1){
      throw new Error("Stock tidak boleh kurang dari 1")
    }

    // update stock count
    let stockCount = parseInt(req.product.stock) + parseInt(req.body.stock);

    // add sell data
    const purchase = new Purchase(newPurchase)
    await purchase.save()

    await Product.findByIdAndUpdate(req.product._id, {
      stock: stockCount
    })

    return res.status(200).json({
      messages: 'Purchase successfully created',
    })

  } catch (err){
    return res.status(500).json({
      error: dbErrorHandler.getErrorMessage(err)
    })
  }
}

const purchaseById = async (req, res, next, id) => {
  try {
    const purchase = await Purchase.findOne({id})
    req.purchase = purchase
    next()
  } catch (err) {
    return res.status(500).json({
      error: dbErrorHandler.getErrorMessage(err)
    })
  }
}

const read = async (req, res) => {
  try {
    const purchase = await Purchase.findOne({id: req.params.id}, purchaseProjections).populate('supplier product')
    return res.status(200).json(purchase)
  } catch (err) {
    return res.status(500).json({
      error: dbErrorHandler.getErrorMessage(err)
    })
  }
}

const update = async (req, res) => {
  try {
    let product = await Product.findOne({id: req.body.product})
    let supplier = await Supplier.findOne({id: req.body.supplier})

    let updatedPurchase = {
      ...req.body,
      product,
      supplier,
      user:req.auth
    }

    let purchase = req.purchase
    purchase = extend(purchase, updatedPurchase)
    await purchase.save()
    return res.status(200).json({ 
      messages: 'Successfully updated product'
    })
  } catch (err) {
    return res.status(500).json({
      error: dbErrorHandler.getErrorMessage(err)
    })
  }
}

const destroy = async (req, res) => {
  try {
    await Purchase.deleteOne({id: req.params.id})
    return res.status(200).json({
      messages: 'Successfully deleted product'
    })
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
  purchaseById
}