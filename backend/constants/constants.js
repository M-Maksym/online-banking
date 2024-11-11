export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
// Password regex (example): At least one letter and one number, minimum length 8

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const PHONE_REGEX = /^(\d{1,3})(\d{5,15})$/;

export const CVV_REGEX = /^\d{3,4}$/;

export const PINCODE_REGEX = /^\d{4,6}$/;

export const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
