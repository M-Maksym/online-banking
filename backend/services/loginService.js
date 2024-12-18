import fetch from "node-fetch";
import express from "express";
//import { HttpError } from "../classes/httpError.js";

export class LoginService {
  async authenticate(phone, password) {
    try {
      const customerRespond = await fetch(
        "http://localhost:3001/api/customer-id",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone, password }),
        }
      );

      if (!customerRespond.ok) return null;

      const customer = customerRespond.json();

      return customer;
    } catch (error) {
      console.error(error);
      throw new Error("Error authenticating user");
    }
  }
}
