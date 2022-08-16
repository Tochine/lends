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
        port: number;
    }
}
const config: Config = {
    env: {
        isDevelopment: process.env.NODE_ENV || "development"
    },
    app: {
        secret: process.env.SESSION_SECRET || "@HEll01234",
        bcrypt_rounds: 10,
        port: +(process.env.PORT || 4000)
    }
}

export default config;

