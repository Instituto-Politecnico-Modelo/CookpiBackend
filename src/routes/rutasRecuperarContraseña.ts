import express, { Request, Response } from 'express';

import { Sequelize, DataTypes } from 'sequelize';


    export let recuperarContraseñaRouter = express.Router()

    import { controllerUsuario } from '../controllers/controllerUsuario';
    
    import ModeloUsuario from '../models/ModeloUsuario';


    recuperarContraseñaRouter.post('/cambiar',async (req: Request, res: Response) => {
        try {       
            console.log(req.body);
            res.send(await controllerUsuario.actuaiizarContraseña(req.body.token, req.body.password))
        } catch (error) {
            console.log(error);
            res.status(500).send("Error al cambiar contraseña");
        }

    });

    recuperarContraseñaRouter.post('/',async (req: Request, res: Response) => {  
        try {     
            const resp = await controllerUsuario.enivarCorreoPassword(req.body.mail);
            res.send(resp)
        } catch (error:any) {
            res.status(500).send(error.message);
        }

    });
