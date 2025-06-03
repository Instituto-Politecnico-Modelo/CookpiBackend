import express, { Request, Response } from 'express';

import { Sequelize, DataTypes } from 'sequelize';

import { sendConfirmationEmail } from '../config/mailer';
    export let signUpRouter = express.Router()

    import { controllerUsuario } from '../controllers/controllerUsuario';


    signUpRouter.post('/',async (req: Request, res: Response) => {
        
        sendConfirmationEmail(req.body.mail, "token")

        res.send(await controllerUsuario.signUp(req.body))
    });

