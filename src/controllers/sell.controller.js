import dbErrorHandler from '../helpers/dbErrorHandler.js'
import Sell from '../models/sell.model.js'
import Product from '../models/product.model.js'
import generator from '../helpers/generator.js'

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
    let newSell = {
      id: generator.generateId(8),
      product: req.product,
      user: req.auth,
      ...req.body
    }

    if(req.product.stock - req.body.stock < 0){
      throw new Error("Penjualan melebihi stock")
    }

    // update stock count
    let stockCount = req.product.stock - req.body.stock;
    await Product.findByIdAndUpdate(req.product._id, {
      stock: stockCount
    })

    // add sell data
    const sell = new Sell(newSell)
    await sell.save()

    return res.status(200).json({
      messages: 'Sell successfully created',
    })

  } catch (err){
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
  sellById
}