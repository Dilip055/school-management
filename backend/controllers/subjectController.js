import Subject from "../models/subject.model.js";
import CustomError from "../utils/customError.js";

export const createSubject = async (req, res) => {
  const { subjectName, subjectCode, description } = req.body;

  const existing = await Subject.findOne({ where: { subjectCode } });
  if (existing) {
    throw new CustomError("Subject already exists", 400);
  }

  const subject = await Subject.create({
    subjectName,
    subjectCode,
    description,
  });

  res.status(201).json({
    message: "Subject created successfully",
    subject,
  });
};

export const getAllSubjects = async (req, res) => {
  const subjects = await Subject.findAll();

  if (!subjects || subjects.length === 0) {
    throw new CustomError("No subjects found", 404);
  }

  res.status(200).json(subjects);
};

export const deleteSubject = async (req, res) => {
  const { id } = req.params;

  const subject = await Subject.findByPk(id);
  if (!subject) {
    throw new CustomError("Subject not found", 404);
  }

  await subject.destroy();

  res.status(200).json({ message: "Subject deleted successfully" });
};
