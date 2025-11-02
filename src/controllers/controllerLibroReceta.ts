import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwtDecode } from "jwt-decode";
import ModeloReceta from '../models/ModeloReceta';
import ModeloLibroReceta from '../models/ModeloLibroReceta';
import LibroRecetaModel from '../models/LibroReceta';
import { where } from 'sequelize';

export class controllerLibro{

    static secretKey = "Ensaladardamal"

    static async crearLibro(body : any, authHeader: string | undefined){


        

        if (authHeader){    
            const token = authHeader && authHeader.split(' ')[1];
            console.log(token)
            console.log(jwt.verify(token, this.secretKey))
            console.log("TOKEN: " + jwtDecode(token));
        }

        const payload = jwt.verify(body.token, this.secretKey)
        const mail = (payload as JwtPayload).mail
        
        body["mail"] = mail;

        const Libro = await ModeloLibroReceta.create(body)

        return Libro.id;
    }

    static async agregarReceta(body : any){

        const vinculoAnterior = await LibroRecetaModel.findOne({where: {libroId : body.libroId, recetaId : body.recetaId}})
        console.log(vinculoAnterior)
        if(vinculoAnterior == null  ){
            LibroRecetaModel.create(body);
        }
    }

    static async recetasDeLibro(idLibro : string){
    
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

    static async eliminarReceta(idLibro : number, idReceta : number){

        const resp = await LibroRecetaModel.destroy({where : {libroId : idLibro, recetaId : idReceta}});
    }

    static async eliminarLibro(idLibro : number){
        try {       
            await LibroRecetaModel.destroy({where : {libroId : idLibro}});
            const resp = await ModeloLibroReceta.destroy({where : {id : idLibro}});
            return resp;
        } catch (error) {
            console.log(error)
        }   
    }
}