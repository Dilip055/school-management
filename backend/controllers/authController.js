import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CustomError from "../utils/customError.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) throw new CustomError("User not found", 404);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new CustomError("Invalid credentials", 401);

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  return res.status(200).json({
    token,
    id: user.id,
    role: user.role,
    message: `${user.role} logged in successfully`,
  });
};

export const getCurrentUser = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) throw new CustomError("Unauthorized", 401);

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const userinfo = await User.findByPk(decoded.id, {
    include: [
      {
        model: User,
        as: "Parents",
        attributes: ["id", "username", "email", "motherName"],
        through: { attributes: [] },
      },
      {
        model: User,
        as: "Students",
        attributes: ["id", "username", "email"],
        through: { attributes: [] },
      },
    ],
  });

  if (!userinfo) throw new CustomError("User not found", 404);

  res.status(200).json({ userinfo });
};
