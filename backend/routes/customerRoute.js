import express from "express";
import CustomerController from "../controllers/customerController.js"; // Fixed casing
import CustomerService from "../services/customerService.js"; // Fixed casing
import CustomerRepository from "../repositories/customerRepository.js"; // Fixed casing
import { Jwt } from "../classes/jwt.js";

const varificator = new Jwt(); // Create an instance of Jwt class
const router = express.Router();

// Initialize repository, service, and controller
const customerRepository = new CustomerRepository();
const customerService = new CustomerService(customerRepository);
const customerController = new CustomerController(customerService);

// Define routes with correct middleware usage
router.get(
  "/customers",
  varificator.verifyToken, // Use middleware correctly
  customerController.getAllCustomers
);

router.get(
  "/customer",
  varificator.verifyToken,
  customerController.getCustomerById
);

router.post("/customer-id", customerController.getCustomerIdByPhone);

router.post("/customer", customerController.createCustomer);

router.put(
  "/customer",
  varificator.verifyToken,
  customerController.updateCustomer
);

router.delete(
  "/customer",
  varificator.verifyToken,
  customerController.deleteCustomer
);

export default router;
