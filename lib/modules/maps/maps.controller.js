const model = require('./maps.model');
//Obtener ruta optima entre dos puntos
exports.obtenerRuta = async (req, res) => {
  try {
    const { origen, destino } = req.query;

    if (!origen || !destino) {
      return res.status(400).json({ error: 'Faltan parámetros: origen y destino' });
    }

    const ruta = await model.getRutaOptima(origen, destino);
    res.json(ruta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener ruta óptima' });
  }
};

//Obtener ruta por pedido no es ruta real optima
exports.obtenerRutaPorPedido = async (req, res) => {
  try {
    const { id_pedido } = req.params;
    const ruta = await model.getRutaFalsa(id_pedido);
    res.json(ruta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener ruta simulada' });
  }
};
//Obtener ruta real por pedido
exports.obtenerRutaRealPorPedido = async (req, res) => {
  try {
    const { id_pedido } = req.params;
    const ruta = await model.getRutaSimuladaPorPedido(id_pedido);
    res.json(ruta);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'No se pudo obtener ruta para ese pedido' });
  }
};