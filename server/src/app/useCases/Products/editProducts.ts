import { Request, Response } from "express";

import { Product } from "../../models/Product";

export async function editProduct(req: Request, res: Response) {
  try {
    const imagePath = req.file?.filename;
    const { productId } = req.params;
    const { name, description, price, category, ingredients } = req.body;

    await Product.findByIdAndUpdate(productId, {
      name,
      description,
      price: +price,
      imagePath,
      category,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
    });

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);

    res.sendStatus(500);
  }
}
