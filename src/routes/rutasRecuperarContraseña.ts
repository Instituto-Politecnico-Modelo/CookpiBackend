import express, { Request, Response } from 'express';

import { Sequelize, DataTypes } from 'sequelize';


    export let recuperarContraseñaRouter = express.Router()

    import { controllerUsuario } from '../controllers/controllerUsuario';
import ModeloUsuario from '../models/ModeloUsuario';


    recuperarContraseñaRouter.post('/:token',async (req: Request, res: Response) => {
    
        const token = req.params.token
        
        res.send(controllerUsuario.actuaiizarContraseña(token, req.body.password))
    });

    recuperarContraseñaRouter.post('/',async (req: Request, res: Response) => {
        
        const usuario = await ModeloUsuario.findOne({ where: { mail: req.body.mail } });
        
        if (usuario){
            
            const token = usuario.tokenConfirmacion;
            if (token != undefined){
                controllerUsuario.recuperarContraseña(req.body.mail, token)
                res.send("Correo enviado")
            }
            else{
                res.status(404).send("Token no encontrado")
            }
        }
        else{
            res.status(404).send("Usuario no encontrado")
        }
    });
