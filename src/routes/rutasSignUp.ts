import express, { Request, Response } from 'express';

import { Sequelize, DataTypes } from 'sequelize';
import { controllerIngrediente } from '../controllers/controllerIngrediente';

export let signUpRouter = express.Router()

import { controllerUsuario } from '../controllers/controllerUsuario';

import ModeloUsuario from '../models/ModeloUsuario';


    signUpRouter.post('/',async (req: Request, res: Response) => {

        if(!(await controllerIngrediente.existenIngredientes())){
            controllerIngrediente.obtenerAlimentosPopulares()
        }
        
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
        try {
            const token = req.params.token
            await ModeloUsuario.update({confirmado : true}, {where : {tokenConfirmacion : token}})
            res.send("Usuario confirmado")
        } catch (error) {
            console.error("Error al confirmar usuario:", error);
            res.status(500).send("Error al confirmar usuario");
        }

    });
