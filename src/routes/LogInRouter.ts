import express, { Request, Response } from 'express';

import { Sequelize, DataTypes } from 'sequelize';

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
export let loginRouter = express.Router()

import { controllerUsuario } from '../controllers/controllerUsuario';
import { controllerIngrediente } from '../controllers/controllerIngrediente';

    loginRouter.post('/', async (req: Request, res: Response) => {
        const respuestaBack = await controllerUsuario.login(req.body)


        if(respuestaBack.error){

            res.status(405).send(respuestaBack.mensaje)

        }
        else{
        
            res.status(200).send(respuestaBack.mensaje)

        }
    
    });
