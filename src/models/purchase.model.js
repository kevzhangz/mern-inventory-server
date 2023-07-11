import mongoose from 'mongoose'

const PurchaseSchema = new mongoose.Schema({
  id: String,
  date: Date,
  stock: Number,
  price: Number,
  supplier: {
    type: mongoose.Schema.ObjectId,
    ref: 'Supplier'
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

export default mongoose.model('Purchase', PurchaseSchema);