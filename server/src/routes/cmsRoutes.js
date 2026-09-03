import express from 'express';
import {
  submitContactMessage,
  getContactMessages,
  markContactMessageRead,
  deleteContactMessage,
  getFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} from '../controllers/cmsController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Contact Messages
router.post('/contact', submitContactMessage);
router.get('/contact', protect, getContactMessages);
router.put('/contact/:id/read', protect, markContactMessageRead);
router.delete('/contact/:id', protect, deleteContactMessage);

// FAQs
router.get('/faqs', getFAQs);
router.post('/faqs', protect, createFAQ);
router.put('/faqs/:id', protect, updateFAQ);
router.delete('/faqs/:id', protect, deleteFAQ);

// Team Members
router.get('/team', getTeamMembers);
router.post('/team', protect, createTeamMember);
router.put('/team/:id', protect, updateTeamMember);
router.delete('/team/:id', protect, deleteTeamMember);

// Testimonials
router.get('/testimonials', getTestimonials);
router.post('/testimonials', protect, createTestimonial);
router.put('/testimonials/:id', protect, updateTestimonial);
router.delete('/testimonials/:id', protect, deleteTestimonial);

// Blog Posts
router.get('/blog', getBlogPosts);
router.get('/blog/:slug', getBlogPostBySlug);
router.post('/blog', protect, createBlogPost);
router.put('/blog/:id', protect, updateBlogPost);
router.delete('/blog/:id', protect, deleteBlogPost);

export default router;

