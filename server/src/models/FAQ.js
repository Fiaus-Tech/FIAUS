import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true
    },
    questionAr: String,
    answer: {
      type: String,
      required: true
    },
    answerAr: String,
    category: {
      type: String,
      default: 'Services'
    },
    categoryAr: String,
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

export default mongoose.model('FAQ', faqSchema);

