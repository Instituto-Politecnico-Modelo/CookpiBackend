import express, { Request, Response } from 'express';
import { authenticateToken } from '../middleware/middleware';
import { controllerReceta } from '../controllers/controllerReceta';
import LikeModel from '../models/ModeloLike';
import { controllerUsuario } from '../controllers/controllerUsuario';

export let RecetaRouter = express.Router()

RecetaRouter.post('/' ,async (req: Request, res: Response) => {
    
    console.log(req.body);
    res.send(await controllerReceta.crearReceta(req.body, req.headers['authorization'] as string));

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
    
    const respuestaBack = await controllerReceta.obtenerRecetas(+req.params.pagina, req.params.busqueda, true, "");
    res.send(respuestaBack)
});

RecetaRouter.get('/pag/:pagina', async (req: Request, res: Response) => {
    
    const respuestaBack = await controllerReceta.obtenerRecetas(+req.params.pagina, "", false, "");
    res.send(respuestaBack)
});


RecetaRouter.post('/like', async (req: Request, res: Response) => {
    
    controllerUsuario.like(req.body.mail, req.body.recetaId);

});

RecetaRouter.get('/pag/:pagina/:busqueda/:filtro', async (req: Request, res: Response) =>{

    const respuestaBack = await controllerReceta.obtenerRecetas(+req.params.pagina, req.params.busqueda, true, req.params.filtro)
    res.send(respuestaBack)
});

RecetaRouter.get('/pagf/:pagina/:filtro', async (req: Request, res: Response) => {
    const respuestaBack = await controllerReceta.obtenerRecetas(+req.params.pagina, "", false, req.params.filtro);
    res.send(respuestaBack)
});


RecetaRouter.get('/pagr/:kcal/:pagina', async (req: Request, res: Response) => {
    const respuestaBack = await controllerReceta.obtenerRecomendaciones(+req.params.kcal, +req.params.pagina);
    res.send(respuestaBack);
});


RecetaRouter.get("/ingredientes/:id", async (req: Request, res: Response) => {
    
    const respuestaBack = await controllerReceta.obtenerIngredientesDeReceta(req.params.id);
    res.send(respuestaBack);
});
    
RecetaRouter.get("/del/dia", async (req: Request, res: Response) => {
    try {
        const respuestaBack = await controllerReceta.obtenerRecetaDelDia();
        res.send(respuestaBack);
    } catch (error) {
    
        console.error("Error al obtener la receta del día:", error);
        res.status(500).send("Error al obtener la receta del día");
    }
});

RecetaRouter.put("/:id", async (req: Request, res: Response) => {
    try {
        const respuestaBack = await controllerReceta.editarReceta(+req.params.id, req.body, req.headers['authorization'] as string);
        res.send(respuestaBack);
    } catch (error) {
    
        console.error("Error al editar la receta:", error);
        res.status(500).send("Error al editar la receta: " + error);
    }
});