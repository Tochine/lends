"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const WalletController_1 = __importDefault(require("../controllers/WalletController"));
const isAuthenticated_1 = __importDefault(require("../middleware/isAuthenticated"));
const router = express_1.default.Router();
router.get("healthcheck", (req, res) => {
    return res.status(200).json({
        status: "success",
        message: "Healthcheck successful"
    });
});
router.post("/users", UserController_1.default.createUser);
router.post("/login", UserController_1.default.login);
router.get("/users", isAuthenticated_1.default, UserController_1.default.getUsers);
router.post("/transaction/credit", isAuthenticated_1.default, WalletController_1.default.creditWallet);
router.post("/transaction/debit", isAuthenticated_1.default, WalletController_1.default.debitWallet);
router.post("/transaction/transfer", isAuthenticated_1.default, WalletController_1.default.createTransfer);
router.get("/balance", isAuthenticated_1.default, WalletController_1.default.getUserBalance);
exports.default = router;
