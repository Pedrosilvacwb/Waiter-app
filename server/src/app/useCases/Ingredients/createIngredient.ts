import { Request, Response } from "express";

import { Ingredient } from "../../models/Ingredient";

export async function createIngredient(req: Request, res: Response) {
  try {
    const { name, icon } = req.body;
    const ingredient = await Ingredient.create({
      name,
      icon,
    });
    res.status(201).json(ingredient);
  } catch (error) {
    res.sendStatus(500);
  }
}
