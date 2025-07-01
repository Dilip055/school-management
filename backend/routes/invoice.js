import express from 'express';
import {
    deleteStudentInvoice,
    generateInvoice,
    getStudentInvoices,
    invoiceAll,
    updateStudentInvoice
} from '../controllers/invoiceController.js';
import {
    authenticate,
    authorizeRoles
} from '../middleware/auth.middleware.js';
import wrapAsync from '../utils/wrapAsync.js';

const router = express.Router();

router.post('/add/:studentId', authenticate, authorizeRoles('admin', 'teacher', 'student'), wrapAsync(generateInvoice));
router.get('/', authenticate, authorizeRoles('admin', 'teacher', 'student'), wrapAsync(invoiceAll));
router.put('/:invoiceId', authenticate, authorizeRoles('admin'), wrapAsync(updateStudentInvoice));
router.get('/:studentId', authenticate, authorizeRoles('admin', 'teacher', 'student'), wrapAsync(getStudentInvoices));
router.delete('/:studentId', authenticate, authorizeRoles('admin', 'teacher', 'student'), wrapAsync(deleteStudentInvoice));
export default router;