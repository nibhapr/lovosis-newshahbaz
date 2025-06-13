import mongoose, { Schema } from 'mongoose';

const catalogRequestSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  productName: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'failed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Check if the model already exists before creating a new one
const CatalogRequest = mongoose.models.CatalogRequest || 
  mongoose.model('CatalogRequest', catalogRequestSchema);

export default CatalogRequest; 