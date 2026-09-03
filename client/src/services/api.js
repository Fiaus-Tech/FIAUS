import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to add Authorization token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('fiaus_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor for uniform error messages
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'An unexpected network error occurred.';
    return Promise.reject(new Error(message));
  }
);

// Projects API
export const fetchProjects = (params) => api.get('/projects', { params });
export const fetchProjectBySlug = (slug) => api.get(`/projects/${slug}`);
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);
export const reorderProjects = (orderedIds) => api.put('/projects/reorder', { orderedIds });

// Leads CRM API
export const submitLeadInquiry = (data) => api.post('/leads', data);
export const fetchLeads = (params) => api.get('/leads', { params });
export const fetchLeadById = (id) => api.get(`/leads/${id}`);
export const updateLeadStatus = (id, data) => api.put(`/leads/${id}`, data);
export const deleteLead = (id) => api.delete(`/leads/${id}`);

// Services API
export const fetchServices = (params) => api.get('/services', { params });
export const fetchServiceBySlug = (slug) => api.get(`/services/${slug}`);
export const createService = (data) => api.post('/services', data);
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = (id) => api.delete(`/services/${id}`);

// Contact & Messages API
export const submitContact = (data) => api.post('/cms/contact', data);
export const fetchContactMessages = () => api.get('/cms/contact');
export const markContactMessageRead = (id) => api.put(`/cms/contact/${id}/read`);
export const deleteContactMessage = (id) => api.delete(`/cms/contact/${id}`);

// FAQs CMS API
export const fetchFAQs = (params) => api.get('/cms/faqs', { params });
export const createFAQ = (data) => api.post('/cms/faqs', data);
export const updateFAQ = (id, data) => api.put(`/cms/faqs/${id}`, data);
export const deleteFAQ = (id) => api.delete(`/cms/faqs/${id}`);

// Team Members CMS API
export const fetchTeamMembers = (params) => api.get('/cms/team', { params });
export const createTeamMember = (data) => api.post('/cms/team', data);
export const updateTeamMember = (id, data) => api.put(`/cms/team/${id}`, data);
export const deleteTeamMember = (id) => api.delete(`/cms/team/${id}`);

// Testimonials CMS API
export const fetchTestimonials = (params) => api.get('/cms/testimonials', { params });
export const createTestimonial = (data) => api.post('/cms/testimonials', data);
export const updateTestimonial = (id, data) => api.put(`/cms/testimonials/${id}`, data);
export const deleteTestimonial = (id) => api.delete(`/cms/testimonials/${id}`);

// Blog Posts CMS API
export const fetchBlogPosts = (params) => api.get('/cms/blog', { params });
export const fetchBlogPostBySlug = (slug) => api.get(`/cms/blog/${slug}`);
export const createBlogPost = (data) => api.post('/cms/blog', data);
export const updateBlogPost = (id, data) => api.put(`/cms/blog/${id}`, data);
export const deleteBlogPost = (id) => api.delete(`/cms/blog/${id}`);

// Settings & Analytics
export const fetchSettings = () => api.get('/settings');
export const updateSettings = (data) => api.put('/settings', data);
export const fetchDashboardMetrics = () => api.get('/settings/metrics');

// Auth API
export const loginAdmin = (credentials) => api.post('/auth/login', credentials);
export const fetchAdminProfile = () => api.get('/auth/profile');

// File Upload
export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/upload/single', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export default api;
