//import fs from 'fs';
//import ModeloReceta from '../models/ModeloReceta';
//import { forEachChild } from 'typescript';
//import nodemailer from 'nodemailer';
//import dotenv from 'dotenv';
           
import { jwtDecode } from "jwt-decode";
import ModeloUsuario from '../models/ModeloUsuario';

import { createHash } from 'crypto';

import jwt, { JwtPayload } from 'jsonwebtoken';

import { sendConfirmationEmail, sendPasswordResetEmail } from '../config/mailer';
import { Sequelize } from "sequelize";
import UsuarioRecetaModel from "../models/ModeloUsuarioReceta";
import crypto from 'crypto';
import { error } from 'console';
import Mail from "nodemailer/lib/mailer";
import ModeloReceta from "../models/ModeloReceta";
import LikeModel from "../models/ModeloLike";

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

        let respuesta = {"error":false, "mensaje" : ""}

        
        const usuarioAnt = await ModeloUsuario.findOne(

            {where : {mail :body.mail}}

        );         

        if (!usuarioAnt){

            const tokenConfirmacion = crypto.randomBytes(32).toString('hex').slice(0, 32)

            body.reqCalorico = (body.peso * 10) + (6.25 * body.altura) - 5 * body.edad - 161;
    
            body.tokenConfirmacion = tokenConfirmacion;

            const usuario =  await controllerUsuario.crearUsuario(body);

            const payload = {

                "mail" : usuario.mail

            }
            
            sendConfirmationEmail(body.mail, tokenConfirmacion)
            respuesta.mensaje = controllerUsuario.generarJWT(payload)
            return respuesta
        }
        else{

            respuesta.error = true;
            respuesta.mensaje = "Ya existe un usuario con ese correo electrónico.";
            return respuesta;

        }

    }

    static async login(body : any){


        let respuesta = {"error":false, "mensaje" : ""}

        const usuario = await ModeloUsuario.findOne(

            {where : {nombre : body.nombre}}

        )

        if (usuario){

            if (controllerUsuario.hashSHA256(body.password) == usuario.password){                     
                
                const payload = {

                    "mail" : usuario.mail      

                }
                
                respuesta.mensaje = controllerUsuario.generarJWT(payload)
                return respuesta

            }

            else{

                respuesta.error = true
                respuesta.mensaje = "Contraseña incorrecta"
                return respuesta
            }
        }else{

            respuesta.error = true
            respuesta.mensaje = "Ese usuario no existe"
            return respuesta

        }

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
            {where : {mail : (payload as JwtPayload).mail}}
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

        const payload = {

            "mail" : usuario.mail
    
        }

        const hashedPassword = controllerUsuario.hashSHA256(password);
        
        await ModeloUsuario.update(
            { password: hashedPassword, tokenConfirmacion: this.generarJWT(payload)},
            { where: { tokenConfirmacion: token } }
        ); 

    }
}


    static async mailPorToken(authHeader : string | undefined){

        let token : string = ""


        if (authHeader){    
            token = authHeader && authHeader.split(' ')[1];
            console.log(token)
            console.log(jwt.verify(token, this.secretKey))
            console.log("TOKEN: " + jwtDecode(token));
        }
        const payload = jwt.verify(token, this.secretKey)
        const mailPre = (payload as JwtPayload).mail
        const mail = mailPre.split("@")[0];
        return mail;
    }

    static async usuarioPorMail(mail : string){
                
        mail = mail + "@gmail.com"

        return await ModeloUsuario.findOne({where : {mail : mail}})


    }


    static async cargarConsumo(body : any){
        console.log("N H E")
        UsuarioRecetaModel.create({recetaId : body.idReceta, mail : body.mail + "@gmail.com"})
        console.log("N A S H E")

    }
    static async consumoUsuario(mail: string){

        mail = mail + "@gmail.com"

        let consumos : any[] = [];

        const respConsumo = await UsuarioRecetaModel.findAll({where : {mail : mail}})
    
        for (let i = 0; i < respConsumo.length; i++) {
            consumos.push(respConsumo[i].recetaId)
        }

        let recetasData : {id: number, nombre : string, momentoDelDia : string, calorias : number}[] = []

        for (let i = 0; i < consumos.length; i++) {
        
        let infoReceta = await ModeloReceta.findOne({where : {id : consumos[i]}})
        
        if (infoReceta != null){
            recetasData[i] = {id: infoReceta.id, nombre: infoReceta.nombre, momentoDelDia : infoReceta.momentoDelDia, calorias : infoReceta.calorias};
        }
    
    }

        return recetasData;
    }

    static async like(mail: string, recetaId : number){
        
        mail = mail + "@gmail.com"

        LikeModel.create({mail : mail, recetaId: recetaId});

        ModeloReceta.update({cantLikes : Sequelize.literal("cantLikes + 1")}, {where : {id : recetaId}})

    }


    static async isYaLikeada(mail: string, recetaId : number){
        
        mail = mail + "@gmail.com"

        const like = await LikeModel.findOne({where : {mail: mail, recetaId : recetaId}})
        if (like != null){
            return true
        }
        else{
            return false
        }

    }
    static async borrarConsumoUsuario(mail: string, recetaId : number){

        mail = mail + "@gmail.com"

        const respConsumo = await UsuarioRecetaModel.destroy({where : {mail : mail, recetaid : recetaId}})


    }




}
