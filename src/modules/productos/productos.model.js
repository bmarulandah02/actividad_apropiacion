// ── productos.model.js ──────────────────────────────────────
// Capa de acceso a datos: aquí van todas las consultas SQL
// que interactúan con la tabla "productos" de la BD.

import pool from "../../config/dbconexion.js";

// Obtener todos los productos
// Si se pasa descripcion, filtra por ese campo (búsqueda parcial)
const getAll = async (descripcion) => {
  if (descripcion) {
    const [rows] = await pool.query(
      "SELECT * FROM productos WHERE descripcion LIKE ?",
      [`%${descripcion}%`]
    );
    return rows;
  }
  const [rows] = await pool.query("SELECT * FROM productos");
  return rows;
};

// Obtener UN producto por su código
const getById = async (codigo) => {
  const [rows] = await pool.query(
    "SELECT * FROM productos WHERE codigo = ?",
    [codigo]
  );
  return rows[0]; // undefined si no existe
};

// Crear (almacenar) un nuevo producto
const create = async ({ codigo, descripcion, unidad, costo, precio }) => {
  const [result] = await pool.query(
    "INSERT INTO productos (codigo, descripcion, unidad, costo, precio) VALUES (?, ?, ?, ?, ?)",
    [codigo, descripcion, unidad, costo, precio]
  );
  return result;
};

// Editar un producto existente por código
const update = async (codigoActual, { codigo, descripcion, unidad, costo, precio }) => {
  const [result] = await pool.query(
    "UPDATE productos SET codigo=?, descripcion=?, unidad=?, costo=?, precio=? WHERE codigo=?",
    [codigo, descripcion, unidad, costo, precio, codigoActual]
  );
  return result;
};

// Eliminar un producto por código
const remove = async (codigo) => {
  const [result] = await pool.query(
    "DELETE FROM productos WHERE codigo = ?",
    [codigo]
  );
  return result;
};

export default { getAll, getById, create, update, remove };

