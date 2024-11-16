import React, { useState } from "react";
import classes from "./AuthForm.module.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const input = e.target.value;

    // if (input.length === 1 && input !== '+') {
    //   setError('Номер повинен починатися зі знака "+"');
    //   return;
    // }
    // else if (/^[+]?\d*$/.test(input)) {
    //   if (input.length <= 13) { 
    //     setPhoneNumber(input);
    //     setError('');
    //   } else {
    //     setError('Номер телефону не може бути довшим за 12 символів.');
    //   }
    // } else {
    //   setError('Вводьте лише цифри та символ "+".');
    // }
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    // if (!/^\+\d{12}$/.test(phoneNumber)) {
    //   setError('Введіть коректний номер телефону у форматі +************ (12 символів)');
    //   return;
    // }
    // setError('');

    navigate("/AuthorizationConfirm", { state: { phoneNumber } });
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
          placeholder="+************"
          value={phoneNumber}
          onChange={handleChange}
          maxLength="13"
          className={classes.loginInput}
        />
        {/* {error && <p className={classes.error}>{error}</p>} */}
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