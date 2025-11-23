import express, { Request, Response } from 'express';
import { controllerUsuario } from '../controllers/controllerUsuario';
import { authenticateToken } from '../middleware/middleware';



export let usuarioRouter = express.Router()


usuarioRouter.get('/:mail' ,authenticateToken ,async (req: Request, res: Response) => {
    try {
        res.send( await controllerUsuario.usuarioPorMail(req.params.mail))
    } catch (error) {
        console.error("Error al obtener usuario por mail:", error);
        res.status(500).send("Error al obtener usuario por mail");
    }
});

usuarioRouter.post('/like',authenticateToken , async (req: Request, res: Response) => {
    try {
        res.send( await controllerUsuario.like(req.body.mail, req.body.recetaId));
    } catch (error) {
        console.error("Error al dar like a la receta:", error);
        res.status(500).send("Error al dar like a la receta");
    }
});

usuarioRouter.delete('/like/:recetaId/:mail',authenticateToken , async (req: Request, res: Response) => {
    try {
        res.send( await controllerUsuario.borrarLike(req.params.mail, +req.params.recetaId));
    } catch (error) {
        console.error("Error al borrar el like de la receta:", error);
        res.status(200).send("Error al borrar el like de la receta:");
    }
});

usuarioRouter.get('/like/:mail/:recetaId' ,authenticateToken ,async (req: Request, res: Response) => {
    try {
        res.send( await controllerUsuario.isYaLikeada(req.params.mail, +req.params.recetaId));
    } catch (error) {
        console.error("Error al verificar si la receta ya fue likeada:", error);
        res.status(500).send("Error al verificar si la receta ya fue likeada");
    }

});
