import express, { Request, Response } from 'express';
import UserController from "../controllers/UserController";

const router = express.Router();


router.post("/users", UserController.createUser);
// router.get("/users", UserController.getUser);

export default router;