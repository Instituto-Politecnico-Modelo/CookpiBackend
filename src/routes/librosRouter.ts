import express, { Request, Response } from 'express';
import { authenticateToken } from '../middleware/middleware';
import { controllerReceta } from '../controllers/controllerReceta';

export let LibroRouter = express.Router()

LibroRouter.post('/' ,async (req: Request, res: Response) => {
    
    console.log(req.body);
    controllerReceta.crearReceta(req.body, req.headers['authorization']);

    
    
});
