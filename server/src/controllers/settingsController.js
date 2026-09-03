import mongoose from 'mongoose';
import WebsiteSettings from '../models/WebsiteSettings.js';
import Lead from '../models/Lead.js';
import Project from '../models/Project.js';
import Service from '../models/Service.js';
import ContactMessage from '../models/ContactMessage.js';
import BlogPost from '../models/BlogPost.js';
import { store } from '../utils/store.js';

const isMongoConnected = () => mongoose.connection.readyState === 1;

export const getSettings = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      let settings = await WebsiteSettings.findOne();
      if (!settings) settings = await WebsiteSettings.create({});
      return res.status(200).json({ success: true, data: settings });
    }

    const settings = store.getSettings();
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      let settings = await WebsiteSettings.findOne();
      if (!settings) {
        settings = await WebsiteSettings.create(req.body);
      } else {
        settings = await WebsiteSettings.findByIdAndUpdate(settings._id, req.body, { new: true });
      }
      return res.status(200).json({ success: true, data: settings });
    }

    let settings = store.getSettings();
    settings = { ...settings, ...req.body };
    store.saveSettings(settings);
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

export const getDashboardMetrics = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      const totalLeads = await Lead.countDocuments();
      const newLeads = await Lead.countDocuments({ status: 'New' });
      const inDiscussionLeads = await Lead.countDocuments({ status: { $in: ['Contacted', 'In Discussion', 'Proposal Sent'] } });
      const wonLeads = await Lead.countDocuments({ status: 'Won' });
      const totalProjects = await Project.countDocuments();
      const totalServices = await Service.countDocuments();
      const unreadMessages = await ContactMessage.countDocuments({ read: false });
      const publishedBlogs = await BlogPost.countDocuments({ status: 'published' });

      const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(5);
      const recentMessages = await ContactMessage.find().sort({ createdAt: -1 }).limit(5);

      return res.status(200).json({
        success: true,
        data: {
          totalLeads,
          newLeads,
          inDiscussionLeads,
          wonLeads,
          totalProjects,
          totalServices,
          unreadMessages,
          publishedBlogs,
          recentLeads,
          recentMessages
        }
      });
    }

    const leads = store.getLeads();
    const projects = store.getProjects();
    const services = store.getServices();
    const messages = store.getMessages();

    res.status(200).json({
      success: true,
      data: {
        totalLeads: leads.length,
        newLeads: leads.filter((l) => l.status === 'New').length,
        inDiscussionLeads: leads.filter((l) => ['Contacted', 'In Discussion', 'Proposal Sent'].includes(l.status)).length,
        wonLeads: leads.filter((l) => l.status === 'Won').length,
        totalProjects: projects.length,
        totalServices: services.length,
        unreadMessages: messages.filter((m) => !m.read).length,
        publishedBlogs: 0,
        recentLeads: leads.slice(0, 5),
        recentMessages: messages.slice(0, 5)
      }
    });
  } catch (error) {
    next(error);
  }
};

