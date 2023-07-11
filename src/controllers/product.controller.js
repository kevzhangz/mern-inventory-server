import dbErrorHandler from '../helpers/dbErrorHandler.js'
import Product from '../models/product.model.js'
import generator from '../helpers/generator.js'

const productProjections = {
  '_id': false,
  '__v': false
}

const findAll = async (req, res) => {
  try {
    let result = await Product.find({}, productProjections)
    return res.status(200).json({result})
  } catch (err) {
    return res.status(500).json({
      error: dbErrorHandler.getErrorMessage(err)
    })
  }
}

const create = async (req, res) => {
  req.body.id = generator.generateId(6)

  const product = new Product(req.body)
  try {
    let result = await product.save()
    return res.status(200).json({
      messages: 'Product successfully added',
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
    const product = await Product.findOne({id: req.params.id}, productProjections)
    return res.status(200).json(product)
  } catch (err) {
    return res.status(500).json({
      error: dbErrorHandler.getErrorMessage(err)
    })
  }

}

const update = async (req, res) => {

}

const destroy = async (req, res) => {
  try {
    await Product.deleteOne({id: req.params.id})
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
  destroy
}