import React, { useState } from "react";
import axios from "axios";
import classes from "./AuthConfForm.module.css";
import { useNavigate } from "react-router-dom";

const AuthConfForm = ({ number }) => {
  const [phone, setPhone] = useState(number);
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleReturn = (e) => {
    navigate("/Authorization");
  };

  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        {
          phone,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      console.log("Response data:", response.data);

      localStorage.setItem("loginToken", response.data.result);
      localStorage.setItem("pass", password);
      localStorage.setItem("number", phone);
      navigate("/");
    } catch (error) {
      console.error("Error during axios request:", error);
      alert("An error occurred during the login request");
    }
  };

  return (
    <div className={classes.smsContainer}>
      <h1 className={classes.smsTitle}>Увійти</h1>
      <p className={classes.phone}>+{phone}</p>
      <div className={classes.passwordInputContainer}>
        <input
          type="password"
          placeholder="Введіть пароль"
          value={password}
          onChange={handleChange}
          className={classes.passwordInput}
        />
        <button onClick={handleSubmit} className={classes.passwordButton}>
          Далі
        </button>
        <p onClick={handleReturn}>Увійти за іншим номером</p>
      </div>
    </div>
  );
};

export default AuthConfForm;