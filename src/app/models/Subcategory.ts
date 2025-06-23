import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  slug: {
    type: String,
    required: true,
    
    trim: true,
    match: /^[a-z0-9-]+$/
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  image: {
    type: String,
    trim: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  navbarCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NavbarCategory',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add indexes for better query performance
// Remove this line:
// subcategorySchema.index({ slug: 1 }, { unique: true });
// Keep other indexes
subcategorySchema.index({ categoryId: 1 });
subcategorySchema.index({ navbarCategoryId: 1 });

// Virtual population for related data
subcategorySchema.virtual('category', {
  ref: 'Category',
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true
});

subcategorySchema.virtual('navbarCategory', {
  ref: 'NavbarCategory',
  localField: 'navbarCategoryId',
  foreignField: '_id',
  justOne: true
});

// Pre-save hook to ensure consistency
subcategorySchema.pre('save', async function (next) {
  const category = await mongoose.models.Category.findById(this.categoryId);
  if (!category) {
    throw new Error('Invalid categoryId: Category not found');
  }

  const navbarCategory = await mongoose.models.NavbarCategory.findById(this.navbarCategoryId);
  if (!navbarCategory) {
    throw new Error('Invalid navbarCategoryId: NavbarCategory not found');
  }

  // Ensure the category belongs to the navbarCategory
  if (category.navbarCategoryId.toString() !== this.navbarCategoryId.toString()) {
    throw new Error('Category does not belong to the specified NavbarCategory');
  }

  next();
});

const Subcategory = mongoose.models.Subcategory || mongoose.model('Subcategory', subcategorySchema);

export default Subcategory;