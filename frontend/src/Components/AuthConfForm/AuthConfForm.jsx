// import React, { useState } from "react";
// import classes from "./AuthConfForm.module.css";

// const AuthConfForm = ({ number }) => {
//   const [code, setCode] = useState(["", "", "", ""]);
//   const [phoneNumber, setPhoneNumber] = useState(number);

//   const handleChange = (e, index) => {
//     const { value } = e.target;
//     if (/^\d*$/.test(value)) {
//       const newCode = [...code];
//       newCode[index] = value;
//       setCode(newCode);

//       if (value && index < code.length - 1) {
//         e.target.nextSibling?.focus();
//       }
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !code[index] && index > 0) {
//       e.target.previousSibling?.focus();
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Введений код: ${code.join("")}`);
//   };

//   return (
//     <div className={classes.smsContainer}>
//       <h1 className={classes.smsTitle}>Введіть код з SMS</h1>
//       <p className={classes.phoneNumber}>{phoneNumber}</p>
//       <form onSubmit={handleSubmit} className={classes.smsForm}>
//         <div className={classes.codeInputs}>
//           {code.map((digit, index) => (
//             <input
//               key={index}
//               type="text"
//               maxLength="1"
//               value={digit}
//               onChange={(e) => handleChange(e, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               className={classes.smsInput}
//             />
//           ))}
//         </div>
//         <p className={classes.resendSms}>Надіслати SMS повторно</p>
//         <button type="submit" className={classes.smsButton}>Далі</button>
//       </form>
//       <p className={classes.loginWithOther}>Увійти за іншим номером</p>
//     </div>
//   );
// };

// export default AuthConfForm;

import React, { useState } from "react";
import axios from "axios";
import classes from "./AuthConfForm.module.css";

const AuthConfForm = ({ number }) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [phone, setPhone] = useState(123456742);
  const [password, setPassword] = useState('');

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
          },
          withCredentials: true,
        }
      );

      console.log("Response data:", response.data);
      console.log("Token: ", response.data.result);

      localStorage.setItem("loginToken", response.data.result);

      const token = localStorage.getItem("loginToken");
      console.log("TokenLS: ", token);
      
    } catch (error) {
      console.error("Error during axios request:", error);
      alert("An error occurred during the login request");
    }
  };

  return (
    <div className={classes.smsContainer}>
      <h1 className={classes.smsTitle}>Увійти</h1>
      <p className={classes.phone}>{phone}</p>
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
      </div>
    </div>
  );
};

export default AuthConfForm;