import { Router } from "express";
import { editUserController, loginUserController, purchaseController, signupUserController } from "../controllers/index.js";
import { jwtVerfyUser } from "../middlewares/index.js";

export const router = Router();

// signup
router.post('/signup', signupUserController);

// login
router.post('/login', loginUserController);

// edit user
router.put('/edit', jwtVerfyUser, editUserController);

// item purchase
router.put('/purchase-item',jwtVerfyUser,purchaseController)

