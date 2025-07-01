import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
  const ClassRoutine = sequelize.define(
    "ClassRoutine",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      classId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      subjectId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      teacherId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
     
      dayOfWeek: {
        type: DataTypes.ENUM("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"),
        allowNull: true,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      roomNumber: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
      tableName: "classroutines",
    },
  )

export default ClassRoutine;