import { Request, Response } from "express";

import { Ingredient } from "../../models/Ingredient";

export async function listIngredients(req: Request, res: Response) {
  try {
    const ingredients = await Ingredient.find();

    res.status(200).json(ingredients);
  } catch (error) {
    res.sendStatus(500);
  }
}
