const pool = require('../../../config/db');
const model = require('./vehicle.model');
// Obtener todos los vehículos con su estado
const getAllVehicles = async () => {
  const res = await pool.query(`
    SELECT 
      v.id,
      v.placa,
      v.modelo,
      ev.estado AS estado_vehiculo,
      u.nombre AS distribuidor
    FROM Vehiculo v
    JOIN EstadoVehiculo ev ON v.id_estado = ev.id
    LEFT JOIN Usuario u ON v.id_usuario = u.id
  `);
  return res.rows;
};

// Crear un nuevo vehículo
const createVehicle = async (vehiculo) => {
  const { placa, modelo, id_estado } = vehiculo;
  const res = await pool.query(
    "INSERT INTO Vehiculo (placa, modelo, id_estado) VALUES ($1, $2, $3) RETURNING *",
    [placa, modelo, id_estado]
  );
  return res.rows[0];

// Asignar un distribuidor a un vehículo
};const assignVehicleToDistributor = async (id_vehiculo, id_usuario) => {
  const res = await pool.query(
    "UPDATE Vehiculo SET id_usuario = $1 WHERE id = $2 RETURNING *",
    [id_usuario, id_vehiculo]
  );
  return res.rows[0];
};

exports.assignVehicle = async (req, res) => {
  try {
    const { id_vehiculo, id_usuario } = req.body;
    const actualizado = await model.assignVehicleToDistributor(id_vehiculo, id_usuario);
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al asignar vehículo' });
  }
};
module.exports = {
  getAllVehicles,
  createVehicle,
  assignVehicleToDistributor,
};

