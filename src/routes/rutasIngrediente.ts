import express, { Request, Response } from 'express';

import { authenticateToken } from '../middleware/middleware';

import { Sequelize, DataTypes } from 'sequelize';

import {controllerIngrediente} from '../controllers/controllerIngrediente';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    export let ingredienteRouter = express.Router()

    ingredienteRouter.post('/', async (req: Request, res: Response) => {
        
        console.log(req.body)

        res.send(await controllerIngrediente.crearIngrediente(req.body))
    });


    ingredienteRouter.put('/', async (req: Request, res: Response) => {
        
        res.send(await controllerIngrediente.updateIngrediente(req.body))
    });

    ingredienteRouter.delete('/:id', async (req: Request, res: Response) => {
        
        res.send(await controllerIngrediente.deleteIngrediente(req.params.id))
    });


    ingredienteRouter.get('/:pagina/:busqueda', authenticateToken ,async (req: Request, res: Response) => {
        res.send(await controllerIngrediente.leerIngredientes(+req.params.pagina, req.params.busqueda, true))
    });

    ingredienteRouter.get('/:pagina', authenticateToken ,async (req: Request, res: Response) => {
        res.send(await controllerIngrediente.leerIngredientes(+req.params.pagina, "nada", false))
    });