import { Request, Response } from "express";
import { Order } from "../../models/Order";

export const finishOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(
      id,
      { $set: { finished: true } },
      { new: true }
    );
    if (!order) {
      return res.sendStatus(404);
    }
    res.json(order).status(200);
  } catch {
    res.sendStatus(500);
  }
};
