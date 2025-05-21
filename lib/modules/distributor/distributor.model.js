const pool = require('../../../config/db');

// Obtener todos los distribuidores
const getAllDistributors = async () => {
  const res = await pool.query("SELECT * FROM Usuario WHERE rol = 'distribuidor'");
  return res.rows;
};

// Crear un nuevo distribuidor
const createDistributor = async (user) => {
  const { nombre, email, password } = user;
  const res = await pool.query(
    "INSERT INTO Usuario (nombre, rol, email, password) VALUES ($1, 'distribuidor', $2, $3) RETURNING *",
    [nombre, email, password]
  );
  return res.rows[0];
};

module.exports = {
  getAllDistributors,
  createDistributor,
};
