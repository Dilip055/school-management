import { checkRoutineConflicts } from '../utils/checkRoutineConflicts.js';
import CustomError from '../utils/customError.js';
import Classes from '../models/class.model.js';
import ClassRoutine from '../models/classroutine.model.js';
import User from '../models/user.model.js';
import Subject from '../models/subject.model.js';
import Class from '../models/class.model.js';



export const createClassRoutine = async (req, res) => {
  const { classId, subjectId, teacherId, dayOfWeek, startTime, endTime } = req.body;

  if (!classId || !subjectId || !teacherId || !dayOfWeek || !startTime || !endTime) {
    throw new CustomError('Missing required fields', 400);
  }

  if (startTime >= endTime) {
    throw new CustomError('Start time must be before end time', 400);
  }

  const classRoom = await Classes.findByPk(classId);
  if (!classRoom) {
    throw new CustomError('Class not found', 404);
  }


  await checkRoutineConflicts({ classId, teacherId, dayOfWeek, startTime, endTime });

  const existingRoutine = await ClassRoutine.findOne({
    where: { classId, dayOfWeek, startTime, endTime },
  });

  if (existingRoutine) {
    throw new CustomError('Class routine already exists for this class, day and time', 400);
  }

  await ClassRoutine.create({
    classId,
    subjectId,
    teacherId,
    dayOfWeek,
    startTime,
    endTime,
    roomNumber: classRoom.roomNumber,
  });

  res.status(201).json({ message: 'Class routine created successfully' });
};




export const deleteClassRoutine = async (req, res) => {
  const { id } = req.params;

  const routine = await ClassRoutine.findByPk(id);
  if (!routine) {
    throw new CustomError('Class routine not found', 404);
  }

  await routine.destroy();
  res.status(200).json({ message: 'Class routine deleted successfully' });
};

export const getAllClassRoutines = async (req, res) => {
  const routines = await ClassRoutine.findAll({
    include: [
      {
        model: User,
        as: 'teacher',
        attributes: ['id', 'username'],
      },
      {
        model: Class,
        as: 'class',
        attributes: ['id', 'classname'],
      },
      {
        model: Subject,
        as: 'subject',
        attributes: ['id', 'subjectName'],
      },
    ],
  });

  res.status(200).json(routines);
};
