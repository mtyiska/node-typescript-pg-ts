import {config}  from"../../config";
import {Pool} from "pg"
export const pool = new Pool(config.db)


export const query = (text:any, params:any) => pool.query(text, params)