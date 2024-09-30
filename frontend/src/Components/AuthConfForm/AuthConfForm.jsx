import React, { useState } from "react";
import classes from "./AuthConfForm.module.css";

const AuthConfForm = () => {
  const [code, setCode] = useState(["", "", "", ""]);

  const handleChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Введений код: ${code.join("")}`);
  };

  return (
    <div className={classes.smsContainer}>
      <h1 className={classes.smsTitle}>Введіть код з SMS</h1>
      <p className={classes.phoneNumber}>+380*****1487</p>
      <form onSubmit={handleSubmit} className={classes.smsForm}>
        <div className={classes.codeInputs}>
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
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
