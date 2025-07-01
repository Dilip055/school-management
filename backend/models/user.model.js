import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import StudentParent from './StudentParent.model.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  profilePicture: {
    type: DataTypes.STRING
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  motherName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('student', 'teacher','admin', 'parent'),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },

  // Student-specific fields
  admissionNumber: {
    type: DataTypes.STRING,
    unique: true,
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
  },
  bloodGroup: {
    type: DataTypes.STRING,
  },
  classId: {
    type: DataTypes.UUID,
    allowNull: true,
  },

  // Teacher-specific fields
  qualification: {
    type: DataTypes.STRING,
  },
  subjectsTaught: {
    type: DataTypes.STRING,
  },
  joiningDate: {
    type: DataTypes.DATEONLY,
  },
  salary: {
    type: DataTypes.FLOAT,
  },

  // Parent-specific fields
  occupation: {
    type: DataTypes.STRING,
  },
  relationType: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'users',
  timestamps: true,
});


export default User;