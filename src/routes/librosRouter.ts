import express, { Request, Response } from 'express';
import { authenticateToken } from '../middleware/middleware';
import { controllerReceta } from '../controllers/controllerReceta';
import { controllerLibro } from '../controllers/controllerLibroReceta';
import ModeloLibro from '../models/ModeloLibroReceta';
import LibroRecetaModel from '../models/LibroReceta';
import { where } from 'sequelize';

export let LibroRouter = express.Router()

LibroRouter.post('/', authenticateToken ,async (req: Request, res: Response) => {
    try {       
        console.log(req.headers['authorization']);
        res.send(await controllerLibro.crearLibro(req.body, req.headers['authorization']));
    } catch (error) {
        console.error("Error al crear libro:", error);
        res.status(500).send("Error al crear libro");
    }
});

LibroRouter.get('/porid/:id' ,authenticateToken ,async (req: Request, res: Response) => {
    try {
        res.send(await ModeloLibro.findOne({where:{id : req.params.id}}))
    } catch (error) {
        res.status(500).send("Error al obtener libro por ID");
    }
});

LibroRouter.get('/recetas/:id' ,authenticateToken ,async (req: Request, res: Response) => {
    try {
        res.send(await controllerLibro.recetasDeLibro(req.params.id, req.headers['authorization'] as string));
    } catch (error) {
        res.status(500).send("Error al obtener recetas de libro");
    }
});



LibroRouter.get('/' ,authenticateToken ,async (req: Request, res: Response) => {
    try {
        res.send(await controllerLibro.librosDeUsuario(req.headers['authorization'] as string));
    } catch (error) {
        console.error("Error al obtener libros por mail:", error);
         res.status(500).send("Error al obtener libros por mail");
    }
});


LibroRouter.post('/agregarReceta', authenticateToken ,async (req: Request, res: Response) => {
    
    
    try {       
        res.send(await controllerLibro.agregarReceta(req.body, req.headers['authorization'] as string));
    } catch (error) {
        console.error("Error al agregar receta al libro:", error);
        res.status(500).send("Error al agregar receta al libro");
    }

});

LibroRouter.delete('/eliminarReceta/:idLibro/:idReceta' ,async (req: Request, res: Response) => {
    try {       
        res.send(await controllerLibro.eliminarReceta(+req.params.idLibro, +req.params.idReceta, req.headers['authorization'] as string));
    } catch (error) {
        console.error("Error al eliminar receta del libro:", error);
        res.status(500).send(error);
    }
});

LibroRouter.delete('/:idLibro' ,async (req: Request, res: Response) => {
    try {       
        res.send(await controllerLibro.eliminarLibro(+req.params.idLibro, req.headers['authorization'] as string));
    } catch (error) {
        res.status(500).send(error);
    }
});


LibroRouter.get('/verificarPropiedad/:idLibro' ,async (req: Request, res: Response) => {

    try {
        res.send(await controllerLibro.verificarPropiedad(+req.params.idLibro, req.headers['authorization'] as string));
    } catch (error) {
        res.status(500).send(error);
    }
    
});


LibroRouter.put('/:id' ,async (req: Request, res: Response) => {

    try {
        res.send(await controllerLibro.modificarLibro(+req.params.id, req.body, req.headers['authorization'] as string));
    } catch (error) {
        res.status(500).send(error);
    }
    
});



 