const axios = require('axios');
const pool = require('../../../config/db');
const getRutaOptima = async (origen, destino) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
    params: {
      origin: origen,
      destination: destino,
      key: apiKey
    }
  });

  return response.data;
};

const getRutaFalsa = async (id_pedido) => {
  return {
    pedido_id: id_pedido,
    origen: "-17.78,-63.17",
    destino: "-17.79,-63.15",
    distancia: "1.2 km",
    duracion: "10 mins",
    pasos: [
      "Salir del almacén",
      "Girar a la derecha en calle 1",
      "Seguir recto por calle 2",
      "Entregar al cliente"
    ]
  };
};

const getRutaSimuladaPorPedido = async (id_pedido) => {
  // Buscar el pedido en la base de datos
  const res = await pool.query(`
    SELECT p.id, p.latitud, p.longitud, u.nombre AS distribuidor
    FROM Pedido p
    LEFT JOIN Usuario u ON p.id_usuario = u.id
    WHERE p.id = $1
  `, [id_pedido]);

  if (res.rows.length === 0) {
    throw new Error('Pedido no encontrado');
  }

  const pedido = res.rows[0];

  // 🚨 Simulación: origen ficticio (sede almacén, por ejemplo)
  const origen = "-17.780000,-63.170000";
  const destino = `${pedido.latitud},${pedido.longitud}`;

  return {
    pedido_id: id_pedido,
    distribuidor: pedido.distribuidor,
    origen,
    destino,
    distancia: "1.3 km (simulado)",
    duracion: "11 mins (simulado)",
    pasos: [
      "Salir del almacén",
      "Tomar calle Ayacucho",
      "Cruzar Av. Grigotá",
      "Llegar a la dirección del cliente"
    ]
  };
};

module.exports = { getRutaOptima };
module.exports = { getRutaFalsa,
    getRutaSimuladaPorPedido,
 };
