import bcrypt from "bcrypt";
import { HttpError } from "../classes/httpError.js";
import fetch from "node-fetch";

class CustomerService {
  constructor(CustomerRepository) {
    this.customerRepository = CustomerRepository;
  }

  async fomateDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, "0"); // Pad day to 2 digits

    return `${year}-${month}-${day}`;
  }
  // Get all customers
  async getAllCustomers() {
    try {
      return await this.customerRepository.getAllCustomers();
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching customers");
    }
  }

  // Get customer by ID
  async getCustomerById(id) {
    if (!id) {
      throw new HttpError("Customer ID is required", 400);
    }

    try {
      const customer = await this.customerRepository.getCustomerById(id);
      return customer;
    } catch (error) {
      console.error(error);

      throw new Error("Error fetching customer");
    }
  }

  async getCustomerIdByPhone(phoneNumber, password) {
    if (!phoneNumber) {
      throw new HttpError("Phone number is required", 400);
    }

    try {
      const customer =
        await this.customerRepository.getCustomerIdByPhone(phoneNumber);
      if (!customer) {
        throw new HttpError("Customer not found", 404);
      }

      // Compare password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, customer.password);
      if (isPasswordValid) {
        return { customer };
      } else {
        return null; // Passwords do not match
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error verifying customer credentials");
    }
  }
  // Create a new customer
  async createCustomer(
    age,
    phoneNumber,
    password,
    firstname,
    lastName,
    midlename,
    address
  ) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const dateCreated = await this.fomateDate();

      // Create customer
      const idCustomer = await this.customerRepository.createCustomer(
        age,
        phoneNumber,
        hashedPassword,
        firstname,
        lastName,
        midlename,
        address,
        dateCreated
      );

      return idCustomer;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating customer");
    }
  }

  // Update an existing customer
  async updateCustomer(id, age, phoneNumber, firstname, lastName, midlename) {
    try {
      // Update customer
      return await this.customerRepository.updateCustomer(
        id,
        age,
        phoneNumber,
        firstname,
        lastName,
        midlename
      );
    } catch (error) {
      console.error(error);
      throw new Error("Error updating customer");
    }
  }

  async deleteCustomer(id) {
    try {
      // Delete customer
      await this.customerRepository.deleteCustomer(id);
      return { result: "success" };
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting customer");
    }
  }
}

export default CustomerService;
