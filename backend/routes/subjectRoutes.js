import express from 'express';
import {
    createSubject,
    deleteSubject,
    getAllSubjects
} from '../controllers/subjectController.js';
import {
    authenticate,
    authorizeRoles
} from '../middleware/auth.middleware.js';
import wrapAsync from '../utils/wrapAsync.js';


const router = express.Router();


router.post('/', authenticate, authorizeRoles("admin", ), wrapAsync(createSubject));
router.delete('/:id', authenticate, authorizeRoles("admin"), wrapAsync(deleteSubject));
router.get('/', authenticate, authorizeRoles("admin", "teacher"), wrapAsync(getAllSubjects));

export default router;