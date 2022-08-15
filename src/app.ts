import express from 'express';
import cors from 'cors';

import knex from "./database/connection";

const app = express();

const PORT = 4000;



app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.listen(PORT, async () => {
    knex.queryBuilder();
    console.log(`Server listening on port ${PORT}`)
})