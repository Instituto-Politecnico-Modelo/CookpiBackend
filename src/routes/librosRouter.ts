import express, { Request, Response } from 'express';
import { authenticateToken } from '../middleware/middleware';
import { controllerReceta } from '../controllers/controllerReceta';
import { controllerLibro } from '../controllers/controllerLibroReceta';
import ModeloLibro from '../models/ModeloLibroReceta';
import LibroRecetaModel from '../models/LibroReceta';
import { where } from 'sequelize';

export let LibroRouter = express.Router()

LibroRouter.post('/' ,async (req: Request, res: Response) => {
    
    console.log(req.body);
    controllerLibro.crearLibro(req.body, req.headers['authorization']);

});

LibroRouter.get('/porid/:id' ,async (req: Request, res: Response) => {

    res.send(await ModeloLibro.findOne({where:{id : req.params.id}}))
   
});

LibroRouter.get('/recetas/:id' ,async (req: Request, res: Response) => {

    res.send(await controllerLibro.recetasDeLibro(req.params.id))
   
});



LibroRouter.get('/pormail/:mail' ,async (req: Request, res: Response) => {
    
    res.send(await ModeloLibro.findAll({where:{mail : req.params.mail + "@gmail.com"}}))
    
});


LibroRouter.post('/agregarReceta' ,async (req: Request, res: Response) => {
    
    console.log(req.body);

    controllerLibro.agregarReceta(req.body);

});



