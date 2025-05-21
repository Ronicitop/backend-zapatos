const PDFDocument = require('pdfkit');
const fs = require('fs');

const model = require('./report.model');

exports.pedidosPorFecha = async (req, res) => {
  try {
    const data = await model.getPedidosPorFecha();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener pedidos por fecha' });
  }
};

exports.pagosPorFecha = async (req, res) => {
  try {
    const data = await model.getPagosConfirmadosPorFecha();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener pagos por fecha' });
  }
};

exports.pedidosPorDistribuidor = async (req, res) => {
  try {
    const data = await model.getPedidosPorDistribuidor();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener pedidos por distribuidor' });
  }
};

exports.resumen = async (req, res) => {
  try {
    const data = await model.getResumenGeneral();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener resumen' });
  }
};

// Exportar pedidos entregados por fecha en PDF
exports.exportarPedidosPorFechaPDF = async (req, res) => {
  try {
    const data = await model.getPedidosPorFecha();

    const doc = new PDFDocument();
    let filename = 'reporte_entregas.pdf';
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');

    doc.pipe(res);

    doc.fontSize(20).text('Reporte de Pedidos Entregados por Fecha', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12);
    data.forEach((fila, index) => {
      doc.text(`📅 Fecha: ${fila.fecha} - 🛍️ Total entregas: ${fila.total}`);
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar el PDF' });
  }
};

exports.exportarPedidosPorFechaPDF = async (req, res) => {
  try {
    const data = await model.getPedidosPorFecha();
    const doc = new PDFDocument();
    res.setHeader('Content-disposition', 'attachment; filename="pedidos_por_fecha.pdf"');
    res.setHeader('Content-type', 'application/pdf');
    doc.pipe(res);

    doc.fontSize(18).text('📦 Reporte: Pedidos Entregados por Fecha', { align: 'center' }).moveDown();

    data.forEach(row => {
      doc.fontSize(12).text(`📅 ${row.fecha} — Total entregados: ${row.total}`);
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar PDF de entregas' });
  }
};

exports.exportarPagosPorFechaPDF = async (req, res) => {
  try {
    const data = await model.getPagosConfirmadosPorFecha();
    const doc = new PDFDocument();
    res.setHeader('Content-disposition', 'attachment; filename="pagos_por_fecha.pdf"');
    res.setHeader('Content-type', 'application/pdf');
    doc.pipe(res);

    doc.fontSize(18).text('💳 Reporte: Pagos Confirmados por Fecha', { align: 'center' }).moveDown();

    data.forEach(row => {
      doc.fontSize(12).text(`📅 ${row.fecha} — Total pagado: Bs ${row.total}`);
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar PDF de pagos' });
  }
};

exports.exportarPedidosDistribuidorPDF = async (req, res) => {
  try {
    const data = await model.getPedidosPorDistribuidor();
    const doc = new PDFDocument();
    res.setHeader('Content-disposition', 'attachment; filename="pedidos_por_distribuidor.pdf"');
    res.setHeader('Content-type', 'application/pdf');
    doc.pipe(res);

    doc.fontSize(18).text('🚚 Reporte: Pedidos Entregados por Distribuidor', { align: 'center' }).moveDown();

    data.forEach(row => {
      doc.fontSize(12).text(`👤 ${row.distribuidor} — Total entregas: ${row.total}`);
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar PDF por distribuidor' });
  }
};

exports.exportarResumenGeneralPDF = async (req, res) => {
  try {
    const data = await model.getResumenGeneral();
    const doc = new PDFDocument();
    res.setHeader('Content-disposition', 'attachment; filename="resumen_general.pdf"');
    res.setHeader('Content-type', 'application/pdf');
    doc.pipe(res);

    doc.fontSize(18).text('📊 Reporte: Resumen General del Sistema', { align: 'center' }).moveDown();

    doc.fontSize(12)
      .text(`📦 Total pedidos: ${data.total_pedidos}`)
      .text(`✅ Entregados: ${data.entregados}`)
      .text(`🚚 Distribuidores activos: ${data.distribuidores}`)
      .text(`💰 Total pagado (confirmado): Bs ${data.total_pagado || 0}`);

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar resumen PDF' });
  }
};

