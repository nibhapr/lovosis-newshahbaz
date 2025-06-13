import mongoose from 'mongoose';

const navbarCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  image: String,
}, { timestamps: true });

const NavbarCategory = mongoose.models.NavbarCategory || mongoose.model('NavbarCategory', navbarCategorySchema);

export default NavbarCategory; 