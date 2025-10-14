import express, { Request, Response } from 'express';
import { controllerUsuario } from '../controllers/controllerUsuario';

export let consumoRouter = express.Router()


consumoRouter.post('/' ,async (req: Request, res: Response) => {
    
    controllerUsuario.cargarConsumo(req.body)


    console.log(req.body);

});
