import mongoose from 'mongoose';

const websiteSettingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: 'FIAUS Tech'
    },
    descriptor: {
      type: String,
      default: 'Digital & AI Agency'
    },
    descriptorAr: {
      type: String,
      default: 'وكالة رقمية وحلول الذكاء الاصطناعي'
    },
    tagline: {
      type: String,
      default: 'Innovate. Automate. Grow.'
    },
    taglineAr: {
      type: String,
      default: 'ابتكر. أتمت. انمو.'
    },
    email: {
      type: String,
      default: 'fiaustech@hotmail.com'
    },
    phone: {
      type: String,
      default: '+966 51 126 9264'
    },
    whatsapp: {
      type: String,
      default: '+966511269264'
    },
    telegram: {
      type: String,
      default: 'https://t.me/fiaustech'
    },
    websiteUrl: {
      type: String,
      default: 'https://fiaus.tech'
    },
    socialLinks: {
      facebook: { type: String, default: 'https://facebook.com/fiaustech' },
      instagram: { type: String, default: 'https://instagram.com/fiaustech' },
      x: { type: String, default: 'https://x.com/fiaus_tech' },
      linkedin: { type: String, default: 'https://www.linkedin.com/in/fiaus-tech' },
      github: { type: String, default: 'https://github.com/Fiaus-Tech' },
      youtube: { type: String, default: 'https://youtube.com/@FiausTech' },
      telegram: { type: String, default: 'https://t.me/fiaustech' },
      tiktok: { type: String, default: 'https://tiktok.com/@fiaustech' },
      snapchat: { type: String, default: 'https://snapchat.com/add/fiaustech' }
    },
    regionsServed: {
      type: [String],
      default: ['Bangladesh', 'Saudi Arabia', 'Global']
    },
    analytics: {
      googleAnalyticsId: String,
      googleSearchConsoleTag: String,
      metaPixelId: String,
      microsoftClarityId: String
    },
    seo: {
      defaultTitle: { type: String, default: 'FIAUS Tech | Digital & AI Agency — Innovate. Automate. Grow.' },
      defaultTitleAr: { type: String, default: 'فياوس تك | وكالة التحول الرقمي والذكاء الاصطناعي' },
      defaultMetaDesc: { type: String, default: 'FIAUS Tech is a premier international Digital & AI Agency engineering high-impact web applications, intelligent AI automation, and scalable cloud solutions for clients in Bangladesh, Saudi Arabia, and worldwide.' },
      defaultMetaDescAr: { type: String, default: 'فياوس تك هي وكالة رقمية رائدة متخصصة في هندسة الويب وتطبيقات الذكاء الاصطناعي والأتمتة الذكية لخدمة الشركات في المملكة العربية السعودية وبنغلاديش وحول العالم.' },
      keywords: { type: [String], default: ['Digital Agency', 'AI Solutions', 'AI Automation', 'Web Development', 'Full-Stack Engineering', 'Saudi Arabia Tech Agency', 'Bangladesh Tech Agency'] }
    }
  },
  { timestamps: true }
);

export default mongoose.model('WebsiteSettings', websiteSettingsSchema);

