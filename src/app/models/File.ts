import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  name: String,
  type: String,
  size: Number,
  data: Buffer,
}, { timestamps: true });

const File = mongoose.models.File || mongoose.model('File', fileSchema);

export default File; 