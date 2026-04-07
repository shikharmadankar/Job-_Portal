import express from "express";
import authenticateToken from "../middleware/isAuthenticated.js";
import {
  scheduleMeeting,
  getRecruiterMeetings,
  getStudentMeetings,
} from "../controllers/meeting.controller.js";

const router = express.Router();

router.route("/schedule").post(authenticateToken, scheduleMeeting);
router.route("/recruiter").get(authenticateToken, getRecruiterMeetings);
router.route("/student").get(authenticateToken, getStudentMeetings);

export default router;
