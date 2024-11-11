import { Validator } from "../classes/validator.js";
import { HttpError } from "../classes/httpError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class TransactionController {
  constructor(TransactionService) {
    this.transactionService = TransactionService;
    this.validator = new Validator();
  }
  //may be used an id for this or token
  async getAllTransactionsOfCards(req, res) {
    const { token } = req.cookies;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const idCustomer = decoded.customerId;

    //cardNumbers = cardNumbers.split(",").map((cardNumber) => cardNumber.trim());

    try {
      const transactions =
        await this.transactionService.getAllTransactionsOfCards(
          idCustomer,
          token
        );
      res.status(200).json(transactions);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(error.statusCode).json({ error: error.message });
      }
    }
  }

  async getTransactionById(req, res) {
    const { id } = req.params;

    if (!id) {
      throw new HttpError("Transaction ID is required", 400);
    }

    try {
      const transaction = await this.transactionService.getTransactionById(id);
      res.status(200).json(transaction);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(error.statusCode).json({ error: error.message });
      }
    }
  }
  async createTransaction(req, res) {
    const { type, amount, senderCardNumber, destination } = req.body;

    if (
      !type || // payment, + or - , send to another card
      !amount ||
      !senderCardNumber ||
      !destination
    ) {
      throw new HttpError("Missing required fields", 400);
    }

    try {
      if (type === "Transfer") {
        this.validator.validateCardNumber(senderCardNumber);
        this.validator.validateCardNumber(destination);

        const result = await this.transactionService.createTransactionTransfer(
          type,
          amount,
          senderCardNumber,
          destination,
          req
        );

        res.status(201).json(result);
      } else {
        this.validator.validateCardNumber(senderCardNumber);

        const result = await this.transactionService.createTransactionPayment(
          type,
          amount,
          senderCardNumber,
          destination,
          req
        );
        res.status(201).json(result);
      }
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(error.statusCode).json({ error: error.message });
      }
    }
  }
}
