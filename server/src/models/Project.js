import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
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
    shortDescription: {
      type: String,
      required: true
    },
    shortDescriptionAr: {
      type: String
    },
    fullDescription: {
      type: String,
      required: true
    },
    fullDescriptionAr: {
      type: String
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    categoryAr: {
      type: String,
      trim: true
    },
    projectType: {
      type: String,
      default: 'Production Web Application',
      trim: true
    },
    projectTypeAr: {
      type: String,
      trim: true
    },
    technologies: [
      {
        type: String,
        trim: true
      }
    ],
    features: [
      {
        type: String,
        trim: true
      }
    ],
    featuresAr: [
      {
        type: String,
        trim: true
      }
    ],
    challenge: {
      type: String
    },
    challengeAr: {
      type: String
    },
    solution: {
      type: String
    },
    solutionAr: {
      type: String
    },
    coverImage: {
      type: String,
      required: true
    },
    screenshots: [
      {
        title: { type: String, default: '' },
        titleAr: { type: String, default: '' },
        caption: { type: String, default: '' },
        captionAr: { type: String, default: '' },
        url: { type: String, required: true },
        order: { type: Number, default: 0 },
        public_id: { type: String, default: '' }
      }
    ],
    gallery: [
      {
        title: { type: String, default: '' },
        titleAr: { type: String, default: '' },
        caption: { type: String, default: '' },
        captionAr: { type: String, default: '' },
        url: { type: String, required: true },
        order: { type: Number, default: 0 },
        public_id: { type: String, default: '' }
      }
    ],
    githubUrl: {
      type: String,
      trim: true
    },
    liveUrl: {
      type: String,
      trim: true
    },
    featured: {
      type: Boolean,
      default: true
    },
    displayOrder: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['published', 'draft', 'archived'],
      default: 'published'
    },
    seoTitle: String,
    seoDescription: String
  },
  { timestamps: true }
);

projectSchema.index({ displayOrder: 1, createdAt: -1 });

export default mongoose.model('Project', projectSchema);

