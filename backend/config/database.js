import Sequelize from 'sequelize';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(process.env.DB_CA_PATH),  // Load CA certificate
        rejectUnauthorized: true
      }
    },
    logging: console.log
  }
);

sequelize.authenticate()
  .then(() => console.log('Connected to TiDB!'))
  .catch(err => console.error('TiDB connection error:', err));

export default sequelize;