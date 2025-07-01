import sequelize from '../config/database.js';
import Attendance from './attendence.model.js';
import Class from './class.model.js';
import ClassRoutine from './classroutine.model.js';
import Event from './event.model.js';
import FeesStructure from './feeStructure.model.js';
import Invoice from './invoice.model.js';
import Payment from './payment.model.js';
import StudyMaterial from './studymeterial.model.js';
import Subject from './subject.model.js';
import User from './user.model.js';
import StudentParent from './StudentParent.model.js';

const models = {
  sequelize,
  Attendance,
  Class,
  ClassRoutine,
  Event,
  FeesStructure,
  Invoice,
  Payment,
  StudyMaterial,
  Subject,
  User,
};

const associateModels = () => {
 
  models.Attendance.belongsTo(User, { as: 'student', foreignKey: 'studentId' });
  models.Attendance.belongsTo(User, { as: 'marker', foreignKey: 'markedBy' });
  models.Attendance.belongsTo(Class, { as: 'class', foreignKey: 'classId' });
  models.User.hasMany(Attendance, { foreignKey: 'studentId', as: 'attendances' });
  models.User.hasMany(Attendance, { foreignKey: 'markedBy', as: 'markedAttendances' });
  models.Class.hasMany(Attendance, { foreignKey: 'classId', as: 'attendances' });
  models.Class.belongsTo(models.User, { foreignKey: 'teacherId', as: 'classTeacher' });
  models.Class.hasMany(models.User, { foreignKey: 'classId', as: 'students' });
  models.Class.hasMany(models.ClassRoutine, { foreignKey: 'classId', as: 'routines' });
  models.Class.hasOne(models.FeesStructure, { foreignKey: 'classId' });
  models.FeesStructure.belongsTo(models.Class, { foreignKey: 'classId' });
  models.User.hasMany(models.Invoice, { foreignKey: 'studentId',as: 'invoices', onDelete: 'CASCADE', hooks: true });
  models.Invoice.belongsTo(models.User, { foreignKey: 'studentId', as:'student' });
  models.Invoice.hasMany(models.Payment, { foreignKey: 'invoiceId', onDelete: 'CASCADE', hooks: true });
  models.Payment.belongsTo(models.Invoice, { foreignKey: 'invoiceId' });
  models.StudyMaterial.belongsTo(models.Class, { foreignKey: 'classId', as: 'class' });
  models.Class.hasMany(models.StudyMaterial, { foreignKey: 'classId', as: 'studyMaterials' });
  models.StudyMaterial.belongsTo(models.Subject, { foreignKey: 'subjectId', as: 'subject' });
  models.StudyMaterial.belongsTo(models.User, { foreignKey: 'teacherId', as: 'teacher' });
  models.User.hasMany(models.Event, { foreignKey: 'createdBy', as: 'createdEvents' });
  models.ClassRoutine.belongsTo(models.User, { foreignKey: 'teacherId', as: 'teacher' });
  models.ClassRoutine.belongsTo(models.Subject, { foreignKey: 'subjectId', as: 'subject' });
  models.ClassRoutine.belongsTo(models.Class, { foreignKey: 'classId', as: 'class' });
  models.User.belongsToMany(models.User, {as: 'Parents', through: StudentParent, foreignKey: 'studentId', otherKey: 'parentId',onDelete: 'CASCADE',});
  models.User.belongsToMany(models.User, {as: 'Students',through: StudentParent,foreignKey: 'parentId', otherKey: 'studentId',});
  models.Event.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' });
  
  
};

export { models, associateModels };
