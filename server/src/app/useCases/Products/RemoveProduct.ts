import { Request, Response } from "express";

import { Product } from "../../models/Product";

export async function removeProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    await Product.findByIdAndDelete(productId);

    return res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
}
