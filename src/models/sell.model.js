import mongoose from 'mongoose'

const SellSchema = new mongoose.Schema({
  id: String,
  date: Date,
  buyer: String,
  stock: Number,
  price: Number,
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
})

export default mongoose.model('Sell', SellSchema);