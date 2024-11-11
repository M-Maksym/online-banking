import express from "express";
import { TransactionController } from "../controllers/transactionController.js";
import { TransactionService } from "../services/transactionService.js";
import { TransactionRepository } from "../repositories/transactionRepository.js";
import { Jwt } from "../classes/jwt.js";

const jwt = new Jwt(); // Create an instance of Jwt class
const router = express.Router();

const transactionRepository = new TransactionRepository();
const transactionService = new TransactionService(transactionRepository);
const transactionController = new TransactionController(transactionService);

// Ensure methods are bound to `transactionController`
router.get(
  "/transactions",
  jwt.verifyToken,
  transactionController.getAllTransactionsOfCards.bind(transactionController)
);

router.get(
  "/transactions/:id",
  jwt.verifyToken,
  transactionController.getTransactionById.bind(transactionController)
);

router.post(
  "/transactions",
  jwt.verifyToken,
  transactionController.createTransaction.bind(transactionController)
);

export default router;
