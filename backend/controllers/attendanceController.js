import { Op } from "sequelize";
import Attendance from "../models/attendence.model.js";
import Class from "../models/class.model.js";
import User from "../models/user.model.js";
import CustomError from "../utils/customError.js";

export const markBulkAttendance = async (req, res) => {
  const { classId, date, attendanceRecords } = req.body;
  const markedBy = req.user.id;

  const existingRecords = await Attendance.findAll({
    where: {
      classId,
      date,
      studentId: attendanceRecords.map((r) => r.studentId),
    },
  });

  const existingIds = new Set(existingRecords.map((r) => r.studentId));

  const newRecords = attendanceRecords
    .filter((r) => !existingIds.has(r.studentId))
    .map((r) => ({
      ...r,
      classId,
      date,
      markedBy,
    }));

  const inserted = await Attendance.bulkCreate(newRecords);

  const response = {
    existing: existingRecords,
    inserted,
  };

  if (existingRecords.length && inserted.length === 0) {
    throw new CustomError("Attendance already exists for all selected students on this date.",200);
  }

  if (existingRecords.length && inserted.length) {
    throw new CustomError("Some records already existed.", 200);
  }

  return res.status(201).json({
    message: "Attendance marked successfully.",
    ...response,
  });
};

export const getAllAttendance = async (req, res) => {
  const attendanceList = await Attendance.findAll({
    include: [
      {
        model: User,
        as: "student",
        attributes: ["id", "username"],
      },
      {
        model: User,
        as: "marker",
        attributes: ["id", "username"],
      },
      {
        model: Class,
        as: "class",
        attributes: ["id", "classname"],
      },
    ],
  });

  res.status(200).json(attendanceList);
};
