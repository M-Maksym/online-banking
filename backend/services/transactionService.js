import { HttpError } from "../classes/httpError.js";
import fetch from "node-fetch";

export class TransactionService {
  constructor(TransactionRepository) {
    this.transactionRepository = TransactionRepository;
  }

  async getAllTransactionsOfCards(idCustomer, token) {
    try {
      const response = await fetch(
        `http://localhost:3001/api/cards/customer/${idCustomer}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: `token=${token}`, // Fixed token syntax
          },
        }
      );

      if (!response.ok) {
        throw new HttpError("Error fetching cards", 500);
      }

      const cards = await response.json();
      if (!cards || cards.length === 0) {
        throw new HttpError("No cards found for the customer", 404);
      }

      const cardNumbers = cards.map((card) => card.number);

      // Fetch all transactions associated with these card numbers
      return await this.transactionRepository.getAllTransactionsOfCards(
        cardNumbers
      );
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching transactions");
    }
  }

  async getTransactionById(transactionId) {
    try {
      const transaction =
        await this.transactionRepository.getTransactionById(transactionId);
      if (!transaction) {
        throw new HttpError("Transaction not found", 404);
      }
      return transaction;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching transaction");
    }
  }

  async createTransactionPayment(
    type,
    amount,
    senderCardNumber,
    destination,
    req
  ) {
    const commission = amount > 1000 ? 1 : amount * 0.1;
    try {
      const senderCardResponse = await fetch(
        `http://localhost:3001/api/cards-number?number=${senderCardNumber}`
      );

      if (!senderCardResponse.ok) {
        throw new HttpError("Sender card number is invalid", 404);
      }

      let senderCard = await senderCardResponse.json();

      if (senderCard.balance < amount + commission) {
        throw new HttpError("Insufficient funds", 400);
      }

      senderCard.balance -= amount - commission;
      //creating an transaction
      const result = await this.transactionRepository.createTransaction(
        type,
        amount,
        commission,
        senderCardNumber,
        destination
      );

      await fetch(`http://localhost:3001/api/cards/${senderCard.idCard}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        body: JSON.stringify({ balance: senderCard.balance }),
      });
      return { result };
    } catch (error) {
      console.error(error);
      throw new Error("Error creating transaction");
    }
  }

  async createTransactionTransfer(
    type,
    amount,
    senderCardNumber,
    receiverCardNumber,
    req
  ) {
    const commission = amount > 1000 ? 1 : amount * 0.001;

    try {
      const token = req.cookies.token;
      const senderCardResponse = await fetch(
        `http://localhost:3001/api/cards-number?number=${senderCardNumber}`
      );

      const receiverCardResponse = await fetch(
        `http://localhost:3001/api/cards-number?number=${receiverCardNumber}`
      );

      if (!senderCardResponse.ok) {
        throw new HttpError("Sender card number is invalid", 404);
      }
      if (!receiverCardResponse.ok) {
        throw new HttpError("Receiver card number is invalid", 404);
      }

      let senderCard = await senderCardResponse.json();
      let receiverCard = await receiverCardResponse.json();

      if (senderCard.balance < amount + commission) {
        throw new HttpError("Insufficient funds", 400);
      }

      senderCard.balance -= amount + commission;
      receiverCard.balance = parseFloat(receiverCard.balance) + amount;

      // Create a transaction
      const result = await this.transactionRepository.createTransaction(
        type,
        amount,
        commission,
        senderCardNumber,
        receiverCardNumber
      );

      // Update sender balance
      await fetch(`http://localhost:3001/api/cards/${senderCard.idCard}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        body: JSON.stringify({ balance: senderCard.balance }),
      });

      // Update receiver balance
      await fetch(`http://localhost:3001/api/cards/${receiverCard.idCard}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        body: JSON.stringify({ balance: receiverCard.balance }),
      });

      return { result };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      } else {
        console.error(error);
        throw new Error("Error creating transaction");
      }
    }
  }
}
