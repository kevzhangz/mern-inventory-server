import mongoose from 'mongoose'

const SupplierSchema = new mongoose.Schema({
  id: String,
  name: String,
  address: String,
  phone_number: String,
})

export default mongoose.model('Supplier', SupplierSchema)