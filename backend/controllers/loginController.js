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
      const respond = await this.loginService.authenticate(phone, password);

      if (!respond.customer) {
        throw new HttpError("Invalid credentials", 401);
      }

      // Generate JWT token
      const token = this.jwt.generateToken(respond.customer);

      // Send token as response

      res
        .status(200)
        .json({ message: "Logged in successfully", result: token });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Error logging in" });
      }
    }
  }
}
