import express, { Request, Response } from 'express';

import { Sequelize, DataTypes } from 'sequelize';


    export let signUpRouter = express.Router()

    import { controllerUsuario } from '../controllers/controllerUsuario';
import ModeloUsuario from '../models/ModeloUsuario';


    signUpRouter.post('/',async (req: Request, res: Response) => {
        

        res.send(await controllerUsuario.signUp(req.body))
    });

    signUpRouter.get('/confirmar/:token',async (req: Request, res: Response) => {

        const token = req.params.token

        ModeloUsuario.update({confirmado : true}, {where : {tokenConfirmacion : token}})

    });
