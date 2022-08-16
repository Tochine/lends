import env from "dotenv";
import path from "path";

env.config({ path: path.join(__dirname, "../../.env") });

type Config = {
    env: {
        isDevelopment: string;
    },
    app: {
        secret: string;
        bcrypt_rounds: number;
    }
}
const config: Config = {
    env: {
        isDevelopment: process.env.NODE_ENV || "development"
    },
    app: {
        secret: process.env.SESSION_SECRET || "@HEll01234",
        bcrypt_rounds: 10
    }
}

export default config;

