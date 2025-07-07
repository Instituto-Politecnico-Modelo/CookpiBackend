import express, { Request, Response } from 'express';

import { Sequelize, DataTypes } from 'sequelize';


export let signUpRouter = express.Router()

import { controllerUsuario } from '../controllers/controllerUsuario';

import ModeloUsuario from '../models/ModeloUsuario';


    signUpRouter.post('/',async (req: Request, res: Response) => {
        
        console.log(req.body)
        
        const respuestaBack = await controllerUsuario.signUp(req.body)

        if(respuestaBack.error){

            res.status(405).send(respuestaBack.mensaje)

        }
        else{

            res.send(respuestaBack.mensaje)

        }
    
    });

    signUpRouter.get('/confirmar/:token',async (req: Request, res: Response) => {
        
        const token = req.params.token

        ModeloUsuario.update({confirmado : true}, {where : {tokenConfirmacion : token}})

    });
