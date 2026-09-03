import mongoose from 'mongoose';
import ContactMessage from '../models/ContactMessage.js';
import FAQ from '../models/FAQ.js';
import TeamMember from '../models/TeamMember.js';
import Testimonial from '../models/Testimonial.js';
import BlogPost from '../models/BlogPost.js';
import { store } from '../utils/store.js';

const isMongo = () => mongoose.connection.readyState === 1;

// --- Contact Messages ---
export const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    if (isMongo()) {
      const newMessage = await ContactMessage.create({ name, email, phone, subject, message });
      return res.status(201).json({ success: true, message: 'Thank you. Your message has been received by FIAUS Tech.', data: newMessage });
    }

    const messages = store.getMessages();
    const newMsg = {
      _id: 'msg_' + Date.now(),
      name,
      email,
      phone,
      subject,
      message,
      read: false,
      createdAt: new Date().toISOString()
    };
    messages.unshift(newMsg);
    store.saveMessages(messages);
    res.status(201).json({ success: true, message: 'Thank you. Your message has been received by FIAUS Tech.', data: newMsg });
  } catch (error) {
    next(error);
  }
};

export const getContactMessages = async (req, res, next) => {
  try {
    if (isMongo()) {
      const messages = await ContactMessage.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: messages.length, data: messages });
    }
    const list = store.getMessages();
    res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    next(error);
  }
};

export const markContactMessageRead = async (req, res, next) => {
  try {
    if (isMongo()) {
      const message = await ContactMessage.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
      return res.status(200).json({ success: true, data: message });
    }
    const list = store.getMessages();
    const item = list.find((m) => m._id === req.params.id);
    if (item) item.read = true;
    store.saveMessages(list);
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const deleteContactMessage = async (req, res, next) => {
  try {
    if (isMongo()) {
      await ContactMessage.findByIdAndDelete(req.params.id);
      return res.status(200).json({ success: true, message: 'Message deleted.' });
    }
    let list = store.getMessages();
    list = list.filter((m) => m._id !== req.params.id);
    store.saveMessages(list);
    res.status(200).json({ success: true, message: 'Message deleted.' });
  } catch (error) {
    next(error);
  }
};

// --- FAQs ---
export const getFAQs = async (req, res, next) => {
  try {
    const showAll = req.query.all === 'true';
    if (isMongo()) {
      const filter = showAll ? {} : { active: true };
      const faqs = await FAQ.find(filter).sort({ displayOrder: 1, createdAt: -1 });
      return res.status(200).json({ success: true, count: faqs.length, data: faqs });
    }
    let list = store.getFAQs();
    if (!showAll) {
      list = list.filter((f) => f.active !== false);
    }
    res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    next(error);
  }
};

export const createFAQ = async (req, res, next) => {
  try {
    if (isMongo()) {
      const faq = await FAQ.create(req.body);
      return res.status(201).json({ success: true, data: faq });
    }
    const list = store.getFAQs();
    const newFaq = {
      _id: 'faq_' + Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    list.push(newFaq);
    store.saveFAQs(list);
    res.status(201).json({ success: true, data: newFaq });
  } catch (error) {
    next(error);
  }
};

export const updateFAQ = async (req, res, next) => {
  try {
    if (isMongo()) {
      const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.status(200).json({ success: true, data: faq });
    }
    const list = store.getFAQs();
    const idx = list.findIndex((f) => f._id === req.params.id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...req.body, updatedAt: new Date().toISOString() };
      store.saveFAQs(list);
      return res.status(200).json({ success: true, data: list[idx] });
    }
    res.status(404).json({ success: false, message: 'FAQ not found.' });
  } catch (error) {
    next(error);
  }
};

export const deleteFAQ = async (req, res, next) => {
  try {
    if (isMongo()) {
      await FAQ.findByIdAndDelete(req.params.id);
      return res.status(200).json({ success: true, message: 'FAQ deleted.' });
    }
    let list = store.getFAQs();
    list = list.filter((f) => f._id !== req.params.id);
    store.saveFAQs(list);
    res.status(200).json({ success: true, message: 'FAQ deleted.' });
  } catch (error) {
    next(error);
  }
};

// --- Team Members ---
export const getTeamMembers = async (req, res, next) => {
  try {
    const showAll = req.query.all === 'true';
    if (isMongo()) {
      const filter = showAll ? {} : { status: 'active' };
      const team = await TeamMember.find(filter).sort({ displayOrder: 1 });
      return res.status(200).json({ success: true, count: team.length, data: team });
    }
    let list = store.getTeam();
    if (!showAll) {
      list = list.filter((t) => t.status !== 'inactive');
    }
    res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    next(error);
  }
};

export const createTeamMember = async (req, res, next) => {
  try {
    if (isMongo()) {
      const member = await TeamMember.create(req.body);
      return res.status(201).json({ success: true, data: member });
    }
    const list = store.getTeam();
    const newMember = {
      _id: 'team_' + Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    list.push(newMember);
    store.saveTeam(list);
    res.status(201).json({ success: true, data: newMember });
  } catch (error) {
    next(error);
  }
};

export const updateTeamMember = async (req, res, next) => {
  try {
    if (isMongo()) {
      const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.status(200).json({ success: true, data: member });
    }
    const list = store.getTeam();
    const idx = list.findIndex((m) => m._id === req.params.id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...req.body, updatedAt: new Date().toISOString() };
      store.saveTeam(list);
      return res.status(200).json({ success: true, data: list[idx] });
    }
    res.status(404).json({ success: false, message: 'Member not found.' });
  } catch (error) {
    next(error);
  }
};

export const deleteTeamMember = async (req, res, next) => {
  try {
    if (isMongo()) {
      await TeamMember.findByIdAndDelete(req.params.id);
      return res.status(200).json({ success: true, message: 'Member deleted.' });
    }
    let list = store.getTeam();
    list = list.filter((m) => m._id !== req.params.id);
    store.saveTeam(list);
    res.status(200).json({ success: true, message: 'Member deleted.' });
  } catch (error) {
    next(error);
  }
};

// --- Testimonials ---
export const getTestimonials = async (req, res, next) => {
  try {
    const showAll = req.query.all === 'true';
    if (isMongo()) {
      const filter = showAll ? {} : { published: true };
      const testimonials = await Testimonial.find(filter).sort({ displayOrder: 1 });
      return res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
    }
    let list = store.getTestimonials();
    if (!showAll) {
      list = list.filter((t) => t.published !== false);
    }
    res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (req, res, next) => {
  try {
    if (isMongo()) {
      const testimonial = await Testimonial.create(req.body);
      return res.status(201).json({ success: true, data: testimonial });
    }
    const list = store.getTestimonials();
    const newTestimonial = {
      _id: 'test_' + Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    list.push(newTestimonial);
    store.saveTestimonials(list);
    res.status(201).json({ success: true, data: newTestimonial });
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req, res, next) => {
  try {
    if (isMongo()) {
      const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.status(200).json({ success: true, data: testimonial });
    }
    const list = store.getTestimonials();
    const idx = list.findIndex((t) => t._id === req.params.id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...req.body, updatedAt: new Date().toISOString() };
      store.saveTestimonials(list);
      return res.status(200).json({ success: true, data: list[idx] });
    }
    res.status(404).json({ success: false, message: 'Testimonial not found.' });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req, res, next) => {
  try {
    if (isMongo()) {
      await Testimonial.findByIdAndDelete(req.params.id);
      return res.status(200).json({ success: true, message: 'Testimonial deleted.' });
    }
    let list = store.getTestimonials();
    list = list.filter((t) => t._id !== req.params.id);
    store.saveTestimonials(list);
    res.status(200).json({ success: true, message: 'Testimonial deleted.' });
  } catch (error) {
    next(error);
  }
};

// --- Blog Posts ---
export const getBlogPosts = async (req, res, next) => {
  try {
    const showAll = req.query.all === 'true';
    if (isMongo()) {
      const filter = showAll ? {} : { status: 'published' };
      const posts = await BlogPost.find(filter).sort({ publishedAt: -1, createdAt: -1 });
      return res.status(200).json({ success: true, count: posts.length, data: posts });
    }
    let list = store.getBlogs();
    if (!showAll) {
      list = list.filter((p) => p.status === 'published');
    }
    res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    next(error);
  }
};

export const getBlogPostBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug.toLowerCase();
    if (isMongo()) {
      const post = await BlogPost.findOne({ slug });
      if (!post) {
        return res.status(404).json({ success: false, message: 'Article not found.' });
      }
      return res.status(200).json({ success: true, data: post });
    }
    const list = store.getBlogs();
    const post = list.find((p) => p.slug?.toLowerCase() === slug);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const createBlogPost = async (req, res, next) => {
  try {
    if (isMongo()) {
      const post = await BlogPost.create(req.body);
      return res.status(201).json({ success: true, data: post });
    }
    const list = store.getBlogs();
    const newPost = {
      _id: 'blog_' + Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    list.unshift(newPost);
    store.saveBlogs(list);
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    next(error);
  }
};

export const updateBlogPost = async (req, res, next) => {
  try {
    if (isMongo()) {
      const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.status(200).json({ success: true, data: post });
    }
    const list = store.getBlogs();
    const idx = list.findIndex((p) => p._id === req.params.id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...req.body, updatedAt: new Date().toISOString() };
      store.saveBlogs(list);
      return res.status(200).json({ success: true, data: list[idx] });
    }
    res.status(404).json({ success: false, message: 'Article not found.' });
  } catch (error) {
    next(error);
  }
};

export const deleteBlogPost = async (req, res, next) => {
  try {
    if (isMongo()) {
      await BlogPost.findByIdAndDelete(req.params.id);
      return res.status(200).json({ success: true, message: 'Article deleted.' });
    }
    let list = store.getBlogs();
    list = list.filter((p) => p._id !== req.params.id);
    store.saveBlogs(list);
    res.status(200).json({ success: true, message: 'Article deleted.' });
  } catch (error) {
    next(error);
  }
};
