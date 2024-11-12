import mysql from "mysql2/promise";
import dotenv from "dotenv";

class CustomerRepository {
  constructor() {
    dotenv.config();
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  async getAllCustomers() {
    const [rows] = await this.pool.query(
      "SELECT age, phoneNumber, dateCreated FROM Customer"
    );
    return rows;
  }

  async getCustomerById(id) {
    const [rows] = await this.pool.query(
      `SELECT age, phoneNumber, dateCreated
            FROM Customer
            WHERE idCustomer = ?`,
      [id]
    );
    return rows[0];
  }

  async getCustomerIdByPhone(phoneNumber) {
    const [rows] = await this.pool.query(
      `SELECT idCustomer, password
            FROM Customer 
            WHERE phoneNumber = ?`,
      [phoneNumber]
    );
    return rows[0];
  }

  async createCustomer(age, phoneNumber, password, balance, dateCreated) {
    const result = await this.pool.query(
      `INSERT INTO Customer (age, phoneNumber, password,  dateCreated)
     VALUES (?, ?, ?, ?, ?)`,
      [age, phoneNumber, password, dateCreated]
    );

    const customerId = result[0].insertId;

    return customerId;
  }

  async updateCustomer(idCustomer, age, phoneNumber, password, dateCreated) {
    await this.pool.query(
      `UPDATE Customer 
            SET age = ?, phoneNumber = ?, password = ?, balance = ?, dateCreated = ?
            WHERE idCustomer = ?`,
      [age, phoneNumber, password, dateCreated, idCustomer]
    );
    return { result: "success" };
  }

  async deleteCustomer(idCustomer) {
    await this.pool.query(
      `DELETE FROM Customer 
            WHERE idCustomer = ?`,
      [idCustomer]
    );
    return { result: "success" };
  }
}

export default CustomerRepository;
