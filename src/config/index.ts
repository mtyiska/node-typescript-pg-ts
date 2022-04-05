import dotenv from 'dotenv';
import { ClientConfig} from "pg"

dotenv.config();

const env = process.env;

export const config = {
    db:{
        host: env.POSTGRESHOST,
        port: env.POSTGRESPORT,
        user: env.POSTGRESUSER,
        password: env.POSTGRESPASSWORD,
        database: env.POSTGRESDB
    } as ClientConfig,
    listPerPage: env.LIST_PER_PAGE || 10
}

