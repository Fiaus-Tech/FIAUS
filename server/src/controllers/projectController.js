import mongoose from 'mongoose';
import Project from '../models/Project.js';
import { store } from '../utils/store.js';

const isMongoConnected = () => mongoose.connection.readyState === 1;

export const getProjects = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      const filter = req.query.all === 'true' ? {} : { status: 'published' };
      const projects = await Project.find(filter).sort({ displayOrder: 1, createdAt: -1 });
      return res.status(200).json({ success: true, count: projects.length, data: projects });
    }

    let projects = store.getProjects();
    if (req.query.all !== 'true') {
      projects = projects.filter((p) => p.status === 'published');
    }
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
};

export const getProjectBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug.toLowerCase();
    if (isMongoConnected()) {
      const project = await Project.findOne({ slug });
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project case study not found.' });
      }
      return res.status(200).json({ success: true, data: project });
    }

    const projects = store.getProjects();
    const project = projects.find((p) => p.slug.toLowerCase() === slug);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project case study not found.' });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      const highestOrderProject = await Project.findOne().sort({ displayOrder: -1 });
      const nextOrder = highestOrderProject ? highestOrderProject.displayOrder + 1 : 1;
      const projectData = {
        ...req.body,
        displayOrder: req.body.displayOrder !== undefined ? req.body.displayOrder : nextOrder
      };
      const project = await Project.create(projectData);
      return res.status(201).json({ success: true, data: project });
    }

    const projects = store.getProjects();
    const newProject = {
      _id: 'proj_' + Date.now(),
      ...req.body,
      displayOrder: req.body.displayOrder || projects.length + 1,
      createdAt: new Date().toISOString()
    };
    projects.push(newProject);
    store.saveProjects(projects);
    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
      return res.status(200).json({ success: true, data: project });
    }

    const projects = store.getProjects();
    const index = projects.findIndex((p) => p._id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Project not found.' });
    projects[index] = { ...projects[index], ...req.body, updatedAt: new Date().toISOString() };
    store.saveProjects(projects);
    res.status(200).json({ success: true, data: projects[index] });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      const project = await Project.findByIdAndDelete(req.params.id);
      if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
      return res.status(200).json({ success: true, message: 'Project successfully deleted.' });
    }

    let projects = store.getProjects();
    projects = projects.filter((p) => p._id !== req.params.id);
    store.saveProjects(projects);
    res.status(200).json({ success: true, message: 'Project successfully deleted.' });
  } catch (error) {
    next(error);
  }
};

export const reorderProjects = async (req, res, next) => {
  try {
    const { orderedIds } = req.body;
    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({ success: false, message: 'orderedIds must be an array of project IDs.' });
    }

    if (isMongoConnected()) {
      const updatePromises = orderedIds.map((id, index) =>
        Project.findByIdAndUpdate(id, { displayOrder: index + 1 })
      );
      await Promise.all(updatePromises);
      const updatedProjects = await Project.find().sort({ displayOrder: 1 });
      return res.status(200).json({ success: true, message: 'Projects reordered successfully.', data: updatedProjects });
    }

    let projects = store.getProjects();
    orderedIds.forEach((id, idx) => {
      const found = projects.find((p) => p._id === id);
      if (found) found.displayOrder = idx + 1;
    });
    projects.sort((a, b) => a.displayOrder - b.displayOrder);
    store.saveProjects(projects);
    res.status(200).json({ success: true, message: 'Projects reordered successfully.', data: projects });
  } catch (error) {
    next(error);
  }
};

