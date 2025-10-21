import express, { Request, Response } from 'express';
import { authenticateToken } from '../middleware/middleware';
import { controllerReceta } from '../controllers/controllerReceta';
import LikeModel from '../models/ModeloLike';
import { controllerUsuario } from '../controllers/controllerUsuario';

export let RecetaRouter = express.Router()

RecetaRouter.post('/' ,async (req: Request, res: Response) => {
    
    console.log(req.body);
    controllerReceta.crearReceta(req.body, req.headers['authorization']);
    
});

RecetaRouter.get('/recetasPorLibro/:id', async (req: Request, res: Response) => {
    
    const respuestaBack = await controllerReceta.obtenerRecetasPorLibro(req.params.id);
    if (respuestaBack != null){
        res.send(respuestaBack)
    }
    else{
        res.send("")
    }
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

RecetaRouter.get('/pag/:pagina/:busqueda', async (req: Request, res: Response) => {
    
    const respuestaBack = await controllerReceta.obtenerRecetas(+req.params.pagina, req.params.busqueda, true);
    res.send(respuestaBack)
});

RecetaRouter.get('/pag/:pagina', async (req: Request, res: Response) => {
    
    const respuestaBack = await controllerReceta.obtenerRecetas(+req.params.pagina, "", false);
    res.send(respuestaBack)
});


RecetaRouter.post('/like', async (req: Request, res: Response) => {
    
    controllerUsuario.like(req.body.mail, req.body.recetaId);

});

