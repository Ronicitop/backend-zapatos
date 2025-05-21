const pool = require('../../../config/db');

// Registrar un nuevo pedido
const createPedido = async (pedido) => {
  const {
    nombre_cliente,
    telf_cliente,
    costo,
    latitud,
    longitud,
    cod_productos,
    id_estado
  } = pedido;

  const res = await pool.query(
    `INSERT INTO Pedido (
      nombre_cliente, telf_cliente, costo, latitud, longitud, cod_productos, id_estado
    ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [nombre_cliente, telf_cliente, costo, latitud, longitud, cod_productos, id_estado]
  );
  
  return res.rows[0];
};

const getPedidosAsignadosPorUsuario = async (id_usuario) => {
  const res = await pool.query(`
    SELECT p.*, e.estado, u.nombre AS distribuidor, v.placa AS vehiculo
    FROM Pedido p
    JOIN EstadoPedido e ON p.id_estado = e.id
    LEFT JOIN Usuario u ON p.id_usuario = u.id
    LEFT JOIN Vehiculo v ON p.id_vehiculo = v.id
    WHERE p.id_usuario = $1
  `, [id_usuario]);

  return res.rows;
};

const updateEstadoPedido = async (id_pedido, id_estado) => {
  const res = await pool.query(
    'UPDATE Pedido SET id_estado = $1 WHERE id = $2 RETURNING *',
    [id_estado, id_pedido]
  );
  return res.rows[0];
};

const getHistorialEntregasPorDistribuidor = async (id_usuario) => {
  const res = await pool.query(`
    SELECT p.*, e.estado AS nombre_estado, v.placa
    FROM Pedido p
    JOIN EstadoPedido e ON p.id_estado = e.id
    LEFT JOIN Vehiculo v ON p.id_vehiculo = v.id
    WHERE p.id_usuario = $1 AND e.estado = 'entregado'
    ORDER BY p.id DESC
  `, [id_usuario]);

  return res.rows;
};

const registrarUbicacionYHoraEntrega = async ({ id_pedido, latitud, longitud }) => {
  const res = await pool.query(
    `UPDATE Pedido
     SET latitud_entrega = $1,
         longitud_entrega = $2,
         fecha_entrega = CURRENT_TIMESTAMP
     WHERE id = $3
     RETURNING *`,
    [latitud, longitud, id_pedido]
  );
  return res.rows[0];
};


module.exports = {
  createPedido,
  getPedidosAsignadosPorUsuario,
  updateEstadoPedido,
  getHistorialEntregasPorDistribuidor,
  registrarUbicacionYHoraEntrega
};
