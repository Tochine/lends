import express, { Request, Response } from 'express';
import UserController from "../controllers/UserController";

const router = express.Router();


router.post("/users", UserController.createUser);
router.get("/users", UserController.getUsers);
router.get("/users/email", UserController.login);

export default router;