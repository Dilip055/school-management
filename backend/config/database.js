import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS !== undefined ? process.env.DB_PASS : '',  // <-- empty string if undefined
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 4000,
    dialect: 'mysql',
    dialectOptions: {
      ssl: { rejectUnauthorized: true }  // if TiDB requires TLS
    },
    logging: console.log
  }
);

sequelize.authenticate()
  .then(() => console.log('Connected to TiDB!'))
  .catch(err => console.error('TiDB connection error:', err.message));



export default sequelize;