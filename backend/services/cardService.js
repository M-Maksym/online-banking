import bcrypt from "bcrypt";
import { HttpError } from "../classes/httpError.js";

export class CardService {
  constructor(CardRepository) {
    this.CardRepository = CardRepository;
  }

  async getAllCardsOfCustomer(customerId) {
    try {
      if (!customerId) {
        throw new HttpError("Customer ID is required", 400);
      }

      const cards = await this.CardRepository.getAllCardsOfCustomer(customerId);
      return cards;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching cards");
    }
  }

  async getCardById(cardId) {
    if (!cardId) {
      throw new HttpError("Card ID is required", 400);
    }

    try {
      const card = await this.CardRepository.getCardById(cardId);
      return card;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching card");
    }
  }

  async getCardByNumber(cardNumber) {
    if (!cardNumber) {
      throw new HttpError("Card number is required", 400);
    }

    try {
      const idCard = await this.CardRepository.getCardByNumber(cardNumber);
      return idCard;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching card");
    }
  }

  async createCard(number, pincode, cvv, dateExpiration, type, idCustomer) {
    try {
      const id = await this.CardRepository.createCard(
        number,
        pincode,
        cvv,
        dateExpiration,
        type,
        idCustomer
      );
      return id;
    } catch (error) {
      console.log(error);
    }
  }

  async updateCard(cardId, pincode, type) {
    try {
      await this.CardRepository.updateCard(cardId, pincode, type);
      return { result: "success" };
    } catch (error) {
      console.error(error);
      throw new Error("Error updating card");
    }
  }

  async updateCardBalance(id, balance) {
    try {
      await this.CardRepository.updateCardBalance(id, balance);
      return { result: "success" };
    } catch (error) {
      console.error(error);
      throw new Error("Error updating card balance");
    }
  }

  async deleteCard(cardId) {
    try {
      await this.CardRepository.deleteCard(cardId);
      return { result: "success" };
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting card");
    }
  }
}
