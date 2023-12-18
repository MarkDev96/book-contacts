import mysql from 'mysql2/promise';
import logger from './Helpers/logger';
import { ENV } from "./server";

logger.info("Connecting to database");
const pool = mysql.createPool({
  host: ENV.DB_HOST_DEV,
  user: ENV.DB_USERNAME_DEV,
  password: ENV.DB_PASSWORD_DEV,
  database: 'book-contacts',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
