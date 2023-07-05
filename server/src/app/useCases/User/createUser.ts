import { Request, Response } from "express";
import { User } from "../../models/User";
import bcrypt from "bcrypt";

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email, password, type } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      type,
    });

    const userWithoutPassword = { ...user.toObject(), password: undefined };

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.sendStatus(500);
  }
}
