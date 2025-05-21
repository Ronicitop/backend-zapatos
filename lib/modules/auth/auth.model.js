const pool = require('../../../config/db');
const bcrypt = require('bcryptjs');

const buscarPorEmail = async (email) => {
  const res = await pool.query('SELECT * FROM Usuario WHERE email = $1', [email]);
  return res.rows[0];
};

const verificarPassword = async (passwordPlano, passwordHash) => {
  return bcrypt.compare(passwordPlano, passwordHash);
};

const registrarUsuario = async ({ nombre, email, password, rol }) => {
  const passwordHasheado = await bcrypt.hash(password, 10);
  const res = await pool.query(
    `INSERT INTO Usuario (nombre, email, password, rol)
     VALUES ($1, $2, $3, $4)
     RETURNING id, nombre, email, rol`,
    [nombre, email, passwordHasheado, rol]
  );
  return res.rows[0];
};

const actualizarPassword = async ({ email, nuevaPassword }) => {
  const hash = await bcrypt.hash(nuevaPassword, 10);
  const res = await pool.query(
    `UPDATE Usuario SET password = $1 WHERE email = $2 RETURNING id, email`,
    [hash, email]
  );
  return res.rows[0];
};

module.exports = {
  buscarPorEmail,
  verificarPassword,
  registrarUsuario,
   actualizarPassword
};

