import jwt from "jsonwebtoken";
import bycrypt from "bcryptjs";
import { User } from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // email checking
    const exist = await User.findOne({ where: { email } });
    if (exist) return res.status(400).json({ message: "User already existed" });

    //   password max lenght
    const hashed = await bycrypt.hash(password, 10);

    //   user creation
    const user = await User.create({ email, name, password: hashed });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // finding email exited or not and checking condition
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "user not found" });

    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      user: { email: user.email, id: user.id, name: user.name },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
