import express from "express";
import {
  markBulkAttendance,
  getAllAttendance,

} from "../controllers/attendanceController.js";
import { authenticate, authorizeRoles } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post(
  "/bulk",
  authenticate,
  authorizeRoles("teacher"),
  markBulkAttendance
);
router.get(
  "/",
  authenticate,
  authorizeRoles("teacher", "admin", "student"),
  getAllAttendance
);

export default router;
