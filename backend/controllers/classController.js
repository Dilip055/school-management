import Class from "../models/class.model.js";
import User from "../models/user.model.js";
import CustomError from "../utils/customError.js";

export const createClass = async (req, res) => {
  const { classname, section, roomNumber } = req.body;

  if (!classname || !section) {
    throw new CustomError("Missing required fields", 400);
  }

  const existingClass = await Class.findOne({ where: { classname, section } });
  if (existingClass) {
    throw new CustomError("Class with same section already exist", 400);
  }

  await Class.create({ classname, section, roomNumber });
  return res.status(201).json({ message: "Class created successfully" });
};

export const getAllClasses = async (req, res) => {
  const classes = await Class.findAll();
  if (!classes) {
    throw new CustomError("No classes found", 404);
  }
  return res.status(200).json(classes);
};

export const getClassById = async (req, res) => {
  const { id } = req.params;
  const classObj = await Class.findByPk(id);
  if (!classObj) {
    throw new CustomError("Class not found", 404);
  }
  return res.status(200).json(classObj);
};

export const updateClass = async (req, res) => {
  const { id } = req.params;
  const { classname, section, roomNumber } = req.body;

  if (!classname || !section) {
    throw new CustomError("Missing required fields", 400);
  }

  const classObj = await Class.findByPk(id);
  if (!classObj) {
    throw new CustomError("Class not found", 404);
  }

  await classObj.update({ classname, section, roomNumber });
  return res.status(200).json({
    message: "Class updated successfully",
    classObj,
  });
};

export const assignClassTeacher = async (req, res) => {
  const { classId, teacherId } = req.body;

  if (!classId || !teacherId) {
    throw new CustomError("Missing required fields", 400);
  }

  const existingClass = await Class.findOne({ where: { teacherId } });
  if (existingClass) {
    throw new CustomError("Teacher already assigned to a class", 400);
  }

  const classObj = await Class.findByPk(classId);
  if (!classObj) {
    throw new CustomError("Class not found", 404);
  }

  const teacherObj = await User.findByPk(teacherId);
  if (!teacherObj) {
    throw new CustomError("Teacher not found", 404);
  }

  classObj.teacherId = teacherId;
  await classObj.save();

  res.status(200).json({
    message: "Class teacher assigned successfully",
    class: classObj,
  });
};

export const getTeacherClass = async (req, res) => {
  const teacherId = req.user.id;
  const classTeacher = await Class.findOne({
    where: { teacherId },
    include: {
      model: User,
      as: "students",
      attributes: ["id", "username"],
    },
  });
  res.status(200).json(classTeacher);
};

export const deleteAssignedClassTeacher = async (req, res) => {
  const { classId } = req.body;

  const classObj = await Class.findByPk(classId);
  if (!classObj) {
    throw new CustomError("Class not found", 404);
  }

  classObj.teacherId = null;
  await classObj.save();

  res.status(200).json({ message: "Class teacher deleted successfully" });
};

export const deleteClass = async (req, res) => {
  const { id } = req.params;

  const classObj = await Class.findByPk(id);
  if (!classObj) {
    throw new CustomError("Class not found", 404);
  }

  await classObj.destroy();
  res.status(200).json({ message: "Class deleted successfully" });
};
