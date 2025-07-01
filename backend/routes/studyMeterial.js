import express from 'express';
const router = express.Router();
import {
    createStudyMaterial,
    deleteStudyMaterialById,
    getStudentClassStudyMaterial,
    getStudyMaterials
} from '../controllers/studyMeterialController.js';
import upload from '../middleware/upload.js';
import {
    authenticate,
    authorizeRoles
} from '../middleware/auth.middleware.js';
import wrapAsync from '../utils/wrapAsync.js';



router.post('/', authenticate, authorizeRoles("teacher"), upload.single('filePath'), wrapAsync(createStudyMaterial));
router.delete('/:id', authenticate, authorizeRoles("teacher"), wrapAsync(deleteStudyMaterialById));
router.get('/', authenticate, authorizeRoles("student", "teacher", "admin"), wrapAsync(getStudyMaterials));
router.get('/student', authenticate, authorizeRoles("student"), wrapAsync(getStudentClassStudyMaterial))



export default router;