import { Model, Op } from 'sequelize';

import ModeloIngrediente from '../models/ModeloIngrediente';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { link } from 'fs';
import { jwtDecode } from "jwt-decode";

export  class controllerIngrediente{

    static secretKey = "Ensaladardamal"

    static async crearIngrediente(body : any, authHeader: string | undefined){
        if (authHeader){    
            const token = authHeader && authHeader.split(' ')[1];
            console.log(token)
            console.log(jwt.verify(token, this.secretKey))
            console.log("TOKEN: " + jwtDecode(token));
        }

        const ingrediente = await ModeloIngrediente.create(
            body
        );
        
        return ingrediente;

    }

    static async updateIngrediente(body : any){
        
        const ingrediente = await ModeloIngrediente.update(body, { where : {id : body.id}})

        return ingrediente;
    }


    static async deleteIngrediente(id : string){

        return await ModeloIngrediente.destroy({ where : {id : id}})
    
    }


    static async leerIngredientes(pagina : number, busqueda : string, buscar : boolean){

        if (buscar){

            return await ModeloIngrediente.findAll({limit : 5, offset : pagina * 5, where:{nombre : {[Op.like]: "%" + busqueda + "%"}}});    
        
        }

        else{  

            return await ModeloIngrediente.findAll({limit : 5, offset : pagina * 5});
             
        }
    }

}
