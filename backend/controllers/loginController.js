import { Jwt } from "../classes/jwt.js";
import { HttpError } from "../classes/httpError.js";
import { Validator } from "../classes/validator.js";
export class LoginController {
  constructor(loginService) {
    this.loginService = loginService;
    this.jwt = new Jwt();
    this.validator = new Validator();
  }

  async login(req, res, next) {
    const { phone, password } = req.body;

    try {
      this.validator.validatePhone(phone);
      this.validator.validatePassword(password);
      // Validate user credentials with loginService
      const customer = await this.loginService.authenticate(phone, password);

      if (!customer) {
        throw new HttpError("Invalid credentials", 401);
      }

      // Generate JWT token
      const token = this.jwt.generateToken(customer.id);

      // Send token as response
      res.cookie("token", token, {
        httpOnly: true,
        // secure: true,
        // maxAge: 100000,
        // signed: true,
      });

      res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
      throw new HttpError("Invalid credentials", 401);
    }
  }
}
