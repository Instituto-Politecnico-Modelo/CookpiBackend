import express, { Request, Response } from 'express';

import { Sequelize, DataTypes } from 'sequelize';

import { authenticateToken } from '../middleware/middleware';

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
export let checkLoginRouter = express.Router()

    import { controllerUsuario } from '../controllers/controllerUsuario';
     checkLoginRouter.get('/', authenticateToken,async (req: Request, res: Response) => {
        
        res.send(true)
    });