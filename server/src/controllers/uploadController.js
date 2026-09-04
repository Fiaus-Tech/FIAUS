import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

export const uploadSingleFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }

  try {
    // Dedicated folder inside existing Cloudinary environment
    const folderType = req.body.folder || 'team';
    const cloudinaryFolder = `FIAUS/${folderType}`;

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: cloudinaryFolder,
      resource_type: 'auto',
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ]
    });

    // Clean up local temp file after successful upload
    if (fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.error('Error removing temp file:', err);
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: uploadResult.bytes || req.file.size,
        mimetype: req.file.mimetype,
        format: uploadResult.format,
        folder: cloudinaryFolder
      }
    });
  } catch (error) {
    console.error('Cloudinary upload error, using local fallback:', error.message);
    const fileUrl = `/uploads/${req.file.filename}`;
    return res.status(200).json({
      success: true,
      data: {
        url: fileUrl,
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        fallback: true
      }
    });
  }
};

export const uploadMultipleFiles = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: 'No files uploaded.' });
  }

  try {
    const folderType = req.body.folder || 'team';
    const cloudinaryFolder = `FIAUS/${folderType}`;

    const uploads = await Promise.all(
      req.files.map(async (file) => {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: cloudinaryFolder,
            resource_type: 'auto'
          });
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
          return {
            url: result.secure_url,
            public_id: result.public_id,
            filename: file.filename,
            originalname: file.originalname,
            size: result.bytes || file.size,
            mimetype: file.mimetype
          };
        } catch (e) {
          return {
            url: `/uploads/${file.filename}`,
            filename: file.filename,
            originalname: file.originalname,
            size: file.size,
            mimetype: file.mimetype
          };
        }
      })
    );

    return res.status(200).json({
      success: true,
      data: uploads
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to upload files',
      error: error.message
    });
  }
};
