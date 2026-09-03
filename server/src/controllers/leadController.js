import mongoose from 'mongoose';
import Lead from '../models/Lead.js';
import { store } from '../utils/store.js';

const isMongoConnected = () => mongoose.connection.readyState === 1;

export const submitLead = async (req, res, next) => {
  try {
    const {
      name,
      email,
      whatsapp,
      country,
      company,
      serviceNeeded,
      budget,
      projectDetails,
      preferredContact,
      fileAttachment
    } = req.body;

    if (!name || !email || !projectDetails) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and project details are required.'
      });
    }

    const leadPayload = {
      name,
      email,
      whatsapp,
      country: country || 'International',
      company,
      serviceNeeded: serviceNeeded || 'Full-Stack Development',
      budget: budget || 'To be discussed',
      projectDetails,
      preferredContact: preferredContact || 'WhatsApp',
      fileAttachment,
      status: 'New',
      internalNotes: []
    };

    if (isMongoConnected()) {
      const lead = await Lead.create(leadPayload);
      return res.status(201).json({
        success: true,
        message: 'Your project inquiry has been received. The FIAUS Tech team will contact you shortly.',
        data: { id: lead._id, createdAt: lead.createdAt }
      });
    }

    const leads = store.getLeads();
    const newLead = {
      _id: 'lead_' + Date.now(),
      ...leadPayload,
      createdAt: new Date().toISOString()
    };
    leads.unshift(newLead);
    store.saveLeads(leads);

    res.status(201).json({
      success: true,
      message: 'Your project inquiry has been received. The FIAUS Tech team will contact you shortly.',
      data: { id: newLead._id, createdAt: newLead.createdAt }
    });
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (req, res, next) => {
  try {
    const { status } = req.query;

    if (isMongoConnected()) {
      const filter = status ? { status } : {};
      const leads = await Lead.find(filter).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: leads.length, data: leads });
    }

    let leads = store.getLeads();
    if (status) {
      leads = leads.filter((l) => l.status === status);
    }
    res.status(200).json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    next(error);
  }
};

export const getLeadById = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      const lead = await Lead.findById(req.params.id);
      if (!lead) return res.status(404).json({ success: false, message: 'Lead inquiry not found.' });
      return res.status(200).json({ success: true, data: lead });
    }

    const leads = store.getLeads();
    const lead = leads.find((l) => l._id === req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead inquiry not found.' });
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

export const updateLeadStatus = async (req, res, next) => {
  try {
    const { status, note } = req.body;

    if (isMongoConnected()) {
      const lead = await Lead.findById(req.params.id);
      if (!lead) return res.status(404).json({ success: false, message: 'Lead inquiry not found.' });
      if (status) lead.status = status;
      if (note) {
        lead.internalNotes.push({
          note,
          author: req.admin?.name || 'Admin',
          createdAt: new Date()
        });
      }
      await lead.save();
      return res.status(200).json({ success: true, data: lead });
    }

    const leads = store.getLeads();
    const lead = leads.find((l) => l._id === req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead inquiry not found.' });
    if (status) lead.status = status;
    if (note) {
      if (!lead.internalNotes) lead.internalNotes = [];
      lead.internalNotes.push({
        note,
        author: req.admin?.name || 'Admin',
        createdAt: new Date().toISOString()
      });
    }
    store.saveLeads(leads);
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      const lead = await Lead.findByIdAndDelete(req.params.id);
      if (!lead) return res.status(404).json({ success: false, message: 'Lead inquiry not found.' });
      return res.status(200).json({ success: true, message: 'Lead inquiry deleted successfully.' });
    }

    let leads = store.getLeads();
    leads = leads.filter((l) => l._id !== req.params.id);
    store.saveLeads(leads);
    res.status(200).json({ success: true, message: 'Lead inquiry deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

