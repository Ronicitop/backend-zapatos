const model = require('./pedido.model');

exports.createPedido = async (req, res) => {
  try {
    const nuevoPedido = await model.createPedido(req.body);
    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el pedido' });
  }
};

exports.getPedidosAsignados = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const pedidos = await model.getPedidosAsignadosPorUsuario(id_usuario);
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pedidos asignados' });
  }
};

exports.updateEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_estado } = req.body;

    if (!id_estado) {
      return res.status(400).json({ error: 'El campo id_estado es obligatorio' });
    }

    const actualizado = await model.updateEstadoPedido(id, id_estado);
    res.status(200).json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el estado del pedido' });
  }
};

exports.getHistorialEntregas = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const entregas = await model.getHistorialEntregasPorDistribuidor(id_usuario);
    res.json(entregas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener historial de entregas' });
  }
};

exports.registrarUbicacionEntrega = async (req, res) => {
  try {
    const { id } = req.params;
    const { latitud, longitud } = req.body;

    if (!latitud || !longitud) {
      return res.status(400).json({ error: 'Latitud y longitud son requeridas' });
    }

    const actualizado = await model.registrarUbicacionYHoraEntrega({
      id_pedido: id,
      latitud,
      longitud
    });

    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar ubicación de entrega' });
  }
};
