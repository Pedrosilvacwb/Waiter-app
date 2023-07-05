import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../../models/User";

export async function editUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { name, email, type, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(userId, {
      name,
      email,
      type,
      password: hashPassword,
    });

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);

    res.sendStatus(500);
  }
}
