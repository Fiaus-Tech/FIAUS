import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    nameAr: String,
    position: {
      type: String,
      required: true,
      trim: true
    },
    positionAr: String,
    bio: String,
    bioAr: String,
    photo: String,
    socialLinks: {
      linkedin: String,
      github: String,
      twitter: String,
      portfolio: String
    },
    displayOrder: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    }
  },
  { timestamps: true }
);

export default mongoose.model('TeamMember', teamMemberSchema);

