import React, { useState } from "react";
import classes from "./AuthForm.module.css";
 
const LoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Надіслано SMS на номер: ${phoneNumber}`);
  };

  return (
    <div className={classes.loginContainer}>
      <h1 className={classes.loginTitle}>Увійти до системи</h1>
      <p className={classes.loginSubtitle}>
        Введіть номер вашого мобільного телефону для отримання <strong>SMS</strong> з кодом доступу
      </p>
      <form onSubmit={handleSubmit} className={classes.loginForm}>
        <input
          type="text"
          placeholder="Номер телефону"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={classes.loginInput}
        />
        <button type="submit" className={classes.loginButton}>Надіслати SMS</button>
      </form>
      <p className={classes.loginFooter}>
        (Нікому не повідомляйте СМС-код, свій логін або пароль.<br />
        Співробітник банку ніколи їх не запитає)
      </p>
    </div>
  );
};

export default LoginForm;