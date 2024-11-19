import { HttpError } from "../classes/httpError.js";
import { Validator } from "../classes/validator.js";
import jwt from "jsonwebtoken";
//import { Generator } from "../classes/generator.js";

class CustomerController {
  constructor(CustomerService) {
    this.CustomerService = CustomerService;
    this.validator = new Validator();
  }

  getAllCustomers = async (req, res) => {
    try {
      const customers = await this.CustomerService.getAllCustomers();

      res.json(customers);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);

        res.status(500).json({ message: "Cannot get customers" });
      }
    }
  };

  // Get a customer by ID from the URL path param
  getCustomerById = async (req, res) => {
    const { customerId } = req.user;
    let customer = null;

    try {
      this.validator.validateId(customerId);
      customer = await this.CustomerService.getCustomerById(customerId);

      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }

      res.json(customer);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);

        res.status(500).json({ message: "Cannot get customer by id" });
      }
    }
  };

  getCustomerIdByPhone = async (req, res) => {
    const { phone, password } = req.body;

    try {
      this.validator.validatePhone(phone);
      this.validator.validatePassword(password);

      const customer = await this.CustomerService.getCustomerIdByPhone(
        phone,
        password
      );

      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }

      res.json(customer);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);

        res
          .status(500)
          .json({ message: "Cannot get customer by phone number" });
      }
    }
  };

  // Create a new customer, extracting data from query params
  createCustomer = async (req, res) => {
    const {
      age,
      phoneNumber,
      password,
      firstName,
      lastName,
      middleName,
      address,
    } = req.body; // Extract from query parameters\

    try {
      this.validator.validateAge(age);
      this.validator.validatePassword(password);
      this.validator.validatePhone(phoneNumber);

      const customerId = await this.CustomerService.createCustomer(
        age,
        phoneNumber,
        password,
        firstName,
        lastName,
        middleName,
        address
      );

      res.status(201).json({ id: `${customerId}` });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);

        res.status(500).json({ message: "Cannot create customer" });
      }
    }
  };

  // Update an existing customer using both path params and query params
  updateCustomer = async (req, res) => {
    const { customerId } = req.user;

    const { age, phoneNumber, firstName, lastName, middleName } = req.body; // Extract age, email, and password from query params

    let customer = null;
    try {
      this.validator.validateId(customerId);
      this.validator.validateAge(age);
      this.validator.validatePhone(phoneNumber);

      //TODO
      //valieta password for update
      customer = await this.CustomerService.updateCustomer(
        customerId,
        age,
        phoneNumber,
        firstName,
        lastName,
        middleName
      );
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.status(200).json(customer);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);

        res.status(500).json({ message: "Cannot update customer" });
      }
    }
  };

  deleteCustomer = async (req, res) => {
    const idCustomer = req.user.customerId;

    let result = null;

    try {
      this.validator.validateId(idCustomer);

      result = await this.CustomerService.deleteCustomer(idCustomer);

      if (!result) {
        return res.status(404).json({ message: "Customer not found" });
      }

      res.status(200).json({ message: "Customer deleted" });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);

        res.status(500).json({ message: "Cannot create customer" });
      }
    }
  };
}

export default CustomerController;
