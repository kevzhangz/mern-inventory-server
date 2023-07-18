import mongoose from 'mongoose'

const SellSchema = new mongoose.Schema({
  id: String,
  date: {
    type: Date,
    required: 'Sell Date is required'
  },
  buyer: {
    type: String,
    required: 'Buyer name is required'
  },
  quantity: {
    type: Number,
    required: 'Quantity is required'
  },
  price: {
    type: Number,
    required: 'Price is required'
  },
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