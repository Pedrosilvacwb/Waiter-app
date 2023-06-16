import path from "node:path";

import { Router } from "express";
import { listCategories } from "./app/useCases/Categories/listCategories";
import { createCategory } from "./app/useCases/Categories/createCategory";
import { listProducts } from "./app/useCases/Products/listProducts";
import { createProduct } from "./app/useCases/Products/CreateProducts";
import multer from "multer";
import { listProductsByCategory } from "./app/useCases/Categories/listProductsByCategories";
import { listOrders } from "./app/useCases/Orders/listOrders";
import { createOrder } from "./app/useCases/Orders/createOrder";
import { changeOrderStatus } from "./app/useCases/Orders/editOrder";
import { cancelOrder } from "./app/useCases/Orders/removeOrder";
import { removeProduct } from "./app/useCases/Products/RemoveProduct";
import { editProduct } from "./app/useCases/Products/editProducts";

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

export const router = Router();

router.get("/categories", listCategories);
router.post("/categories", createCategory);
router.get("/categories/:categoryId/products", listProductsByCategory);

router.get("/products", listProducts);
router.post("/products", upload.single("image"), createProduct);
router.patch("/products/:productId", upload.single("image"), editProduct);
router.delete("/products/:productId", removeProduct);

router.get("/orders", listOrders);
router.post("/orders", createOrder);
router.patch("/orders/:orderId", changeOrderStatus);
router.delete("/orders/:orderId", cancelOrder);
