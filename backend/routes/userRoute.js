import express from 'express';
import {
    createUserWithRole,
    deleteUser,
    getAllUsers,
    getUserById,
    updatePassword,
    updateUser
} from '../controllers/userController.js';
import {
    authenticate,
    authorizeRoles
} from '../middleware/auth.middleware.js';


import wrapAsync from '../utils/wrapAsync.js';
import upload from '../middleware/upload.js';

const router = express.Router();



router.post('/', authenticate, authorizeRoles("admin"), upload.single('profilePicture'), wrapAsync(createUserWithRole));
router.post('/updatePassword', authenticate, authorizeRoles("student", "teacher", "admin"), wrapAsync(updatePassword));
router.get('/', authenticate, authorizeRoles("admin", "teacher", "student"), wrapAsync(getAllUsers));
router.get('/:id', authenticate, authorizeRoles("admin"), wrapAsync(getUserById));
router.patch('/:id', authenticate, upload.single('profilePicture'), authorizeRoles("admin"), wrapAsync(updateUser));
router.delete('/:id', authenticate, authorizeRoles("admin"), wrapAsync(deleteUser));

export default router;