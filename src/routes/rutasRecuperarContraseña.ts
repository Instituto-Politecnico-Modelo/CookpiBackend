import express, { Request, Response } from 'express';

import { Sequelize, DataTypes } from 'sequelize';


    export let recuperarContraseñaRouter = express.Router()

    import { controllerUsuario } from '../controllers/controllerUsuario';
import ModeloUsuario from '../models/ModeloUsuario';


    recuperarContraseñaRouter.post('/cambiar',async (req: Request, res: Response) => {
        res.send(controllerUsuario.actuaiizarContraseña(req.body.token, req.body.password))
    });

    recuperarContraseñaRouter.post('/',async (req: Request, res: Response) => {        
        controllerUsuario.enivarCorreoPassword(req.body.mail)
    });
