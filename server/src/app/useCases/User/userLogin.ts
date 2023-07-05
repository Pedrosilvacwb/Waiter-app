import { Request, Response } from "express";
import { User } from "../../models/User";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export async function userLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({ message: "Email ou senha incorretos" });
    }

    const isValidPassword = await compare(password, user?.password as string);

    if (!isValidPassword) {
      return res.status(404).json({ message: "Email ou senha incorretos" });
    }

    const token = jwt.sign({ id: user?.id }, process.env.SECRET_KEY as string, {
      expiresIn: "24h",
      subject: user?.email,
    });

    res.status(200).json({ token, id: user._id });
  } catch (error) {
    res.sendStatus(500);
  }
}
