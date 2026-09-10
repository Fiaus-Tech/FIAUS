import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    titleAr: {
      type: String,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    category: {
      type: String,
      default: 'Web & App Engineering',
      trim: true
    },
    categoryAr: {
      type: String,
      trim: true
    },
    icon: {
      type: String,
      default: 'Code'
    },
    shortDescription: {
      type: String,
      required: true
    },
    shortDescriptionAr: {
      type: String
    },
    fullDescription: {
      type: String
    },
    fullDescriptionAr: {
      type: String
    },
    deliverables: [
      {
        type: String
      }
    ],
    deliverablesAr: [
      {
        type: String
      }
    ],
    technologies: [
      {
        type: String
      }
    ],
    displayOrder: {
      type: Number,
      default: 0
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

serviceSchema.index({ category: 1, displayOrder: 1 });

export default mongoose.model('Service', serviceSchema);

