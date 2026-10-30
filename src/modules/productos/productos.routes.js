// ── productos.routes.js ─────────────────────────────────────
// Define las rutas del módulo productos y las asocia
// a cada función del controller.

import { Router } from "express";
import productosController from "./productos.controller.js";

const router = Router();

// GET    /productos             → listar todos (acepta ?descripcion=)
// GET    /productos/:codigo     → obtener uno por código
// POST   /productos             → crear (almacenar) nuevo producto
// PUT    /productos/:codigo     → editar producto
// DELETE /productos/:codigo     → eliminar producto

router.get("/", productosController.getAll);
router.get("/:codigo", productosController.getById);
router.post("/", productosController.create);
router.put("/:codigo", productosController.update);
router.delete("/:codigo", productosController.remove);

export default router;

