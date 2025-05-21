const model = require('./vehicle.model');

// Listar vehículos
exports.getVehicles = async (req, res) => {
  try {
    const data = await model.getAllVehicles();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener vehículos' });
  }
};

// Crear vehículo
exports.createVehicle = async (req, res) => {
  try {
    const nuevo = await model.createVehicle(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear vehículo' });
  }
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