import { Request, Response } from "express";

import { User } from "../../models/User";

export async function listUsers(req: Request, res: Response) {
  try {
    const users = await User.find();

    const usersToDisplay = users.map((user) => {
      return {
        name: user.name,
        email: user.email,
        type: user.type,
        _id: user._id,
      };
    });

    res.status(200).json(usersToDisplay);
  } catch (error) {
    res.sendStatus(500);
  }
}
