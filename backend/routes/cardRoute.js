import express from "express";
import { CardController } from "../controllers/cardController.js";
import { CardService } from "../services/cardService.js";
import { CardRepository } from "../repositories/cardRepository.js";
import { Jwt } from "../classes/jwt.js";

const varificator = new Jwt(); // Create an instance of Jwt class
const router = express.Router();

const cardRepository = new CardRepository();
const cardService = new CardService(cardRepository);
const cardController = new CardController(cardService);

router.get("/cards/:id", varificator.verifyToken, cardController.getCardById);
router.get("/cards-number", cardController.getCardByNumber);
router.get(
  "/cards-customer",
  varificator.verifyToken,
  cardController.getAllCardsOfCustomer
);

router.post("/cards", varificator.verifyToken, cardController.createCard);
router.put("/cards/:id", varificator.verifyToken, cardController.updateCard); //not in disgine
router.patch(
  "/cards/:id",
  varificator.verifyToken,
  cardController.updateCardBalance
);
router.delete("/cards/:id", varificator.verifyToken, cardController.deleteCard);

export default router;
