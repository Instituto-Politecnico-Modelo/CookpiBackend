import express, { Request, Response } from 'express';

import { Sequelize, DataTypes } from 'sequelize';

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
export let loginRouter = express.Router()

import { controllerUsuario } from '../controllers/controllerUsuario';
import { controllerIngrediente } from '../controllers/controllerIngrediente';

    loginRouter.post('/', async (req: Request, res: Response) => {
        

        console.log("Calorias: " + await controllerIngrediente.obtenerCaloriasPorBarcode("7622201735906"));
        console.log("Proteínas: " + await controllerIngrediente.obtenerProteinasPorBarcode("7622201735906"));
        console.log("Carbohidratos: " + await controllerIngrediente.obtenerCarbohidratosPorBarcode("7622201735906"));
        console.log("Grasas: " + await controllerIngrediente.obtenerGrasasPorBarcode("7622201735906"));

        const respuestaBack = await controllerUsuario.login(req.body)


        if(respuestaBack.error){

            res.status(405).send(respuestaBack.mensaje)

        }
        else{
        
            res.status(200).send(respuestaBack.mensaje)

        }
    
    });
