import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    titleAr: String,
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    excerpt: {
      type: String,
      required: true
    },
    excerptAr: String,
    content: {
      type: String,
      required: true
    },
    contentAr: String,
    coverImage: String,
    category: {
      type: String,
      default: 'Engineering & AI'
    },
    categoryAr: String,
    tags: [String],
    author: {
      name: { type: String, default: 'FIAUS Tech Research Team' },
      avatar: String
    },
    readTime: {
      type: String,
      default: '5 min read'
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft'
    },
    publishedAt: Date,
    seoTitle: String,
    seoDescription: String
  },
  { timestamps: true }
);

blogPostSchema.index({ status: 1, publishedAt: -1 });

export default mongoose.model('BlogPost', blogPostSchema);

