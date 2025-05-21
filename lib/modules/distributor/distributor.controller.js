const model = require('./distributor.model');

// Listar distribuidores
exports.getDistributors = async (req, res) => {
  try {
    const data = await model.getAllDistributors();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener distribuidores' });
  }
};

// Crear distribuidor
exports.createDistributor = async (req, res) => {
  try {
    const nuevo = await model.createDistributor(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear distribuidor' });
  }
};
