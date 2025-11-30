import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwtDecode } from "jwt-decode";
import ModeloReceta from '../models/ModeloReceta';
import ModeloLibroReceta from '../models/ModeloLibroReceta';
import LibroRecetaModel from '../models/LibroReceta';
import { where } from 'sequelize';
import { controllerUsuario } from './controllerUsuario';

export class controllerLibro{

    static secretKey = "Ensaladardamal"

    static async crearLibro(body : any, authHeader: string | undefined){

        let token : string = "";

        if (authHeader){    
            token = authHeader && authHeader.split(' ')[1];
            console.log(token)
            console.log(jwt.verify(token, this.secretKey))
            console.log("TOKEN: " + jwtDecode(token));
        }

        const payload = jwt.verify(token, this.secretKey)
        const mail = (payload as JwtPayload).mail
        
        body["mail"] = mail;

        const Libro = await ModeloLibroReceta.create(body)

        return Libro.id;
    }

    static async agregarReceta(body : any, token: string){


        if(!await this.verificarPropiedad(body.libroId, token)){
            throw new Error("El libro no pertenece al usuario");
        }
        
        const vinculoAnterior = await LibroRecetaModel.findOne({where: {libroId : body.libroId, recetaId : body.recetaId}})
        console.log(vinculoAnterior)
        if(vinculoAnterior == null  ){
            LibroRecetaModel.create(body);
        }
        return "Receta agregada al libro correctamente";
    }

    static async recetasDeLibro(idLibro : string, token: string){
        
    if(!await this.verificarPropiedad(+idLibro, token)){
        throw new Error("El libro no pertenece al usuario");
    }

    let recetas : number[] = [];
    let recetasData : {id: number, nombre : string, descripcion : string}[] = [];


    const respReceta = await LibroRecetaModel.findAll({where : {libroId : idLibro}})
    
    for (let i = 0; i < respReceta.length; i++) {
        recetas.push(respReceta[i].recetaId)
    }

    for (let i = 0; i < recetas.length; i++) {
        
        let infoReceta = await ModeloReceta.findOne({where : {id : recetas[i]}})
        
        if (infoReceta != null){
            recetasData[i] = {id: infoReceta.id, nombre: infoReceta.nombre, descripcion : infoReceta.descripcion};
        }
    
    }

    return recetasData;

    }

    static async eliminarReceta(idLibro : number, idReceta : number, token: string){
       

        if(!await this.verificarPropiedad(idLibro, token)){
            throw new Error("El libro no pertenece al usuario");
        }

        const resp = await LibroRecetaModel.destroy({where : {libroId : idLibro, recetaId : idReceta}});
    }

    static async eliminarLibro(idLibro : number, token: string){
        try {       
            

            if(!await this.verificarPropiedad(idLibro, token)){
                throw new Error("El libro no pertenece al usuario");
            }

            await LibroRecetaModel.destroy({where : {libroId : idLibro}});
            const resp = await ModeloLibroReceta.destroy({where : {id : idLibro}});
            return resp;
        } catch (error) {
            console.log(error)
        }   
    }

    static async librosDeUsuario(token : string){
        const mail = await controllerUsuario.mailPorToken(token);
        const libros = await ModeloLibroReceta.findAll({where : {mail : mail}})
        return libros;
    }

    static async verificarPropiedad(idLibro: number, token: string) {
        const mail = await controllerUsuario.mailPorToken(token);
        const libro = await ModeloLibroReceta.findOne({ where: { id: idLibro, mail: mail } });
        return libro !== null;
    }


    static async modificarLibro(idLibro: number, body: any, token: string) {
        if(!await this.verificarPropiedad(idLibro, token)){
            throw new Error("El libro no pertenece al usuario");
        }

        const resp = await ModeloLibroReceta.update(body, { where: { id: idLibro } });
        return "Libro modificado correctamente";
    }


}