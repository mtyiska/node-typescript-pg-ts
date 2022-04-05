import {
addUserProvider,
deleteUserProvider,
getAllUsersProvider,
getUserByEmailProvider,
getUserByIdProvider,
updateUserProvider
} from "./providers/UserProvider"
import { Request } from "express";

export type createUserType = {
    email: string 
    password: string 
}

export const getMultipleUsers = async () =>{
    return getAllUsersProvider();
}

export const getUserById = async (id:string) =>{
    return getUserByIdProvider(id);
}
export const getUserByEmail = async (email:string) =>{
    return getUserByEmailProvider(email);
}

export const createUser = async (user: createUserType) => {
    return addUserProvider(user);
}

export const updateUser = async (id:string, user: createUserType) => {
    return updateUserProvider(id, user);
}

export const deleteUser = async (id:string) => {
    return deleteUserProvider(id);
}

