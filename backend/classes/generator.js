export class Generator {
  constructor() {
    this.VISA_IIN = "400000";
    this.MASTERCARD_IIN = "510000";
  }

  generateCardNumber(cardType) {
    let IIN;

    switch (cardType.toLowerCase()) {
      case "visa":
        IIN = this.VISA_IIN;
        break;
      case "mastercard":
        IIN = this.MASTERCARD_IIN;
        break;
      default:
        throw new Error(
          "Unsupported card type. Please use 'visa' or 'mastercard'."
        );
    }

    let cardNumber = IIN;

    const randomDigitsCount = cardType.toLowerCase() === "amex" ? 8 : 9;
    for (let i = 0; i < randomDigitsCount; i++) {
      cardNumber += Math.floor(Math.random() * 10).toString();
    }

    const luhnDigit = this.calculateLuhnDigit(cardNumber);

    cardNumber += luhnDigit;

    return cardNumber;
  }

  calculateLuhnDigit(cardNumber) {
    let sum = 0;
    let shouldDouble = true;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber[i]);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    const checkDigit = (10 - (sum % 10)) % 10;

    return checkDigit;
  }

  generateCVV() {
    const cvv = Math.floor(100 + Math.random() * 900).toString();
    return cvv;
  }
}
