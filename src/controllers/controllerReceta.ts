import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwtDecode } from "jwt-decode";
import ModeloReceta from '../models/ModeloReceta';
import ModeloIngrediente from '../models/ModeloIngrediente';
import { controllerIngrediente } from './controllerIngrediente';
import RecetaIngredienteModel from '../models/RecetaIngredienteModel';
import LibroRecetaModel from '../models/LibroReceta';
import { Model, Op } from 'sequelize';

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
        
        body["calorias"] = 0
        body["proteinas"] = 0
        body["grasas"] = 0
        body["carbohidratos"] = 0

        for (const ingrediente of body.ingredientes) {
        const calorias = await controllerIngrediente.obtenerCaloriasPorBarcode(ingrediente.codigo) ?? 0;
        const proteinas = await controllerIngrediente.obtenerProteinasPorBarcode(ingrediente.codigo) ?? 0;
        const grasas = await controllerIngrediente.obtenerGrasasPorBarcode(ingrediente.codigo) ?? 0;
        const carbohidratos = await controllerIngrediente.obtenerCarbohidratosPorBarcode(ingrediente.codigo) ?? 0;

        body.calorias += calorias * ingrediente.cantidad / 100;
        body.proteinas += proteinas * ingrediente.cantidad / 100;
        body.grasas += grasas * ingrediente.cantidad / 100;
        body.carbohidratos  += carbohidratos * ingrediente.cantidad / 100;
    }
    
    console.log(body)
        const receta = await ModeloReceta.create(
            body
        );


        let tablaIntermedia = {"recetaId" : receta.id, ingredienteId:"", cantidad:0}
        


        for (const ingrediente of body.ingredientes) {

            tablaIntermedia.ingredienteId = ingrediente.codigo;
            tablaIntermedia.cantidad = ingrediente.cantidad;
            RecetaIngredienteModel.create(tablaIntermedia);

        }

        return receta;

    }

    static async obtenerRecetasPorLibro(idL : string){

    return await LibroRecetaModel.findAll({where : {idLibro : idL}})

    }


    static async obtenerReceta(idR : string){

        const receta = await ModeloReceta.findOne({where: {id : parseInt(idR)}})
        console.log("YA LO SE   "+ receta?.procedimiento);

        return receta;
        
    }

    static async obtenerRecetas(pagina : number, busqueda : string, buscar : boolean, filtro : string){

        console.log("pipupipu" + " " + pagina + " " + busqueda)

        
        if (buscar){
            if(filtro == ""){
                return await ModeloReceta.findAll({limit : 4, offset : pagina * 4, where:{nombre : {[Op.like]: "%" + busqueda + "%"}}});    
            }
            else{
                return await ModeloReceta.findAll({limit : 4, offset : pagina * 4, where:{nombre : {[Op.like]: "%" + busqueda + "%"}, dieta : filtro}})
            }
        }
        if (pagina == -1){
            return await ModeloReceta.findAll();            
        }
        else{  
            
            if(filtro == ""){
                return await ModeloReceta.findAll({limit : 4, offset : pagina * 4});
            } 
            else{
                console.log("$$$$$$$$$$$$$$:::::::::: " + filtro)
                return await ModeloReceta.findAll({limit : 4, offset : pagina * 4, where: {dieta : filtro}});
            }
        }
        
    }


}