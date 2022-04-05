import {createQuoteProvider, deleteQuoteProvider, getMultipleQuotesProvider, getQuotesByIdProvider, updateQuoteProvider} from "./providers/QuoteProvider"

export const getMultipleQuotes = async (page =1) =>{
    return getMultipleQuotesProvider(page);
}

export const getQuotesById = async (id:string) =>{
    return getQuotesByIdProvider(id);
}

export const createQuote = async (quote:any) => {
    return createQuoteProvider(quote);
}

export const updateQuote = async (id:string, quote: any) => {
    return updateQuoteProvider(id, quote);
}

export const deleteQuote = async (id:string) => {
    return deleteQuoteProvider(id);
}

