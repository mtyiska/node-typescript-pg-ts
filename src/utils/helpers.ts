// export const getOffset = (currentPage: number = 1, listPerPage: number) => (currentPage -1) * [listPerPage];
import bcrypt from "bcryptjs"

export const emptyOrRows =(rows:any) => {
    if(!rows) return [];
    return rows;
}



export const getHashedPassword = (password: string) => {
    const saltRounds = 12
    const salt = bcrypt.genSaltSync(saltRounds)
    return bcrypt.hashSync(password, salt)
}