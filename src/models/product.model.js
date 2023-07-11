import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  id: String,
  name: String,
  brand: String,
  stock: Number,
  price: Number,
})

export default mongoose.model('Product', ProductSchema);