import {query} from "../../db"
import {config} from "../../../config";
import {emptyOrRows} from "../../../utils/helpers"

export const getMultipleQuotesProvider = async (page =1) =>{
    // const offset = helper.getOffset(page, config.listPerPage);
    const offset =1;
    const rows = await query(
        'SELECT id, quote, author FROM quote OFFSET $1 LIMIT $2',
        [offset, config.listPerPage]
    );
    const data = emptyOrRows(rows);

    const meta = {page}
    return {
        data,
        meta
    }
}

export const getQuotesByIdProvider = async (id:string) =>{
    const result = await query(
        "SELECT * FROM quote where id = $1", 
        [id]
    );
    console.log(result.rowCount)
    return result

}

export const createQuoteProvider = async (quote:any) => {
    const result = await query(
        'INSERT INTO quote(quote, author) VALUES ($1, $2) returning *',
        [quote.quote, quote.author]
    );
    
    let message = 'Error in creating quote';

    if (result.rowCount > 0) {
        message = 'Quote created successfully';
    }

    return {message};
}

export const updateQuoteProvider = async (id:string, data:any) =>{
    return await query(
        "UPDATE quote SET quote = $2, author = $3 where id =$1 returning *",
        [id, data.quote, data.author]
    );
}

export const deleteQuoteProvider = async (id:string) =>{
    await query(
        "DELETE FROM quote where id = $1",
        [id]
    );
    return "Deleted"
}






