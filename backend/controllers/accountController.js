import { HttpError } from "../classes/httpError.js";
import { Validator } from "../classes/validator.js";
//TODO make getAccountByCustomerId
export class AccountController {
  constructor(AccountService) {
    this.AccountService = AccountService;
    this.Validator = new Validator();
  }

  getAllAccounts = async (req, res) => {
    let accounts = null;
    try {
      accounts = await this.AccountService.getAllAccounts();

      if (!accounts) {
        return res.status(404).json({ message: "No accounts found" });
      }

      res.json(accounts);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Cannot get all accounts" });
      }
    }
  };

  getAccountById = async (req, res) => {
    const { id } = req.params;

    let account = null;

    try {
      this.Validator.validateId(id);
      account = await this.AccountService.getAccountById(id);

      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }

      res.json(account);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Cannot get all accounts" });
      }
    }
  };

  createAccount = async (req, res) => {
    const { id } = req.params;

    try {
      this.Validator.validateId(id);

      await this.AccountService.createAccount(id);

      res.status(201).json({ message: "Account created successfully" });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Cannot create account" });
      }
    }


    updateAccount = async (req, res) => {
      const { id } = req.params;

      try { 
        this.Validator.validateId(id);

        await this.AccountService.updateAccount(id, req.body);

        res.status(200).json({ message: "Account updated successfully" });
        
      } catch ( error ) { 
        if ( error instanceof HttpError ) {
          res.status( error.statusCode ).json( { message: error.message } );
        } else {
          console.error( error );
          res.status( 500 ).json( { message: "Cannot update account" } );
        } 
      }
    } 
  };
}
