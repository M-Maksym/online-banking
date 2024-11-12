import { HttpError } from "./httpError.js";

import {
  PASSWORD_REGEX,
  EMAIL_REGEX,
  PHONE_REGEX,
  CVV_REGEX,
  PINCODE_REGEX,
  DATE_REGEX,
} from "../constants/constants.js";

export class Validator {
  validateId(id) {
    const idInt = parseInt(id);
    if (!id) {
      throw new HttpError("ID is required", 400);
    } else if (!Number.isInteger(idInt)) {
      throw new HttpError("ID must be an integer", 400);
    }
  }

  validateEmail(email) {
    if (!EMAIL_REGEX.test(email)) {
      throw new HttpError("Invalid email format", 400);
    }
  }

  validatePassword(password) {
    if (!PASSWORD_REGEX.test(password)) {
      throw new HttpError("Invalid password format", 400);
    }
  }

  validateAge(age) {
    const intage = parseInt(age, 10);
    if (!intage || intage < 1 || intage > 150) {
      throw new HttpError(
        "Age must be a positive integer between 1 and 150",
        400
      );
    }
  }

  validatePhone(phoneNumber) {
    if (!PHONE_REGEX.test(phoneNumber)) {
      throw new HttpError("Invalid phone number format", 400);
    }
  }

  // Card number validation (Luhn algorithm)
  validateCardNumber(cardNumber) {
    const regex = /^\d{16}$/; // Basic validation for 16 digits
    if (!regex.test(cardNumber)) {
      throw new HttpError("Card number must be 16 digits", 400);
    }

    // // Luhn algorithm to validate card number
    // let sum = 0;
    // let shouldDouble = false;

    // for (let i = cardNumber.length - 1; i >= 0; i--) {
    //   let digit = parseInt(cardNumber[i]);

    //   if (shouldDouble) {
    //     digit *= 2;
    //     if (digit > 9) {
    //       digit -= 9;
    //     }
    //   }
    //   sum += digit;
    //   shouldDouble = !shouldDouble;
    // }

    // if (sum % 10 !== 0) {
    //   throw new HttpError("Invalid card number", 400);
    // }
  }

  // CVV validation
  validateCVV(cvv) {
    if (!CVV_REGEX.test(cvv)) {
      throw new HttpError("Invalid CVV format", 400);
    }
  }

  // Pin code validation
  validatePincode(pincode) {
    if (!PINCODE_REGEX.test(pincode)) {
      throw new HttpError("Invalid pincode format", 400);
    }
  }

  // Date format validation (e.g., YYYY-MM-DD)
  validateDate(date) {
    if (!DATE_REGEX.test(date)) {
      throw new HttpError("Invalid date format, expected YYYY-MM-DD", 400);
    }
  }

  validateType(type) {
    const allowedCardTypes = ["credit", "debit", "student"];

    if (!allowedCardTypes.includes(type.toLowerCase())) {
      throw new HttpError(
        "Only 'credit', 'debit', or 'student' card types are allowed",
        400
      );
    }
  }

  validateCard(cardNumber, cvv, pincode, date, type) {
    this.validateCardNumber(cardNumber);
    this.validateCVV(cvv);
    this.validatePincode(pincode);
    this.validateDate(date);
    this.validateType(type);
  }
}
