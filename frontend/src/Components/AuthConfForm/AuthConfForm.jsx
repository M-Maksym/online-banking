import React, { useState } from "react";
import classes from "./AuthConfForm.module.css";

const AuthConfForm = ({ number }) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [phoneNumber, setPhoneNumber] = useState(number);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < code.length - 1) {
        e.target.nextSibling?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      e.target.previousSibling?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Введений код: ${code.join("")}`);
  };

  return (
    <div className={classes.smsContainer}>
      <h1 className={classes.smsTitle}>Введіть код з SMS</h1>
      <p className={classes.phoneNumber}>{phoneNumber}</p>
      <form onSubmit={handleSubmit} className={classes.smsForm}>
        <div className={classes.codeInputs}>
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={classes.smsInput}
            />
          ))}
        </div>
        <p className={classes.resendSms}>Надіслати SMS повторно</p>
        <button type="submit" className={classes.smsButton}>Далі</button>
      </form>
      <p className={classes.loginWithOther}>Увійти за іншим номером</p>
    </div>
  );
};

export default AuthConfForm;