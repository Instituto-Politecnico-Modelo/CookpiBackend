//import fs from 'fs';
//import ModeloReceta from '../models/ModeloReceta';
//import { forEachChild } from 'typescript';
import ModeloUsuario from '../models/ModeloUsuario';
import { createHash } from 'crypto';
import jwt, { JwtPayload } from 'jsonwebtoken'
//import nodemailer from 'nodemailer';
//import dotenv from 'dotenv';
import { sendConfirmationEmail, sendPasswordResetEmail } from '../config/mailer';
import crypto from 'crypto'

export  class controllerUsuario{

    static secretKey = "Ensaladardamal"

    static hashSHA256(data: string): string {

        return createHash('sha256').update(data).digest('hex');
    }


    static generarJWT(payload: any): string {
        const token = jwt.sign(payload, controllerUsuario.secretKey);
        return token;
    }



    static async enivarCorreoPassword(mail : string){
        const usuario = await ModeloUsuario.findOne({ where: { mail: mail } });
        
        if (usuario){
            
            const token = usuario.tokenConfirmacion;
            if (token != undefined){
                controllerUsuario.recuperarContraseña(mail, token)
            }
        }
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
            const tokenConfirmacion = crypto.randomBytes(32).toString('hex').slice(0, 32)

            body.tokenConfirmacion = tokenConfirmacion;

            const usuario =  await controllerUsuario.crearUsuario(body);

            const payload = {
                "nombre" : usuario.nombre
            }
            
            
            sendConfirmationEmail(body.mail, tokenConfirmacion)

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

    static async updateUsuario(body : any){
        const libro = await ModeloUsuario.update(body, { where : {id : body.id}})
        return libro;
    }


    static async deleteUsuario(body : any){
        const libro = await ModeloUsuario.destroy({ where : {id : body.id}})
        return libro;
    }


    static async recuperarContraseña(mail: string, token: string) {
    
        const usuario = await ModeloUsuario.findOne({ where: { mail } });

        if (usuario) {
            const tokenRecuperacion = usuario.tokenConfirmacion
            sendPasswordResetEmail(mail, token);
        } 

    }

    static async actuaiizarContraseña(token: string, password: string) {
    
    const usuario = await ModeloUsuario.findOne({ where: { tokenConfirmacion: token } });

    if (usuario) {
        const hashedPassword = controllerUsuario.hashSHA256(password);
        await ModeloUsuario.update(
            { password: hashedPassword},
            { where: { tokenConfirmacion: token } }
        );

    }
    }


}
