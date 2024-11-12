import { HttpError } from "../classes/httpError.js";

export class AccountService {
  constructor(AcountRepository) {
    this.AcountRepository = AcountRepository;
  }

  async fomateDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, "0"); // Pad day to 2 digits

    return `${year}-${month}-${day}`;
  }

  async getAllAccounts() {
    try {
      return await this.AcountRepository.getAllAccounts();
    } catch (error) {
      console.error(error);
      throw new Error("Error getting all accounts");
    }
  }

  async getAccountById(id) {
    try {
      return await this.AcountRepository.getAccountById(id);
    } catch (error) {
      console.log(error);
      throw new Error("Error getting account");
    }
  }
  //TODO
  // Check if customer allready has an account
  async createAccount(idCustomer_Account) {
    const balance = 1000; // set start balance

    const date = await this.fomateDate();

    try {
      const account =
        await this.AcountRepository.getAccountById(idCustomer_Account);

      if (account) {
        throw new HttpError("Customer already has an account", 403); // Throw error if customer allready has an account  //TODO add logic to handle this case
      }

      await this.AcountRepository.createAccount(
        date,
        balance,
        idCustomer_Account
      );

      return { result: "success" };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      } else {
        console.error(error);
        throw new Error("Error creating account");
      }
    }
  }
}
