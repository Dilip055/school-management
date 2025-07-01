import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const StudentParent = sequelize.define('StudentParent', {
  studentId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  parentId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: 'student_parents',
  timestamps: false,
});

export default StudentParent;
