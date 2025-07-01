import Gallery from "../models/gallery.model.js";
import CustomError from "../utils/customError.js";

export const addGallery = async (req, res) => {
  const { imgcategory } = req.body;
  const imgPaths = req.files.map(file => file.path);

  if (!imgcategory || imgPaths.length === 0) {
    throw new CustomError('Missing required fields', 400);
  }

  await Promise.all(
    imgPaths.map((path) =>
      Gallery.create({
        imgcategory,
        galleryImgPath: path,
      })
    )
  );

  res.status(201).json({ message: 'Gallery images added successfully' });
};

export const getGallery = async (req, res) => {
  const gallery = await Gallery.findAll();

  if (!gallery || gallery.length === 0) {
    throw new CustomError('Gallery not found', 404);
  }

  res.status(200).json(gallery);
};

export const deleteGallery = async (req, res) => {
  const { id } = req.params;

  const gallery = await Gallery.findByPk(id);
  if (!gallery) {
    throw new CustomError('Gallery not found', 404);
  }

  await gallery.destroy();

  res.status(200).json({ message: 'Gallery deleted successfully' });
};
