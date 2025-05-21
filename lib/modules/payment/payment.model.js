const pool = require('../../../config/db');

// Registrar modalidad de pago
const registrarPago = async ({ id_pedido, modalidad, monto }) => {
  const res = await pool.query(
    `INSERT INTO Pago (id_pedido, modalidad, monto)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [id_pedido, modalidad, monto]
  );
  return res.rows[0];
};

// Confirmar pago (actualizar estado a confirmado)
const confirmarPago = async (id_pago) => {
  const res = await pool.query(
    `UPDATE Pago SET estado = 'confirmado' WHERE id = $1 RETURNING *`,
    [id_pago]
  );
  return res.rows[0];
};

module.exports = {
  registrarPago,
  confirmarPago,
};
