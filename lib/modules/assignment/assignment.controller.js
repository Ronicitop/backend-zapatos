const model = require('./assignment.model');

exports.assignPedido = async (req, res) => {
  try {
    const { id_pedido, id_usuario, id_vehiculo } = req.body;

    if (!id_pedido || !id_usuario || !id_vehiculo) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const result = await model.assignPedido({ id_pedido, id_usuario, id_vehiculo });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al asignar pedido' });
  }
};
