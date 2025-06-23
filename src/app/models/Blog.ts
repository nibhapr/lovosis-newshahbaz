import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,

  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: "Site Admin"
  },
  tags: [String],
  published: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Create indexes for better query performance
// Remove this line:
// blogSchema.index({ slug: 1 });
// Keep other indexes
blogSchema.index({ category: 1, date: -1 });

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;