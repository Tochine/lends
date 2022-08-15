import express from 'express';
import cors from 'cors';
// import session from 'express-session';

import knex from "./database/connection";
// import config from "./config";

const app = express();

const PORT = 4000;

import router from "./routes";


let time = 1800000
app.use(cors());
// app.use(session({
//     secret: config.app.secret,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { 
//         expires: new Date(Date.now() + time),
//         maxAge: time
//     }
// }))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1", router);

app.listen(PORT, async () => {
    knex.queryBuilder();
    console.log(`Server listening on port ${PORT}`)
})