import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
  const Class = sequelize.define(
    'Class',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      classname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      section: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roomNumber: {
        type: DataTypes.STRING,
      },
      teacherId: {
        type: DataTypes.UUID,
       
      },
    },
    {
      timestamps: true,
      tableName: 'classes',
    }
  );



export default Class;
