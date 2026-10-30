// ── productos.controller.js ─────────────────────────────────
// Capa de lógica de negocio: recibe la petición HTTP,
// llama al modelo y devuelve la respuesta JSON.

import productosModel from "./productos.model.js";

// Utilidad: valida que todos los campos estén presentes y sean correctos
const validarProducto = ({ codigo, descripcion, unidad, costo, precio }) => {
  if (!codigo || !descripcion || !unidad || costo === undefined || precio === undefined) {
    return "Todos los campos son obligatorios: codigo, descripcion, unidad, costo, precio";
  }
  if (isNaN(Number(costo)) || isNaN(Number(precio))) {
    return "Los campos costo y precio deben ser números";
  }
  if (Number(costo) < 0 || Number(precio) < 0) {
    return "Los campos costo y precio no pueden ser negativos";
  }
  return null; // sin error
};

// GET /productos  →  listar todos (con filtro opcional ?descripcion=)
const getAll = async (req, res) => {
  try {
    const { descripcion } = req.query;
    const productos = await productosModel.getAll(descripcion);
    res.json({ total: productos.length, productos });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos", detalle: error.message });
  }
};

// GET /productos/:codigo  →  obtener un producto
const getById = async (req, res) => {
  try {
    const producto = await productosModel.getById(req.params.codigo);
    if (!producto) {
      return res.status(404).json({ error: `Producto "${req.params.codigo}" no encontrado` });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar el producto", detalle: error.message });
  }
};

// POST /productos  →  crear (almacenar) un producto
const create = async (req, res) => {
  try {
    const errorValidacion = validarProducto(req.body);
    if (errorValidacion) {
      return res.status(400).json({ error: errorValidacion });
    }

    // Verificar que el código no exista ya
    const existe = await productosModel.getById(req.body.codigo);
    if (existe) {
      return res.status(409).json({ error: `Ya existe un producto con el código "${req.body.codigo}"` });
    }

    await productosModel.create(req.body);
    res.status(201).json({ mensaje: "Producto creado exitosamente", producto: req.body });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto", detalle: error.message });
  }
};

// PUT /productos/:codigo  →  editar un producto
const update = async (req, res) => {
  try {
    const errorValidacion = validarProducto(req.body);
    if (errorValidacion) {
      return res.status(400).json({ error: errorValidacion });
    }

    const existe = await productosModel.getById(req.params.codigo);
    if (!existe) {
      return res.status(404).json({ error: `Producto "${req.params.codigo}" no encontrado` });
    }

    // Si cambia el código, verificar que el nuevo no exista
    if (req.body.codigo !== req.params.codigo) {
      const codigoNuevoExiste = await productosModel.getById(req.body.codigo);
      if (codigoNuevoExiste) {
        return res.status(409).json({ error: `Ya existe un producto con el código "${req.body.codigo}"` });
      }
    }

    await productosModel.update(req.params.codigo, req.body);
    res.json({ mensaje: "Producto actualizado exitosamente", producto: req.body });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto", detalle: error.message });
  }
};

// DELETE /productos/:codigo  →  eliminar un producto
const remove = async (req, res) => {
  try {
    const existe = await productosModel.getById(req.params.codigo);
    if (!existe) {
      return res.status(404).json({ error: `Producto "${req.params.codigo}" no encontrado` });
    }

    await productosModel.remove(req.params.codigo);
    res.json({ mensaje: "Producto eliminado exitosamente", producto: existe });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto", detalle: error.message });
  }
};

export default { getAll, getById, create, update, remove };

