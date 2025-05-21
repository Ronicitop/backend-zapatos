const model = require('./payment.model');
const QRCode = require('qrcode');
// CU07 - Registrar modalidad de pago
exports.registrarPago = async (req, res) => {
  try {
    const { id_pedido, modalidad, monto } = req.body;
    const nuevoPago = await model.registrarPago({ id_pedido, modalidad, monto });
    res.status(201).json(nuevoPago);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar el pago' });
  }
};

// CU09 - Confirmar pago
exports.confirmarPago = async (req, res) => {
  try {
    const { id_pago } = req.params;
    const actualizado = await model.confirmarPago(id_pago);
    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al confirmar el pago' });
  }
};

// CU08 - Generar código QR para pago
exports.generarQR = async (req, res) => {
  try {
    const { id_pedido, monto } = req.query;

    if (!id_pedido || !monto) {
      return res.status(400).json({ error: 'Faltan datos: id_pedido y monto' });
    }

    const contenido = `Pago pedido #${id_pedido} - Monto: Bs ${monto}`;
    const qr = await QRCode.toDataURL(contenido);

    res.json({ id_pedido, monto, qr });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar el código QR' });
  }
};
