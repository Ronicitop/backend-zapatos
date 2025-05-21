const jwt = require('jsonwebtoken');

exports.verificarToken = (rolesPermitidos = []) => {
  return (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ error: 'Token requerido' });

    try {
      const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'secreto123');
      if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(decoded.rol)) {
        return res.status(403).json({ error: 'Acceso denegado: rol no autorizado' });
      }

      req.usuario = decoded;
      next();
    } catch (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }
  };
};

