-- ============================================================
-- Base de datos: Módulo Productos - Ferretería
-- Ejecuta este script en MySQL Workbench o phpMyAdmin
-- ============================================================

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS db_ferreteria
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_spanish_ci;

USE db_ferreteria;

-- Tabla productos
CREATE TABLE IF NOT EXISTS productos (
  codigo      VARCHAR(20)     NOT NULL,
  descripcion VARCHAR(255)    NOT NULL COMMENT 'Nombre del producto, ej: Cemento',
  unidad      VARCHAR(50)     NOT NULL COMMENT 'bulto, kilos, libras, unidad, metro',
  costo       DECIMAL(10, 2)  NOT NULL COMMENT 'Costo de compra al proveedor',
  precio      DECIMAL(10, 2)  NOT NULL COMMENT 'Precio de venta para los clientes',
  PRIMARY KEY (codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Datos de ejemplo
INSERT INTO productos (codigo, descripcion, unidad, costo, precio) VALUES
  ('P001', 'Cemento',             'bulto',  25000, 32000),
  ('P002', 'Arena de río',        'kilos',    500,   800),
  ('P003', 'Puntilla 2 pulgadas', 'libras',  3000,  4500);

