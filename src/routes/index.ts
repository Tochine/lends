import express, { Request, Response } from 'express';
import UserController from "../controllers/UserController";
import isAuthenticated from "../middleware/isAuthenticated";

const router = express.Router();


router.post("/users", UserController.createUser);
router.get("/login", UserController.login);
router.get("/users", isAuthenticated, UserController.getUsers);

export default router;