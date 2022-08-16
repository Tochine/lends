"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("./database/connection"));
const app = (0, express_1.default)();
const PORT = 4000;
const routes_1 = __importDefault(require("./routes"));
let time = 1800000;
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use("/api/v1", routes_1.default);
app.listen(PORT, async () => {
    connection_1.default.queryBuilder();
    console.log(`Server listening on port ${PORT}`);
});
