import * as db from 'zapatos/db';
import type * as s from 'zapatos/schema';
import {pool} from '../../db';

export const getRatingProvider = async () =>{
    return await db.sql<s.jokes.SQL, s.jokes.Selectable[]>`
    SELECT  * FROM ${"jokes"}`.run(pool);
}

export const getRateByIdProvider = async (id:string) =>{
    return await db.sql<s.jokes.SQL, s.jokes.Selectable[]>`
    SELECT * FROM ${"jokes"} WHERE ${{id: Number(id)}}`.run(pool);
}

export const createRatingProvider = async (rating:s.jokes.Insertable) => {
    const createdJoke: s.jokes.Insertable = {
        joke_id: rating.joke_id, 
        category: rating.category,
        joke: rating.joke!,
        setup: rating.setup!,
        delivery: rating.delivery!,
        rating: rating.rating
    }
  return await db.sql<s.jokes.SQL, s.jokes.Insertable[]>`
      INSERT INTO ${"jokes"} 
      (${db.cols(createdJoke)})
      VALUES (${db.vals(createdJoke)}) RETURNING *`
    .run(pool);
}

export const updateRateProvider = async (id:string, data:s.jokes.Updatable) =>{
    const query = updateRatingByID(id, data);
    const colValues = Object.values(data)
    return await pool.query(query, colValues);
}


export const deleteRateProvider = async (id:string) =>{
    return db.sql<s.jokes.SQL, s.jokes.Updatable[]>`
    DELETE FROM ${"jokes"}
    WHERE ${{ id:Number(id) }}`.run(pool);
}



function updateRatingByID (id:string, cols:s.jokes.Updatable) {
    const query = ['UPDATE jokes'];
    query.push('SET');
  
    const set:any = [];
    Object.keys(cols).forEach(function (key, i) {
      set.push(key + ' = $' + (i + 1) + ''); 
    });
    query.push(set.join(', '));
    query.push('WHERE id = ' + id );
  
    return query.join(' ');
  }




