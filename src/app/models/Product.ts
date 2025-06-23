import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  images: [{ type: String }],
  catalogImage: { type: String },
  catalogImages: [{ type: String }],
  navbarCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NavbarCategory',
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory'
  },
  createdAt: { type: Date, default: Date.now }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true
});

// Add indexes for better query performance
productSchema.index({ name: 'text' });
productSchema.index({ navbarCategoryId: 1 });
productSchema.index({ categoryId: 1 });
productSchema.index({ subcategoryId: 1 });

// Virtual population
productSchema.virtual('navbarCategory', {
  ref: 'NavbarCategory',
  localField: 'navbarCategoryId',
  foreignField: '_id',
  justOne: true
});

productSchema.virtual('category', {
  ref: 'Category',
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true
});

productSchema.virtual('subcategory', {
  ref: 'Subcategory',
  localField: 'subcategoryId',
  foreignField: '_id',
  justOne: true
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);