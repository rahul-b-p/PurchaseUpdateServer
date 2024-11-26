import { Router } from "express";
import { loginUserController, signupUserController } from "../controllers/index.js";

export const router = Router();

router.post('/signup',signupUserController);

router.post('/login',loginUserController);