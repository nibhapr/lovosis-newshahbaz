import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  content: String,
  content2: String,
  content3: String,
  image: String,
  image2: String,
  image3: String,
  date: {
    type: Date,
    required: true
  },
  time: String,
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed'],
    default: 'upcoming'
  },
  category: {
    type: String,
    enum: ['Technology', 'Innovation', 'Education', 'Manufacturing', 'Digital Services'],
    required: true
  }
}, { timestamps: true });

// Add pre-save middleware to generate slug
eventSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default Event; 