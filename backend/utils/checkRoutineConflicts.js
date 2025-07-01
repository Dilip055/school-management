import ClassRoutine from '../models/classroutine.model.js';
import CustomError from './customError.js';


function isTimeOverlap(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}


export const checkRoutineConflicts = async ({ classId, teacherId, dayOfWeek, startTime, endTime }) => {
  const teacherConflicts = await ClassRoutine.findAll({
    where: {
      teacherId,
      dayOfWeek,
    },
  });

  for (const routine of teacherConflicts) {
    if (isTimeOverlap(startTime, endTime, routine.startTime, routine.endTime)) {
      throw new CustomError('Teacher has another class scheduled during this time', 400);
    }
  }

  const classConflicts = await ClassRoutine.findAll({
    where: {
      classId,
      dayOfWeek,
    },
  });

  for (const routine of classConflicts) {
    if (isTimeOverlap(startTime, endTime, routine.startTime, routine.endTime)) {
      throw new CustomError('Class already has a subject scheduled during this time', 400);
    }
  }
};

