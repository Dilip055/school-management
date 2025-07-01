import { DataTypes, ENUM } from 'sequelize';
import sequelize from '../config/database.js';
  const Gallery = sequelize.define('Gallery', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    imgcategory:{
         type: DataTypes.STRING,
        allowNull: false
    },
    galleryImgPath:{
         type: DataTypes.STRING,
        allowNull: false
    }
    
  }, {
    timestamps: true,
    tableName: 'Gallery',
  });


  export default Gallery