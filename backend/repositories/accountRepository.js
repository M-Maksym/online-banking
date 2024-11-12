import mysql from "mysql2/promise";
import dotenv from "dotenv";

export class AccountRepository {
  constructor() {
    dotenv.config();
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  async getAllAccounts() {
    const [rows] = await this.pool.query(
      "SELECT idAccount, data, balance, idCustomer_Account FROM Account"
    );
    return rows;
  }

  async getAccountById(id) {
    const [rows] = await this.pool.query(
      "SELECT  data, balance, idCustomer_Account FROM Account WHERE IdAccount = ?",
      [id]
    );
    return rows[0];
  }

  async createAccount(date, balance, idCustomer_Account) {
    await this.pool.query(
      "INSERT INTO Account (data, balance, idCustomer_Account) VALUES (?,?,?)",
      [date, balance, idCustomer_Account]
    );

    return { result: "success" };
  }
}
