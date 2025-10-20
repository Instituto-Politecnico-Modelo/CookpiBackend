import express, { Request, Response } from 'express';
import { controllerUsuario } from '../controllers/controllerUsuario';

export let usuarioRouter = express.Router()


usuarioRouter.get('/:mail' ,async (req: Request, res: Response) => {
    
    controllerUsuario.usuarioPorMail(req.params.mail)

    console.log(req.body);

});
