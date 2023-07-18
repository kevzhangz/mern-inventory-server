import mongoose from 'mongoose'

const SupplierSchema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    required: 'Supplier name is required'
  },
  address: {
    type: String,
    required: 'Supplier address is required'
  },
  phone_number: {
    type: String,
    required: 'Supplier phone number is required'
  },
})

export default mongoose.model('Supplier', SupplierSchema)