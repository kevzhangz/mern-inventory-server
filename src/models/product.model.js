import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    required: "Product Name is required"
  },
  brand: {
    type: String,
    required: "Brand is required"
  },
  stock: {
    type: Number,
    required: "Stock is required"
  },
  price: {
    type: Number,
    required: "Price is required"
  },
})

export default mongoose.model('Product', ProductSchema);