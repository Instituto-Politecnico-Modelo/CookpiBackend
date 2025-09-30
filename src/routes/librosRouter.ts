import express, { Request, Response } from 'express';
import { authenticateToken } from '../middleware/middleware';
import { controllerReceta } from '../controllers/controllerReceta';
import { controllerLibro } from '../controllers/controllerLibroReceta';
import ModeloLibro from '../models/ModeloLibroReceta';

export let LibroRouter = express.Router()

LibroRouter.post('/' ,async (req: Request, res: Response) => {
    
    console.log(req.body);
    controllerLibro.crearLibro(req.body, req.headers['authorization']);
});

LibroRouter.get('/:mail' ,async (req: Request, res: Response) => {

    res.send(await ModeloLibro.findAll({where:{mail : req.params.mail}}))
    
    
});
