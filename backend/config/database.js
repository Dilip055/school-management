import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 4000,   // ⭐ TiDB uses port 4000
    dialect: 'mysql',
    logging: true,

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true
      }
    }
  }
);

sequelize.authenticate()
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log("Error in connection", err);
  });

export default sequelize;
