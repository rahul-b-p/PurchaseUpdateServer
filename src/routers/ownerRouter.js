import { Router } from "express";
import { addItemController, deleteItemController, editOwnerController, edtItemController, getAllSaleController, getItemController, getUsersController, ownerLoginController, removeUserController } from "../controllers/index.js";
import { jwtVerfyOwner } from "../middlewares/index.js";

export const router = Router();

// owner login
router.post('/login', ownerLoginController);

// edit username or password
router.put('/edit', jwtVerfyOwner, editOwnerController);

// view users
router.get('/get-user', jwtVerfyOwner, getUsersController);

// remove users
router.delete('/delete-user/:index', jwtVerfyOwner, removeUserController);

// view items
router.get('/get-item', jwtVerfyOwner, getItemController);

// add new items
router.post('/add-item', jwtVerfyOwner, addItemController);

// update items
router.put('/edit-item/:index', jwtVerfyOwner, edtItemController);

// delete items
router.delete('/delete-item/:index', jwtVerfyOwner, deleteItemController);

// get sales data
router.get('/get-sales',jwtVerfyOwner,getAllSaleController);