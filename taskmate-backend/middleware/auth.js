import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const secret = process.env.JWT_SECRET;
export const dburl = process.env.DATABASE_URL;

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log("Authorization Header:", authHeader);
  // console.log("JWT Secret in middleware:", process.env.JWT_SECRET);

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized - No token" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded JWT:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    res.status(403).json({ error: "Forbidden - Invalid token" });
  }
};
