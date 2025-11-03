import express, { Request, Response } from 'express';
import { controllerUsuario } from '../controllers/controllerUsuario';

export let consumoRouter = express.Router()


consumoRouter.post('/' ,async (req: Request, res: Response) => {
    try {
        await controllerUsuario.cargarConsumo(req.body)
        res.sendStatus(200);
        console.log(req.body);
    } catch (error) {
        console.error("Error al cargar consumo:", error);
        res.status(500).send("Error al cargar consumo");
    }
});

consumoRouter.get('/:mail',async (req: Request, res: Response) => {
    try {
        res.send( await controllerUsuario.consumoUsuario(req.params.mail));
    } catch (error) {
        console.error("Error al obtener consumo del usuario:", error);
        res.status(500).send("Error al obtener consumo del usuario");
    }
});

consumoRouter.delete('/:mail/:idReceta',async (req: Request, res: Response) => {
   try {
        res.send( await controllerUsuario.eliminarConsumo(req.params.mail, +req.params.idReceta));
    } catch (error) {
        console.error("Error al eliminar consumo:", error);
        res.status(500).send("Error al eliminar consumo");
    }
});

consumoRouter.get('/:mail',async (req: Request, res: Response) => {
    try {
        res.send( await controllerUsuario.consumoUsuario(req.params.mail));
    } catch (error) {
        console.error("Error al obtener consumo del usuario:", error);
        res.status(500).send("Error al obtener consumo del usuario");
    }
});

consumoRouter.delete('/:mail/:idReceta',async (req: Request, res: Response) => {

    try {
        res.send( await controllerUsuario.eliminarConsumo(req.params.mail, +req.params.idReceta));
    } catch (error) {
        console.error("Error al eliminar consumo:", error);
        res.status(500).send("Error al eliminar consumo");
    }

});