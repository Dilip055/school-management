import express from 'express';
import {
  addFeeStructure,
  deleteFeeStructure,
  fetchFeeStruct,
} from '../controllers/feeStructureController.js';
import { authenticate, authorizeRoles } from '../middleware/auth.middleware.js';
import wrapAsync from '../utils/wrapAsync.js';


const router = express.Router();


router.post('/', authenticate, authorizeRoles('admin'), wrapAsync(addFeeStructure));
router.get('/', authenticate, authorizeRoles('admin'), wrapAsync(fetchFeeStruct))
router.delete('/:id',authenticate, authorizeRoles('admin'), wrapAsync(deleteFeeStructure));

export default router;
