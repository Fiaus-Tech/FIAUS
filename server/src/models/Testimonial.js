import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
      trim: true
    },
    clientNameAr: String,
    company: {
      type: String,
      required: true,
      trim: true
    },
    position: {
      type: String,
      trim: true
    },
    positionAr: String,
    photo: String,
    testimonial: {
      type: String,
      required: true
    },
    testimonialAr: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    projectRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    },
    displayOrder: {
      type: Number,
      default: 0
    },
    published: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Testimonial', testimonialSchema);

