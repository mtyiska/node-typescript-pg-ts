import {
getRatingProvider,
getRateByIdProvider,
createRatingProvider,
updateRateProvider,
deleteRateProvider
} from "./providers/RatingProvider"
import { Request } from "express";

export type createRateType = {
    joke_id: number 
    category: string 
    joke?: string 
    setup?: string 
    delivery?: string 
    rating: number 
}

export type updateRateType = {
  category?: string 
  joke?: string 
  setup?: string 
  delivery?: string 
  rating?: number 
}

export const getMultipleRatings = async () =>{
    return getRatingProvider();
}

export const getRateById = async (id:string) =>{
    return getRateByIdProvider(id);
}

export const createRate = async (rating: createRateType) => {
    return createRatingProvider(rating);
}

export const updateRate = async (id:string, rating: updateRateType) => {
    return updateRateProvider(id, rating);
}

export const deleteRate = async (id:string) => {
    return deleteRateProvider(id);
}

