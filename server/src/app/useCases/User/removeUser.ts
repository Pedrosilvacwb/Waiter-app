import { Request, Response } from "express";

import { User } from "../../models/User";

export async function removeUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);

    return res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
}
