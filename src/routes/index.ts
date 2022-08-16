import express, { Request, Response } from 'express';
import UserController from "../controllers/UserController";
import WalletController from "../controllers/WalletController";
import isAuthenticated from "../middleware/isAuthenticated";

const router = express.Router();

router.get("healthcheck", (req: Request, res: Response) => {
    return res.status(200).json({
        status: "success",
        message: "Healthcheck successful"
    })
})
router.post("/users", UserController.createUser);
router.post("/login", UserController.login);
router.get("/users", isAuthenticated, UserController.getUsers);
router.post("/transaction/credit", isAuthenticated, WalletController.creditWallet);
router.post("/transaction/debit", isAuthenticated, WalletController.debitWallet);
router.post("/transaction/transfer", isAuthenticated, WalletController.createTransfer);
router.get("/balance", isAuthenticated, WalletController.getUserBalance);

export default router;