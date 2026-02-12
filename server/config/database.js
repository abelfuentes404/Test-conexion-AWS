const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // Configuración SSL recomendada para AWS RDS
  ssl: process.env.DB_HOST.includes('amazonaws.com') ? {
    rejectUnauthorized: false
  } : false
});

// Verificar conexión
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error conectando a PostgreSQL:', err.stack);
  } else {
    console.log('✅ Conectado exitosamente a PostgreSQL/AWS RDS');
    release();
  }
});

module.exports = pool;