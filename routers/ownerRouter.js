import { Router } from "express";
import { addItemController, editOwnerController, getItemController, getUsersController, ownerLoginController } from "../controllers/index.js";
import { jwtVerfyOwner } from "../middlewares/index.js";

export const router = Router();

// owner login
router.post('/login', ownerLoginController);

// edit username or password
router.put('/edit', jwtVerfyOwner, editOwnerController);

// view users
router.get('/get-user', jwtVerfyOwner, getUsersController);

// view items
router.get('/get-item', jwtVerfyOwner, getItemController);

// add new items
router.post('/add-item', jwtVerfyOwner, addItemController)