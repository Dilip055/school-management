import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
  const Subject = sequelize.define(
    "Subject",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      subjectName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subjectCode: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "subjects",
    },
  )



export default Subject;