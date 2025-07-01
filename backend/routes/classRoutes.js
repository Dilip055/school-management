import express from 'express';
import {
    createClass,
    assignClassTeacher,
    getAllClasses,
    getClassById,
    updateClass,
    deleteClass,
    getTeacherClass
} from '../controllers/classController.js';
import {
    authenticate,
    authorizeRoles
} from '../middleware/auth.middleware.js';
import wrapAsync from '../utils/wrapAsync.js';
const router = express.Router();
router.get('/teacherclass', authenticate, authorizeRoles("teacher"), wrapAsync(getTeacherClass));
router.post('/', authenticate, authorizeRoles("admin", "teacher"), wrapAsync(createClass));
router.get('/', authenticate, authorizeRoles("admin", "teacher", "student"), wrapAsync(getAllClasses));
router.get('/:id', authenticate, authorizeRoles("admin"), wrapAsync(getClassById));
router.patch('/:id', authenticate, authorizeRoles("admin"), wrapAsync(updateClass));
router.post('/assign-teacher', authenticate, authorizeRoles("admin"), wrapAsync(assignClassTeacher));
router.delete('/:id', authenticate, authorizeRoles("admin"), wrapAsync(deleteClass));
router.delete('/assign-teacher', authenticate, authorizeRoles("admin"), wrapAsync(assignClassTeacher));
export default router;