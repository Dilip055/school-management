import express from 'express';
import {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent
} from '../controllers/eventController.js'
import {
    authenticate,
    authorizeRoles
} from '../middleware/auth.middleware.js';
import wrapAsync from '../utils/wrapAsync.js';



const router = express.Router();



router.post('/', authenticate, authorizeRoles('admin'), wrapAsync(createEvent));
router.get('/', authenticate, authorizeRoles('admin', 'teacher', 'student'), wrapAsync(getAllEvents));
router.put('/:id', authenticate, authorizeRoles('admin'), wrapAsync(updateEvent));
router.delete('/:id', authenticate, authorizeRoles('admin'), wrapAsync(deleteEvent));
export default router;