import express from 'express';
import {createQuote, deleteQuote, getMultipleQuotes, getQuotesById, updateQuote} from './QuoteController';
export const routes = express.Router();

/* GET quotes listing. */
routes.get('/', async function(req: any, res, next) {
  try {
    res.json(await getMultipleQuotes(req.query.page));
  } catch (err:any) {
    console.error(`Error while getting quotes `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});

/* GET quotes byId. */
routes.get('/:id', async function(req:any, res, next) {
    try {
      res.json(await getQuotesById(req.params.id));
    } catch (err:any) {
      console.error(`Error while getting quotes `, err.message);
      res.status(err.statusCode || 500).json({'message': err.message});
    }
  });

/* POST quotes */
routes.post('/', async function(req:any, res, next) {
  try {
    res.json(await createQuote(req.body));
  } catch (err:any) {
    console.error(`Error while posting quotes `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
  
});

/**Update quotes */
routes.put('/:id', async function(req:any, res, next) {
    try {
      res.json(await updateQuote(req.params.id, req.body));
    } catch (err:any) {
      console.error(`Error while posting quotes `, err.message);
      res.status(err.statusCode || 500).json({'message': err.message});
    }
    
});

/**Delete Quotes */
routes.delete('/:id', async function(req, res, next) {
    try {
      res.json(await deleteQuote(req.params.id));
    } catch (err:any) {
      console.error(`Error while posting quotes `, err.message);
      res.status(err.statusCode || 500).json({'message': err.message});
    }
    
});

// module.exports = router;