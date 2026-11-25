
import Sequelize from 'sequelize';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config();

// Get the correct directory path in Windows
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to CA certificate
const caPath = path.join(__dirname, 'isrgrootx1.pem');

// Read the certificate
const caCertificate = fs.readFileSync(caPath);

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
        ca: caCertificate,
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
