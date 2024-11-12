import mysql from "mysql2/promise";
import dotenv from "dotenv";

export class TransactionRepository {
  constructor() {
    dotenv.config();
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }
  async getAllTransactionsOfCards(cardNumbers) {
    // Create a query with multiple `OR` conditions to check both sender and receiver fields
    const conditions = cardNumbers
      .map(() => "(senderCardNumber = ? OR destination = ?)")
      .join(" OR ");

    // Each card number needs to appear twice in the values array, once for each condition
    const values = cardNumbers.flatMap((cardNumber) => [
      cardNumber,
      cardNumber,
    ]);
    const query = `SELECT * FROM Transaction WHERE ${conditions}`;

    // Execute the query with the constructed values array
    const [rows] = await this.pool.query(query, values);

    return rows;
  }

  async getTransactionById(transactionId) {
    const [rows] = await this.pool.query(
      "SELECT * FROM Transaction WHERE id =?",
      [transactionId]
    );
    return rows[0];
  }

  async createTransaction(
    typeTransaction,
    amount,
    commission,
    senderCardNumber,
    receiverCardNumber
  ) {
    const [result] = await this.pool.query(
      "INSERT INTO Transaction (typeTransaction, amount, commission, senderCardNumber, destination) VALUES (?,?,?,?,?)",
      [
        typeTransaction,
        amount,
        commission,
        senderCardNumber,
        receiverCardNumber,
      ]
    );
    return result.insertId;
  }
}
