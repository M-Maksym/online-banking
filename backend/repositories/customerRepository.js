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
      "SELECT age, phoneNumber, dateCreated,firstName, lastName, middleName ,address FROM Customer"
    );
    return rows;
  }

  async getCustomerById(id) {
    const [rows] = await this.pool.query(
      `SELECT age, phoneNumber, dateCreated, firstName, lastName, middleName,address
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

  async createCustomer(
    age,
    phoneNumber,
    password,
    firstName,
    lastName,
    middleName,
    address,
    dateCreated
  ) {
    const result = await this.pool.query(
      `INSERT INTO Customer (age, phoneNumber, password, firstName,lastName, middleName ,address,  dateCreated)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        age,
        phoneNumber,
        password,
        firstName,
        lastName,
        middleName,
        address,
        dateCreated,
      ]
    );

    const customerId = result[0].insertId;

    return customerId;
  }

  async updateCustomer(
    idCustomer,
    age,
    phoneNumber,
    firstName,
    lastName,
    middleName,
    address
  ) {
    await this.pool.query(
      `UPDATE Customer 
            SET age = ?, phoneNumber = ?, firstName = ?, lastName = ?, middleName = ?, address = ?
            WHERE idCustomer = ?`,
      [age, phoneNumber, firstName, lastName, middleName, address, idCustomer]
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
