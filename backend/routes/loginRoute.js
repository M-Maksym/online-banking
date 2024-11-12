import express from "express";
import { Jwt } from "../classes/jwt.js";
import { LoginService } from "../services/loginService.js";
import { LoginController } from "../controllers/loginController.js";

const router = express.Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);

// Login route
router.post("/login", (req, res, next) =>
  loginController.login(req, res, next)
);

export default router;
