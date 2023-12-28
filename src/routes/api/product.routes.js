

import { Router } from 'express';
import { getProducts, getOneProductById, createProduct, productDeleter, productUpdater } from '../../controller/product.controller.js';
import { isAdmin } from '../../middlewares/auth.middleware.js';

// Importar todos los routers;
export const router = Router();

router.get('/', getProducts);

// Endpoint para traer el producto solicitado by id en el params
router.get('/:pid', getOneProductById);

router.post("/", createProduct);

router.put('/:pid', isAdmin, productUpdater);

router.delete('/:pid', isAdmin, productDeleter);