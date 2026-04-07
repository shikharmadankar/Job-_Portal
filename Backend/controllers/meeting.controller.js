import { Meeting } from "../models/meeting.model.js";

export const scheduleMeeting = async (req, res) => {
  try {
    const recruiterId = req.id;
    const { applicantId, jobId, title, description, scheduledDate } = req.body;

    if (!applicantId || !jobId || !title || !scheduledDate) {
      return res.status(400).json({
        message: "applicantId, jobId, title, and scheduledDate are required",
        success: false,
      });
    }

    const meeting = await Meeting.create({
      recruiter: recruiterId,
      applicant: applicantId,
      job: jobId,
      title,
      description: description || "",
      scheduledDate: new Date(scheduledDate),
    });

    return res.status(201).json({
      message: "Meeting scheduled successfully",
      meeting,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const getRecruiterMeetings = async (req, res) => {
  try {
    const recruiterId = req.id;
    const meetings = await Meeting.find({ recruiter: recruiterId })
      .sort({ scheduledDate: 1 })
      .populate({ path: "applicant", select: "fullname email" })
      .populate({ path: "job", select: "title" });

    return res.status(200).json({ meetings, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const getStudentMeetings = async (req, res) => {
  try {
    const studentId = req.id;
    const meetings = await Meeting.find({ applicant: studentId })
      .sort({ scheduledDate: 1 })
      .populate({ path: "recruiter", select: "fullname email" })
      .populate({ path: "job", select: "title", populate: { path: "company", select: "name" } });

    return res.status(200).json({ meetings, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
