import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class Jwt {
  generateToken(customer) {
    const payload = {
      customerId: customer.idCustomer,
      firstName: customer.firstName,
      lastname: customer.lastName,
      number: customer.phoneNumber,
    };
    const options = { expiresIn: "1h" };
    return jwt.sign(payload, process.env.SECRET_KEY, options);
  }

  verifyToken(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1]; // Get token from the Authorization header

    if (!token) {
      return res.status(403).send("Token required");
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send("Invalid token");
      }

      // If the token is valid, attach the decoded info to the request object
      req.user = decoded;
      next();
    });
  }
}
