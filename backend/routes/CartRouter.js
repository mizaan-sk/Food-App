import express from "express";
import { removeFromCart,addToCart,fetchFromCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";
const CartRouter = express.Router()


CartRouter.post("/add",authMiddleware,addToCart)
CartRouter.post("/remove",authMiddleware,removeFromCart)
CartRouter.post("/get",authMiddleware,fetchFromCart)
export default CartRouter;