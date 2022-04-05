import * as db from 'zapatos/db';
import type * as s from 'zapatos/schema';
import {pool} from '../../db';

export const getAllUsersProvider = async () =>{
    return await db.sql<s.sessionusers.SQL, s.sessionusers.Selectable[]>`
    SELECT  * FROM ${"sessionusers"}`.run(pool);
}

export const getUserByIdProvider = async (id:string) =>{
    return await db.sql<s.sessionusers.SQL, s.sessionusers.Selectable[]>`
    SELECT * FROM ${"sessionusers"} WHERE ${{id: Number(id)}}`.run(pool);
}

export const getUserByEmailProvider = async (email:string) =>{
    return await db.sql<s.sessionusers.SQL, s.sessionusers.Selectable[]>`
    SELECT * FROM ${"sessionusers"} WHERE ${{email: email}}`.run(pool);
}

export const addUserProvider = async (user:s.sessionusers.Insertable) => {
    const createdUser: s.sessionusers.Insertable = {
        email: user.email,
        password: user.password
    }
    return await db.sql<s.sessionusers.SQL, s.sessionusers.Insertable[]>`
      INSERT INTO ${"sessionusers"} 
      (${db.cols(createdUser)})
      VALUES (${db.vals(createdUser)}) RETURNING *`
    .run(pool);
}

export const updateUserProvider = async (id:string, data:s.sessionusers.Updatable) =>{
    const query = updateUserByID(id, data);
    const colValues = Object.values(data)
    return await pool.query(query, colValues);
}


export const deleteUserProvider = async (id:string) =>{
    return db.sql<s.sessionusers.SQL, s.sessionusers.Updatable[]>`
    DELETE FROM ${"sessionusers"}
    WHERE ${{ id:Number(id) }}`.run(pool);
}



function updateUserByID (id:string, cols:s.sessionusers.Updatable) {
    const query = ['UPDATE sessionusers'];
    query.push('SET');
  
    const set:any = [];
    Object.keys(cols).forEach(function (key, i) {
      set.push(key + ' = $' + (i + 1) + ''); 
    });
    query.push(set.join(', '));
    query.push('WHERE id = ' + id );
  
    return query.join(' ');
  }




