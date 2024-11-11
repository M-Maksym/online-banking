import express from "express";
import { AccountRepository } from "../repositories/accountRepository.js";
import { AccountService } from "../services/accountService.js";
import { AccountController } from "../controllers/accountController.js";
import { Jwt } from "../classes/jwt.js";

const varificator = new Jwt(); // Create an instance of Jwt class
const router = express.Router();

const accountRepository = new AccountRepository();
const accountService = new AccountService(accountRepository);
const accountController = new AccountController(accountService);

router.get("/accounts", accountController.getAllAccounts);
router.get("/accounts/:id", accountController.getAccountById);
//router.put("/accounts/:id", accountController.updateAccount);
router.post("/accounts/:id", accountController.createAccount);
//router.delete("/accounts/:id", accountController.deleteAccount);

export default router;
