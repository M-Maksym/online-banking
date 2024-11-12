import express from "express";
import dotenv from "dotenv";
import customerRoutes from "./routes/customerRoute.js"; // Fixed import path
import cookieParser from "cookie-parser"; // Import cookie-parser
import transactionRoutes from "./routes/transactionRoute.js"; // Fixed import path
import cardRoutes from "./routes/cardRoute.js"; //
import login from "./routes/loginRoute.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use("/api", login);

app.use("/api", customerRoutes); // All customer routes will be prefixed with '/api'
app.use("/api", cardRoutes);
app.use("/api", transactionRoutes); // All transaction routes will be prefixed with
//

app.get("/test", (req, res) => {
  const token = req.cookies.token;
  if (token) {
    res.status(200).json({ message: "Token exists", token });
  } else {
    res.status(404).json({ message: "No token found" });
  }
});
// Start the server
app.listen(3001, () => {
  console.log(`Server is running on port http://localhost:${3001}`); // Fixed logging
});
