const jwt = require('jsonwebtoken');
const model = require('./auth.model');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await model.buscarPorEmail(email);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const valido = await model.verificarPassword(password, usuario.password);
    if (!valido) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol, nombre: usuario.nombre },
      process.env.JWT_SECRET || 'secreto123',
      { expiresIn: '2h' }
    );

    res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};



// Registrar nuevo usuario
exports.registrar = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    const existente = await model.buscarPorEmail(email);
    if (existente) {
      return res.status(400).json({ error: 'Email ya registrado' });
    }

    const nuevo = await model.registrarUsuario({ nombre, email, password, rol });
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

exports.actualizarPassword = async (req, res) => {
  const { email, nuevaPassword } = req.body;

  try {
    const existe = await model.buscarPorCorreo(email);
    if (!existe) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const actualizado = await model.actualizarPassword({ email, nuevaPassword });
    res.json({ mensaje: 'Contraseña actualizada con éxito', usuario: actualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la contraseña' });
  }
};

// Ver perfil del usuario autenticado
exports.perfil = async (req, res) => {
  try {
    const { id, nombre, rol } = req.usuario;
    res.json({ id, nombre, rol });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener perfil del usuario' });
  }
};

