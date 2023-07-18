import dbErrorHandler from '../helpers/dbErrorHandler.js'
import Sell from '../models/sell.model.js'
import Product from '../models/product.model.js'
import generator from '../helpers/generator.js'
import extend from 'lodash/extend.js'

const sellProjections = {
  '_id': false,
  '__v': false
}

const findAll = async (req, res) => {
  try {
    const result = await Sell.find({}, sellProjections)
                            .populate('product')
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
    let newSell = {
      id: generator.generateId(8),
      product: req.product,
      user: req.auth,
      ...req.body
    }

    if(req.body.quantity < 1){
      throw new Error("Jumlah penjualan tidak boleh kurang dari 1")
    }

    // update stock count
    let stockCount = parseInt(req.product.stock) - parseInt(req.body.quantity);
    if(stockCount < 0){
      throw new Error("Penjualan melebihi stock")
    }

    // add sell data
    const sell = new Sell(newSell)
    await sell.save()

    await Product.findByIdAndUpdate(req.product._id, {
      stock: stockCount
    })

    return res.status(200).json({
      messages: 'Sell successfully created',
    })

  } catch (err){
    return res.status(500).json({
      error: dbErrorHandler.getErrorMessage(err)
    })
  }
}

const read = async (req, res) => {
  try {
    const sell = await Sell.findOne({id: req.params.id}, sellProjections).populate('product')
    return res.status(200).json(sell)
  } catch (err) {
    return res.status(500).json({
      error: dbErrorHandler.getErrorMessage(err)
    })
  }
}

const update = async (req, res) => {
  try {
    let product = await Product.findOne({id: req.body.product})

    let updatedSell = {
      ...req.body,
      product,
      user:req.auth
    }

    let sell = req.sell
    sell = extend(sell, updatedSell)
    await sell.save()
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
    await Sell.deleteOne({id: req.params.id})
    return res.status(200).json({
      messages: 'Successfully deleted product'
    })
  } catch (err) {
    return res.status(500).json({
      error: dbErrorHandler.getErrorMessage(err)
    })
  }
}

const sellById = async (req, res, next, id) => {
  try {
    const sell = await Sell.findOne({id})
    req.sell = sell
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
  sellById
}