import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwtDecode } from "jwt-decode";
import ModeloReceta from '../models/ModeloReceta';
import ModeloIngrediente from '../models/ModeloIngrediente';
import { controllerIngrediente } from './controllerIngrediente';

export class controllerReceta{

    static secretKey = "Ensaladardamal"

    static async crearReceta(body : any, authHeader: string | undefined){
        

        
        if (authHeader){    
            const token = authHeader && authHeader.split(' ')[1];
            console.log(token)
            console.log(jwt.verify(token, this.secretKey))
            console.log("TOKEN: " + jwtDecode(token));
        }
        console.log("###############");
        const receta = await ModeloReceta.create(
            body
        );
        
        return receta;

    }
}