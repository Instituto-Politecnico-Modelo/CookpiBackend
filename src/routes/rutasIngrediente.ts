import express, { Request, Response } from 'express';

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


    ingredienteRouter.get('/:pagina', async (req: Request, res: Response) => {
        
        res.send(await controllerIngrediente.leerIngredientes(+req.params.pagina))
    });