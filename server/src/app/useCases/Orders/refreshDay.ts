import { Request, Response } from "express";
import { Order } from "../../models/Order";

export const refreshOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.updateMany(
      { finished: false },
      { $set: { finished: true } },
      { new: true }
    );

    res.json(orders).status(200);
  } catch {
    res.sendStatus(500);
  }
};
