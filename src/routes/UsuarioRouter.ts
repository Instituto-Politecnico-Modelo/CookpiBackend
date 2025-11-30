import express, { Request, Response } from 'express';
import { controllerUsuario } from '../controllers/controllerUsuario';
import { authenticateToken } from '../middleware/middleware';



export let usuarioRouter = express.Router()


usuarioRouter.get('/' ,authenticateToken ,async (req: Request, res: Response) => {
    try {
        res.send( await controllerUsuario.usuarioPorMail(req.headers['authorization'] as string));
    } catch (error) {
        console.error("Error al obtener usuario por mail:", error);
        res.status(500).send("Error al obtener usuario por mail");
    }
});

usuarioRouter.post('/like',authenticateToken , async (req: Request, res: Response) => {
    try {
        res.send( await controllerUsuario.like(req.headers['authorization'] as string, req.body.recetaId));
    } catch (error) {
        console.error("Error al dar like a la receta:", error);
        res.status(500).send("Error al dar like a la receta");
    }
});

usuarioRouter.delete('/like/:recetaId/',authenticateToken , async (req: Request, res: Response) => {
    try {
        res.send( await controllerUsuario.borrarLike(req.headers['authorization'] as string, +req.params.recetaId));
    } catch (error) {
        console.error("Error al borrar el like de la receta:", error);
        res.status(200).send("Error al borrar el like de la receta:");
    }
});

usuarioRouter.get('/like/:recetaId' ,authenticateToken ,async (req: Request, res: Response) => {
    try {
        res.send( await controllerUsuario.isYaLikeada(req.headers['authorization'] as string, +req.params.recetaId));
    } catch (error) {
        console.error("Error al verificar si la receta ya fue likeada:", error);
        res.status(500).send("Error al verificar si la receta ya fue likeada");
    }

    
});

usuarioRouter.get('/nombrePorMail/:mail' ,authenticateToken ,async (req: Request, res: Response) => {
    try {
        console.log("Mail recibido:", req.params.mail);
        res.send( await controllerUsuario.nombrePorMail(req.params.mail));
    } catch (error) {
        console.error("Error al verificar si la receta ya fue likeada:", error);
        res.status(500).send("Error al verificar si la receta ya fue likeada");
    }    
});

usuarioRouter.get('/verificado', authenticateToken ,async (req: Request, res: Response) => {
    try {
        res.send( await controllerUsuario.verificado(req.headers['authorization'] as string));
    } catch (error) {
        console.error("Error al verificar si la receta ya fue likeada:", error);
        res.status(500).send("Error al verificar si la receta ya fue likeada");
    }    
});

usuarioRouter.post('/reenviarverificacion', authenticateToken, async (req: Request, res: Response) => {
    try {
        res.send(await controllerUsuario.reenviarVerificacion(req.headers['authorization'] as string));
    } catch (error) {
        console.error("Error al reenviar correo de verificación:", error);
        res.status(500).send("Error al reenviar correo de verificación");
    }
});
