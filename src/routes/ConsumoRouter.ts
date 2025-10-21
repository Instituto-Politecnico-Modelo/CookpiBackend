import express, { Request, Response } from 'express';
import { controllerUsuario } from '../controllers/controllerUsuario';

export let consumoRouter = express.Router()


consumoRouter.post('/' ,async (req: Request, res: Response) => {
    
    controllerUsuario.cargarConsumo(req.body)


    console.log(req.body);

});

consumoRouter.get('/:mail',async (req: Request, res: Response) => {

    console.log("_:_:_:_:_:_:_:__:_:_:_")
    console.log(await controllerUsuario.consumoUsuario(req.params.mail))
    console.log("_:_:_:_:_:_:_:__:_:_:_")
    res.send( await controllerUsuario.consumoUsuario(req.params.mail));

});
