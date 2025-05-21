const pool = require('../../../config/db');

// Asignar un pedido a un distribuidor con vehículo
const assignPedido = async ({ id_pedido, id_usuario, id_vehiculo }) => {
  const res = await pool.query(
    `UPDATE Pedido 
     SET id_usuario = $1, id_vehiculo = $2, id_estado = 2  -- 2 = asignado
     WHERE id = $3 
     RETURNING *`,
    [id_usuario, id_vehiculo, id_pedido]
  );
  return res.rows[0];
};

module.exports = {
  assignPedido,
};
