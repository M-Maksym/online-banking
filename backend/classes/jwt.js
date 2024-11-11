import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class Jwt {
  generateToken(customerId) {
    const payload = { customerId };
    const options = { expiresIn: "1h" };
    return jwt.sign(payload, process.env.SECRET_KEY, options);
  }

  verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    try {
      const id = jwt.verify(token, process.env.SECRET_KEY);
      req.user = id;
      next();
    } catch (err) {
      res.clearCookie("token");
      return res.status(401).json({ message: "Invalid token" });
    }
  }
}
