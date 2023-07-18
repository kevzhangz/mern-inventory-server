import mongoose from 'mongoose'

const PurchaseSchema = new mongoose.Schema({
  id: String,
  date: {
    type: Date,
    required: 'Sell Date is required'
  },
  stock: {
    type: Number,
    required: "Quantity is required"
  },
  price: {
    type: Number,
    required: "Price is required"
  },
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