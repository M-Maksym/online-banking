import mysql from "mysql2/promise";
import dotenv from "dotenv";

export class CardRepository {
  constructor() {
    dotenv.config();
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  async getAllCardsOfCustomer(idCustomer) {
    const [rows] = await this.pool.query(
      "SELECT idCard, number, cvv, dateExpiration, type, balance FROM Card WHERE idCustomer = ?",
      [idCustomer]
    );
    return rows;
  }

  async getCardById(idCard) {
    const [rows] = await this.pool.query(
      "SELECT number, cvv, dateExpiration, idCustomer, type, balance FROM Card WHERE idCard =?",
      [idCard]
    );
    return rows[0];
  }

  async getCardByNumber(cardNumber) {
    const [rows] = await this.pool.query(
      "SELECT idCard, cvv, dateExpiration, idCustomer, type, balance  FROM Card WHERE number =?",
      [cardNumber]
    );
    return rows[0];
  }

  async createCard(number, pincode, cvv, dateExpiration, type, idCustomer) {
    const result = await this.pool.query(
      "INSERT INTO Card (number, pincode, cvv, dateExpiration, type, idCustomer) VALUES (?,?,?,?,?,?)",
      [number, pincode, cvv, dateExpiration, type, idCustomer]
    );

    const cardId = result[0].insertId;

    return cardId;
  }

  async updateCard(idCard, pincode, type) {
    await this.pool.query(
      "UPDATE Card SET pincode =?,type =? WHERE idCard =?",
      [pincode, type, idCard]
    );

    return { result: "success" };
  }

  async updateCardBalance(idCard, balance) {
    await this.pool.query("UPDATE Card SET balance =? WHERE idCard =?", [
      balance,
      idCard,
    ]);
    return { result: "success" };
  }
  async deleteCard(idCard) {
    await this.pool.query("DELETE FROM Card WHERE idCard =?", [idCard]);
    return { result: "success" };
  }
}
