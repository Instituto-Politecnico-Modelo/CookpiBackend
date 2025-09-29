import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwtDecode } from "jwt-decode";
import ModeloReceta from '../models/ModeloReceta';
import ModeloLibroReceta from '../models/ModeloLibroReceta';

export class controllerLibro{

    static secretKey = "Ensaladardamal"

    static async crearLibro(body : any, authHeader: string | undefined){


        console.log("hola");

        if (authHeader){    
            const token = authHeader && authHeader.split(' ')[1];
            console.log(token)
            console.log(jwt.verify(token, this.secretKey))
            console.log("TOKEN: " + jwtDecode(token));
        }
        

        const payload = jwt.verify(body.token, this.secretKey)
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA::::::::::: " + (payload as JwtPayload).mail)
        const mail = (payload as JwtPayload).mail
        
        body["mail"] = mail;

        const Libro = ModeloLibroReceta.create(body)

        return Libro;
    }
}