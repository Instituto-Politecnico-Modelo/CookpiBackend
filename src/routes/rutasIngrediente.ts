import express, { Request, Response } from 'express';

import { authenticateToken } from '../middleware/middleware';

import { Sequelize, DataTypes } from 'sequelize';

import {controllerIngrediente} from '../controllers/controllerIngrediente';

    export let ingredienteRouter = express.Router()

    ingredienteRouter.post('/', async (req: Request, res: Response) => {
        try {
            res.send(await controllerIngrediente.crearIngrediente(req.body, req.headers['authorization']))
        } catch (error) {
            console.error("Error al crear ingrediente:", error);
            res.status(500).send("Error al crear ingrediente");
        }
    });


    ingredienteRouter.put('/', async (req: Request, res: Response) => {
        try {
            res.send(await controllerIngrediente.updateIngrediente(req.body))
        } catch (error) {
            console.error("Error al actualizar ingrediente:", error);
            res.status(500).send("Error al actualizar ingrediente");
        }
    });

    ingredienteRouter.delete('/:id', async (req: Request, res: Response) => {
        try {
            res.send(await controllerIngrediente.deleteIngrediente(req.params.id))
        } catch (error) {
            console.error("Error al eliminar ingrediente:", error);
            res.status(500).send("Error al eliminar ingrediente");
        }
    });


    ingredienteRouter.get('/:pagina/:busqueda', authenticateToken ,async (req: Request, res: Response) => {
        try {
            res.send(await controllerIngrediente.leerIngredientes(+req.params.pagina, req.params.busqueda, true))
        } catch (error) {
            console.error("Error al leer ingredientes:", error);
            res.status(500).send("Error al leer ingredientes");
        }
    });

    ingredienteRouter.get('/:pagina' ,async (req: Request, res: Response) => {
        try {
            res.send(await controllerIngrediente.leerIngredientes(+req.params.pagina, "nada", false))
        } catch (error) {
            console.error("Error al leer ingredientes:", error);
            res.status(500).send("Error al leer ingredientes");
        }
    });

    ingredienteRouter.get('/' ,async (req: Request, res: Response) => {
        try {
            res.send(await controllerIngrediente.leerIngredientes(-1, "nada", false))
        } catch (error) {
            console.error("Error al leer ingredientes:", error);
            res.status(500).send("Error al leer ingredientes");
        }
    });