import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
  const FeesStructure = sequelize.define(
    'FeesStructure',
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
      feeType: { 
        type: DataTypes.ENUM("Tuition Fee", "Exam Fee", "Transport Fee"),
        allowNull: false, 
        defaultValue: 'Tuition Fee' 
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: 'feesStructures',
    }
  );

  

export default FeesStructure;
