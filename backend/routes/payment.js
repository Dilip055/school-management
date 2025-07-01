import express from 'express';
import {
    applyPayment,
    getInvoicePayments
} from '../controllers/paymentController.js';
import {
    authenticate,
    authorizeRoles
} from '../middleware/auth.middleware.js';
import wrapAsync from '../utils/wrapAsync.js';


const router = express.Router();

router.post('/add/:invoiceId', authenticate, authorizeRoles('admin', 'teacher', 'student'), wrapAsync(applyPayment));
router.get('/:invoiceId', authenticate, authorizeRoles('admin', 'teacher', 'student'), wrapAsync(getInvoicePayments));

export default router;