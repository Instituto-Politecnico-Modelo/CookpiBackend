import express, { Request, Response } from 'express';
import { authenticateToken } from '../middleware/middleware';
import { controllerReceta } from '../controllers/controllerReceta';

export let RecetaRouter = express.Router()

RecetaRouter.post('/' ,async (req: Request, res: Response) => {
    
    console.log(req.body);
    controllerReceta.crearReceta(req.body, req.headers['authorization']);
    
});


RecetaRouter.get('/:id', async (req: Request, res: Response) => {
    
    const respuestaBack = await controllerReceta.obtenerReceta(req.params.id);
    if (respuestaBack != null){
        res.send(respuestaBack)
    }
    else{
        res.status(405).send("Receta no encontrada")
    }



});