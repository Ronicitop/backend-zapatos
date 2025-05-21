const express = require('express');
const cors = require('cors');
const paymentRoutes = require('./lib/modules/payment/payment.routes');
require('dotenv').config();

// 💡 Primero creamos la app
const app = express();

// 💡 Luego los middlewares
app.use(cors());
app.use(express.json());
app.use('/api/pagos', paymentRoutes);

// 💡 Luego importamos las rutas
const distributorRoutes = require('./lib/modules/distributor/distributor.routes');
const vehicleRoutes = require('./lib/modules/distributor/vehicle.routes');
const assignmentRoutes = require('./lib/modules/assignment/assignment.routes');
const pedidoRoutes = require('./lib/modules/pedido/pedido.routes'); 
const mapaRoutes = require('./lib/modules/maps/maps.routes');

// 💡 Luego usamos las rutas
app.use('/api/distribuidores', distributorRoutes);
app.use('/api/vehiculos', vehicleRoutes);
app.use('/api/asignacion', assignmentRoutes);
app.use('/api/pedidos', pedidoRoutes); 
require('dotenv').config();
app.use('/api/mapa', mapaRoutes);

// Ruta base de prueba
app.get('/', (req, res) => {
  res.send('Backend de Distribución de Zapatos en marcha 🥿🚚');
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
