import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// __dirname equivalent for ES Modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Build the absolute path to the CA file
const caPath = path.join(__dirname, 'tidb-ca.pem');  // Assuming CA is in the same folder as this file

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
        ca: fs.readFileSync(caPath),
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
