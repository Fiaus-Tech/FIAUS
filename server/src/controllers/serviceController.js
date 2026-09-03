import mongoose from 'mongoose';
import Service from '../models/Service.js';
import { store } from '../utils/store.js';

const isMongoConnected = () => mongoose.connection.readyState === 1;

export const getServices = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      const filter = req.query.all === 'true' ? {} : { active: true };
      const services = await Service.find(filter).sort({ category: 1, displayOrder: 1 });
      if (services.length > 0) {
        return res.status(200).json({ success: true, count: services.length, data: services });
      }
    }

    let services = store.getServices();
    if (services.length === 0) {
      // Return predefined services
      services = [
        { _id: 's1', title: 'Web Development', titleAr: 'تطوير المواقع والتطبيقات', slug: 'web-development', category: 'Web & App Engineering', categoryAr: 'هندسة الويب والتطبيقات', icon: 'Code', shortDescription: 'High-performance, bespoke web platforms engineered with React, Next.js, and modern architecture.', shortDescriptionAr: 'منصات ويب مخصصة فائقة الأداء مبنية بأحدث تقنيات React و Next.js.', deliverables: ['Custom Web Applications', 'API Integration', 'Responsive UI/UX', 'SEO Architecture', 'Speed Optimization'], technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS'], displayOrder: 1, active: true },
        { _id: 's2', title: 'Full-Stack Development', titleAr: 'تطوير المنظومات المتكاملة', slug: 'full-stack-development', category: 'Web & App Engineering', categoryAr: 'هندسة الويب والتطبيقات', icon: 'Layers', shortDescription: 'End-to-end full-stack architectures connecting robust database layers with intuitive client interfaces.', shortDescriptionAr: 'بنية برمجية متكاملة تربط قواعد البيانات القوية بواجهات استخدام تفاعلية وسريعة.', deliverables: ['Database Design & Modeling', 'REST & GraphQL APIs', 'Secure Auth Systems', 'Cloud Deployment'], technologies: ['MongoDB', 'PostgreSQL', 'Express.js', 'Node.js', 'Docker'], displayOrder: 2, active: true },
        { _id: 's3', title: 'AI Solutions & LLM Integration', titleAr: 'حلول الذكاء الاصطناعي ودمج النماذج', slug: 'ai-solutions', category: 'AI & Intelligent Automation', categoryAr: 'الذكاء الاصطناعي والأتمتة الذكية', icon: 'Cpu', shortDescription: 'Custom AI agent integrations, RAG knowledge bases, and LLM-powered business intelligence.', shortDescriptionAr: 'دمج وكلاء الذكاء الاصطناعي وقواعد المعرفة التفاعلية وتحليلات الأعمال الذكية.', deliverables: ['Custom LLM Workflows', 'RAG Enterprise Search', 'Internal AI Copilots', 'Data Extraction Pipelines'], technologies: ['OpenAI API', 'Gemini Models', 'LangChain', 'Vector DBs', 'Python'], displayOrder: 3, active: true },
        { _id: 's4', title: 'AI Automation & Workflow Systems', titleAr: 'الأتمتة الذكية وسير العمل الآلي', slug: 'ai-automation', category: 'AI & Intelligent Automation', categoryAr: 'الذكاء الاصطناعي والأتمتة الذكية', icon: 'Zap', shortDescription: 'Automate repetitive enterprise tasks, CRM synchronization, lead routing, and document processing.', shortDescriptionAr: 'أتمتة المهام المتكررة ومزامنة أنظمة إدارة العملاء ومعالجة المستندات آلياً.', deliverables: ['Zapier & Make Automations', 'Custom Webhook Pipelines', 'Automated Lead Routing', 'Data Sync Bots'], technologies: ['Make.com', 'Zapier', 'Node.js Microservices', 'REST Webhooks'], displayOrder: 4, active: true },
        { _id: 's5', title: 'WhatsApp Marketing & AI Bots', titleAr: 'تسويق وروبوتات واتساب الذكية', slug: 'whatsapp-marketing', category: 'AI & Intelligent Automation', categoryAr: 'الذكاء الاصطناعي والأتمتة الذكية', icon: 'MessageSquare', shortDescription: 'Automated WhatsApp Cloud API workflows, 24/7 intelligent customer engagement, and broadcast campaigns.', shortDescriptionAr: 'أتمتة التواصل عبر واتساب للأعمال، روبوتات محادثة ذكية على مدار الساعة، وحملات بث مخصصة.', deliverables: ['WhatsApp Business Cloud API', 'Automated Support Bots', 'Broadcast Messaging', 'CRM Lead Sync'], technologies: ['Meta WhatsApp Cloud API', 'Node.js', 'Webhook Queues'], displayOrder: 5, active: true },
        { _id: 's6', title: 'E-Commerce Architecture', titleAr: 'حلول ومتاجر التجارة الإلكترونية', slug: 'ecommerce-solutions', category: 'Web & App Engineering', categoryAr: 'هندسة الويب والتطبيقات', icon: 'ShoppingBag', shortDescription: 'High-conversion online retail platforms engineered for speed, custom checkout workflows, and inventory sync.', shortDescriptionAr: 'متاجر إلكترونية عالية التحويل مصممة للسرعة وإدارة المنتجات والدفع الإلكتروني السلس.', deliverables: ['Custom Storefronts', 'Payment Gateway Integration', 'Inventory Management', 'Order Tracking Pipelines'], technologies: ['Shopify Custom', 'Next.js Commerce', 'Stripe', 'Node.js'], displayOrder: 6, active: true },
        { _id: 's7', title: 'Google & Meta Ads Growth', titleAr: 'إعلانات جوجل وميتا الممولة', slug: 'google-meta-ads', category: 'Growth & Performance Marketing', categoryAr: 'التسويق الرقمي ونمو المبيعات', icon: 'Target', shortDescription: 'High-ROI search and paid social campaigns targeted to capture high-intent buyers in Saudi Arabia and global markets.', shortDescriptionAr: 'حملات إعلانية عالية العائد على جوجل وميتا للوصول إلى المشترين في الأسواق المستهدفة.', deliverables: ['Keyword Intent Research', 'Ad Creative Testing', 'Conversion Tracking Setup', 'Pixel & CAPI Tracking'], technologies: ['Google Ads', 'Meta Ads', 'GA4', 'Tag Manager'], displayOrder: 7, active: true },
        { _id: 's8', title: 'UI/UX Design & Brand Experience', titleAr: 'تصميم واجهات وتجربة المستخدم', slug: 'ui-ux-design', category: 'UI/UX & Brand Design', categoryAr: 'التصميم وتجربة المستخدم والهوية', icon: 'Palette', shortDescription: 'Human-centered user interfaces, interactive prototypes, and luxury design systems.', shortDescriptionAr: 'واجهات مستخدم تفاعلية وجذابة مع نماذج أولية متطورة وأنظمة تصميم متكاملة.', deliverables: ['Wireframing & User Flows', 'Interactive Prototypes', 'Design System Components', 'Brand Guidelines'], technologies: ['Figma', 'Design Systems', 'Micro-Animations'], displayOrder: 8, active: true }
      ];
      store.saveServices(services);
    }

    if (req.query.all !== 'true') {
      services = services.filter((s) => s.active !== false);
    }
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    next(error);
  }
};

export const getServiceBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug.toLowerCase();
    if (isMongoConnected()) {
      const service = await Service.findOne({ slug });
      if (service) return res.status(200).json({ success: true, data: service });
    }

    const services = store.getServices();
    const service = services.find((s) => s.slug.toLowerCase() === slug);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found.' });
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

export const createService = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      const service = await Service.create(req.body);
      return res.status(201).json({ success: true, data: service });
    }

    const services = store.getServices();
    const newService = { _id: 's_' + Date.now(), ...req.body, createdAt: new Date().toISOString() };
    services.push(newService);
    store.saveServices(services);
    res.status(201).json({ success: true, data: newService });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (service) return res.status(200).json({ success: true, data: service });
    }

    const services = store.getServices();
    const index = services.findIndex((s) => s._id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Service not found.' });
    services[index] = { ...services[index], ...req.body };
    store.saveServices(services);
    res.status(200).json({ success: true, data: services[index] });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      await Service.findByIdAndDelete(req.params.id);
    }
    let services = store.getServices();
    services = services.filter((s) => s._id !== req.params.id);
    store.saveServices(services);
    res.status(200).json({ success: true, message: 'Service deleted.' });
  } catch (error) {
    next(error);
  }
};

