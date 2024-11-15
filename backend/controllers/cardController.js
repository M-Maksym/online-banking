import { HttpError } from "../classes/httpError.js";
import { Validator } from "../classes/validator.js";
import { Generator } from "../classes/generator.js";
import jwt from "jsonwebtoken";
export class CardController {
  constructor(CardService) {
    this.CardService = CardService;
    this.validator = new Validator();
    this.generator = new Generator();
  }

  formatDate() {
    const date = new Date();
    const year = date.getFullYear() + 4; // Future date by adding 4 years
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Pad month to 2 digits
    const day = String(date.getDate()).padStart(2, "0"); // Pad day to 2 digits

    return `${year}-${month}-${day}`; // SQL-compatible 'YYYY-MM-DD'
  }

  getAllCardsOfCustomer = async (req, res) => {
    const idCustomer = req.user.customerId;

    try {
      this.validator.validateId(idCustomer);

      const cards = await this.CardService.getAllCardsOfCustomer(idCustomer);
      res.status(201).json(cards);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Error fetching cards" });
      }
    }
  };

  getCardById = async (req, res) => {
    const { id } = req.params;

    try {
      this.validator.validateId(id);

      const card = await this.CardService.getCardById(id);

      if (!card) {
        return res.status(404).json({ message: "Card not found" });
      }

      res.status(201).json(card);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Error fetching card" });
      }
    }
  };

  getCardByNumber = async (req, res) => {
    const { number } = req.query;

    try {
      this.validator.validateCardNumber(number);

      const card = await this.CardService.getCardByNumber(number);

      if (!card) {
        return res.status(404).json({ message: "Card not found" });
      }

      res.status(201).json(card);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Error fetching card" });
      }
    }
  };

  createCard = async (req, res) => {
    const { pincode, type } = req.body;

    const { customerId } = req.user;

    const number = this.generator.generateCardNumber("mastercard");
    const cvv = this.generator.generateCVV();
    const dateExpiration = this.formatDate();

    try {
      this.validator.validateCard(number, cvv, pincode, dateExpiration, type);
      this.validator.validateId(customerId);

      const idCard = await this.CardService.createCard(
        number,
        pincode,
        cvv,
        dateExpiration,
        type,
        customerId
      );

      res.status(201).json({ id: idCard });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Error creating card" });
      }
    }
  };
  //TODO find only those that are changed
  updateCard = async (req, res) => {
    const { pincode, type } = req.body;
    const { id } = req.params;

    try {
      this.validator.validatePincode(pincode);
      this.validator.validateType(type);
      this.validator.validateId(id);

      const massage = await this.CardService.updateCard(id, pincode, type);

      res.status(201).json(massage);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Error updating card" });
      }
    }
  };

  updateCardBalance = async (req, res) => {
    const { id } = req.params;

    const { balance } = req.body;

    try {
      this.validator.validateId(id);

      const result = await this.CardService.updateCardBalance(id, balance);

      if (!result.result) {
        return res.status(404).json({ message: "Card not found" });
      }

      res
        .status(200)
        .json({ message: "Card balance updated successfully", cardId: id });
    } catch (err) {
      if (err instanceof HttpError) {
        res.status(err.statusCode).json({ message: err.message });
      } else {
        console.error(err);
        res.status(500).json({ message: "Error updating card balance" });
      }
    }
  };

  deleteCard = async (req, res) => {
    const { id } = req.params;

    try {
      this.validator.validateId(id);

      const result = await this.CardService.deleteCard(id);

      if (!result.result) {
        return res.status(404).json({ message: "Card not found" });
      }

      res.status(200).json({ message: "Card deleted successfully" });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Error deleting card" });
      }
    }
  };
}
