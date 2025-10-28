import express, { Request, Response } from 'express';
import { controllerUsuario } from '../controllers/controllerUsuario';
import { authenticateToken } from '../middleware/middleware';

export let consumoRouter = express.Router()


consumoRouter.post('/' ,async (req: Request, res: Response) => {
    
    controllerUsuario.cargarConsumo(req.body)


    console.log(req.body);

});

consumoRouter.get('/:mail',async (req: Request, res: Response) => {

    res.send( await controllerUsuario.consumoUsuario(req.params.mail));

});


consumoRouter.delete('/:mail/:recetaId' ,authenticateToken ,async (req: Request, res: Response) => {

    console.log("MAAAAAAAAIL: " + req.params.mail)
    res.send( await controllerUsuario.borrarConsumoUsuario(req.params.mail, +req.params.recetaId))
    
});
