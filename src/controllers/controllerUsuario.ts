import fs from 'fs';
import ModeloReceta from '../models/ModeloReceta';
import { forEachChild } from 'typescript';
import ModeloUsuario from '../models/ModeloUsuario';
import { createHash } from 'crypto';
import jwt, { JwtPayload } from 'jsonwebtoken'



export  class controllerUsuario{
    
    static secretKey = "Ensaladardamal"

    static hashSHA256(data: string): string {

        return createHash('sha256').update(data).digest('hex');
    }


    static generarJWT(payload: any): string {
        const token = jwt.sign(payload, controllerUsuario.secretKey);
        return token;
    }


    static async crearUsuario(body : any){
        
        body.password = controllerUsuario.hashSHA256(body.password)
        const usuario = await ModeloUsuario.create(
            body
        );
        
        return usuario;
    }

    static async signUp(body : any){

        const usuarioAnt = await ModeloUsuario.findOne(
            {where : {nombre :body.nombre}}
        );

        if (!usuarioAnt){

            const usuario =  await controllerUsuario.crearUsuario(body);

            const payload = {
                "nombre" : usuario.nombre
            }

            return controllerUsuario.generarJWT(payload)
        }
        else{
            console.log(usuarioAnt)
        }

    }

    static async login(body : any){

        const usuario = await ModeloUsuario.findOne(
            {where : {nombre : body.nombre}}
        )
        if (usuario){
            if (controllerUsuario.hashSHA256(body.password) == usuario.password){
                
                const payload = {
                    "nombre" : usuario.nombre
                }
                
                return controllerUsuario.generarJWT(payload)

            }
        }
        return null
    }


    static async autenticar(token : any) : Promise<boolean>{
        let payload = null
        try{
            payload = jwt.verify(token, this.secretKey)
        }
        catch{
            return false
        }



        const usuario = await ModeloUsuario.findOne(
            {where : {nombre : (payload as JwtPayload).nombre}}
        )
        
        if (usuario){
            return true
        }
        else{
            return false
        }
    
    }



}
