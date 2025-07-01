import express from 'express';
import {
    createClassRoutine,
    getAllClassRoutines,
    deleteClassRoutine
} from '../controllers/classRoutineController.js';
import {
    authenticate,
    authorizeRoles
} from '../middleware/auth.middleware.js';
import wrapAsync from '../utils/wrapAsync.js';
const router = express.Router();
router.post('/', authenticate, authorizeRoles("admin"), wrapAsync(createClassRoutine));
router.get('/', authenticate, authorizeRoles("admin", "teacher", "student"), wrapAsync(getAllClassRoutines));
router.delete('/:id', authenticate, authorizeRoles("admin"), wrapAsync(deleteClassRoutine));
export default router;