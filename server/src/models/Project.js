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
      enum: [
        'Web Engineering',
        'Full-Stack & Cloud',
        'AI & Intelligent Automation',
        'Cybersecurity & Tools',
        'E-Commerce & Retail',
        'Brand Experience & Hospitality'
      ]
    },
    categoryAr: {
      type: String
    },
    projectType: {
      type: String,
      default: 'Production Web Application'
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
        title: String,
        url: String
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

