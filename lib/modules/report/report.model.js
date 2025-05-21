const pool = require('../../../config/db');

// Total de pedidos entregados por fecha
const getPedidosPorFecha = async () => {
  const res = await pool.query(`
    SELECT DATE(fecha_entrega) AS fecha, COUNT(*) AS total
    FROM Pedido
    WHERE id_estado = 4  -- estado entregado
    GROUP BY DATE(fecha_entrega)
    ORDER BY fecha DESC
  `);
  return res.rows;
};

// Total de pagos confirmados por día
const getPagosConfirmadosPorFecha = async () => {
  const res = await pool.query(`
    SELECT DATE(fecha) AS fecha, SUM(monto) AS total
    FROM Pago
    WHERE estado = 'confirmado'
    GROUP BY DATE(fecha)
    ORDER BY fecha DESC
  `);
  return res.rows;
};

// Pedidos entregados por distribuidor
const getPedidosPorDistribuidor = async () => {
  const res = await pool.query(`
    SELECT u.nombre AS distribuidor, COUNT(p.id) AS total
    FROM Pedido p
    JOIN Usuario u ON p.id_usuario = u.id
    WHERE p.id_estado = 4
    GROUP BY u.nombre
    ORDER BY total DESC
  `);
  return res.rows;
};

// Totales generales
const getResumenGeneral = async () => {
  const res = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM Pedido) AS total_pedidos,
      (SELECT COUNT(*) FROM Pedido WHERE id_estado = 4) AS entregados,
      (SELECT COUNT(*) FROM Usuario WHERE rol = 'distribuidor') AS distribuidores,
      (SELECT SUM(monto) FROM Pago WHERE estado = 'confirmado') AS total_pagado
  `);
  return res.rows[0];
};

module.exports = {
  getPedidosPorFecha,
  getPagosConfirmadosPorFecha,
  getPedidosPorDistribuidor,
  getResumenGeneral,
};
