import express from 'express';
import cors from 'cors';
import config from "./config"

import knex from "./database/connection";

const app = express();

import router from "./routes";


let time = 1800000
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1", router);

app.listen(config.app.port, async () => {
    knex.queryBuilder();
    console.log(`Server listening on port ${config.app.port}`);
})

export default app;