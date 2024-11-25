import { Router } from "express";
import { getUsersController, ownerLoginController } from "../controllers/index.js";
import { jwtVerfyOwner } from "../middlewares/index.js";

export const router = Router();

// owner login
router.post('/login',ownerLoginController);

// edit username or password
router.post('/edit',jwtVerfyOwner,)

// view users
router.get('/get-user',jwtVerfyOwner,getUsersController);