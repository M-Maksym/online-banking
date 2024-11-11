import { HttpError } from "../classes/httpError.js";
import { Validator } from "../classes/validator.js";
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
    const { id } = req.params; // Extract ID from URL

    let customer = null;

    try {
      this.validator.validateId(id);
      customer = await this.CustomerService.getCustomerById(id);

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

      const customerId = await this.CustomerService.getCustomerIdByPhone(
        phone,
        password
      );

      if (!customerId) {
        return res.status(404).json({ message: "Customer not found" });
      }

      res.json(customerId);
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
    const { age, phoneNumber, password } = req.body; // Extract from query parameters\

    try {
      this.validator.validateAge(age);
      this.validator.validatePassword(password);
      this.validator.validatePhone(phoneNumber);

      const customerId = await this.CustomerService.createCustomer(
        age,
        phoneNumber,
        password
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
    const { id } = req.params; // Extract ID from URL
    const { age, phoneNumber, password } = req.body; // Extract age, email, and password from query params

    const customer = null;
    try {
      this.validator.validateId(id);
      this.validator.validateAge(age);
      this.validator.validatePassword(password);
      this.validator.validatePhone(phoneNumber);

      //TODO
      //valieta password for update
      customer = await this.CustomerService.updateCustomer(
        id,
        age,
        phoneNumber,
        email,
        password
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

        res.status(500).json({ message: "Cannot create customer" });
      }
    }
  };

  deleteCustomer = async (req, res) => {
    const { id } = req.params; // Extract ID from URL

    let result = null;

    try {
      this.validator.validateId(id);

      result = await this.CustomerService.deleteCustomer(id);

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
