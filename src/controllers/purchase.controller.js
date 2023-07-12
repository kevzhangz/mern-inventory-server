import dbErrorHandler from '../helpers/dbErrorHandler.js'
import Purchase from '../models/purchase.model.js'
import Product from '../models/product.model.js'
import generator from '../helpers/generator.js'

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
    let newPurchase = {
      id: generator.generateId(8),
      supplier: req.supplier,
      product: req.product,
      user: req.auth,
      ...req.body
    }

    // update stock count
    let stockCount = req.product.stock + req.body.stock;
    await Product.findByIdAndUpdate(req.product._id, {
      stock: stockCount
    })

    // add sell data
    const purchase = new Purchase(newPurchase)
    await purchase.save()

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

export default {
  findAll,
  create,
  purchaseById
}