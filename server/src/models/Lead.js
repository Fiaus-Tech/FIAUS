import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    whatsapp: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      default: 'International'
    },
    company: {
      type: String,
      trim: true
    },
    serviceNeeded: {
      type: String,
      required: true
    },
    budget: {
      type: String,
      default: '$3,000 - $5,000'
    },
    projectDetails: {
      type: String,
      required: true
    },
    preferredContact: {
      type: String,
      default: 'WhatsApp'
    },
    fileAttachment: {
      type: String
    },
    status: {
      type: String,
      default: 'New'
    },
    internalNotes: [
      {
        note: String,
        author: String,
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  { timestamps: true }
);

leadSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model('Lead', leadSchema);

