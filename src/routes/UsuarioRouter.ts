import express, { Request, Response } from 'express';
import { controllerUsuario } from '../controllers/controllerUsuario';
import { authenticateToken } from '../middleware/middleware';



export let usuarioRouter = express.Router()


usuarioRouter.get('/:mail' ,authenticateToken ,async (req: Request, res: Response) => {
    
    res.send( await controllerUsuario.usuarioPorMail(req.params.mail))


});

usuarioRouter.post('/like',authenticateToken , async (req: Request, res: Response) => {

    res.send( await controllerUsuario.like(req.body.mail, req.body.recetaId));


});

usuarioRouter.get('/like/:mail/:recetaId' ,authenticateToken ,async (req: Request, res: Response) => {
    
    res.send( await controllerUsuario.isYaLikeada(req.params.mail, +req.params.recetaId))


});

