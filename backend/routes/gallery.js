import express from 'express';
import upload from '../middleware/upload.js';
import {
    authenticate,
    authorizeRoles
} from '../middleware/auth.middleware.js';
import wrapAsync from '../utils/wrapAsync.js';
import {
    addGallery,
    deleteGallery,
    getGallery
} from '../controllers/GalleryController.js';



const router = express.Router();



router.post('/', authenticate, authorizeRoles('admin'), upload.array('galleryImgPath', 5), wrapAsync(addGallery));
router.get('/', wrapAsync(getGallery));
router.delete('/:id', authenticate, authorizeRoles('admin'), wrapAsync(deleteGallery));
export default router;