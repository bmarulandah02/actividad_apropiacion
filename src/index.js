// ── src/index.js ────────────────────────────────────────────
// Punto de entrada principal del servidor.
// Aquí se configura Express y se registran las rutas.

import express from "express";
import productosRoutes from "./modules/productos/productos.routes.js";

const app = express();
const PORT = 3000;

// Middleware para parsear JSON en el body de las peticiones
app.use(express.json());

// ── Rutas ───────────────────────────────────────────────────
app.use("/productos", productosRoutes);

// Ruta raíz informativa
app.get("/", (req, res) => {
  res.json({
    mensaje: "API Módulo Productos - Ferretería",
    version: "1.0.0",
    endpoints: {
      "GET    /productos": "Listar todos (opcional: ?descripcion=xxx)",
      "GET    /productos/:codigo": "Obtener un producto por código",
      "POST   /productos": "Crear nuevo producto",
      "PUT    /productos/:codigo": "Actualizar producto",
      "DELETE /productos/:codigo": "Eliminar producto",
    },
  });
});

// ── Iniciar servidor ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log("📦 Módulo Productos - Ferretería listo\n");
});

