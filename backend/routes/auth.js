import express from "express";
import { getCurrentUser, login } from "../controllers/authController.js";
import wrapAsync from '../utils/wrapAsync.js'; 
const router = express.Router(); 


router.post('/login',wrapAsync(login)); 
router.get('/me', wrapAsync(getCurrentUser)); 


export default router;
