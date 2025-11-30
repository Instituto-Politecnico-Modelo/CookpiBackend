import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwtDecode } from "jwt-decode";
import ModeloReceta from '../models/ModeloReceta';
import ModeloIngrediente from '../models/ModeloIngrediente';
import { controllerIngrediente } from './controllerIngrediente';
import RecetaIngredienteModel from '../models/RecetaIngredienteModel';
import LibroRecetaModel from '../models/LibroReceta';
import { Model, Op } from 'sequelize';
import IngredienteModel from '../models/ModeloIngrediente';
import { controllerUsuario } from './controllerUsuario';
import { error } from 'console';

export class controllerReceta{

    static secretKey = "Ensaladardamal"

    static async crearReceta(body : any, authHeader: string){
        
        let usuarioMail: string = "";
        
            
        const token = authHeader && authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, this.secretKey) as JwtPayload;
            usuarioMail = decoded.mail || decoded.sub;
            console.log("Usuario creador:", usuarioMail);
             console.log("###############");
        
            body["calorias"] = 0
            body["proteinas"] = 0
            body["grasas"] = 0
            body["carbohidratos"] = 0
        
        
            body["usuarioCreadorId"] = usuarioMail;
        

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
    
        const receta = await ModeloReceta.create(
            body
        );

        let tablaIntermedia = {"recetaId" : receta.id, ingredienteId:"", cantidad:0}
        
        for (const ingrediente of body.ingredientes) {

            tablaIntermedia.ingredienteId = ingrediente.codigo;
            tablaIntermedia.cantidad = ingrediente.cantidad;
            RecetaIngredienteModel.create(tablaIntermedia);

        }

        return receta.id;
        } catch (error) {
            console.error("Error al crear la receta:", error);
        }
        
       

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

        //console.log("pipupipu" + " " + pagina + " " + busqueda + " " + filtro +  " " + buscar)

        
        if (buscar){
            if(filtro == ""){
                return await ModeloReceta.findAll({limit : 6, offset : pagina * 6, where:{nombre : {[Op.like]: "%" + busqueda + "%"}}});    
            }
            else{
                return await ModeloReceta.findAll({limit : 6, offset : pagina * 6, where:{nombre : {[Op.like]: "%" + busqueda + "%"}, dieta : filtro}})
            }
        }
        if (pagina == -1){
            return await ModeloReceta.findAll();            
        }
        else{  
            
            if(filtro == ""){
                return await ModeloReceta.findAll({limit : 6, offset : pagina * 6});
            } 
            else{

                return await ModeloReceta.findAll({limit : 6, offset : pagina * 6, where: {dieta : filtro}});
            }
        }  
    }

    static async obtenerRecomendaciones(kcal: number, pagina: number){
        return await ModeloReceta.findAll({limit : 6, offset : pagina * 6, where:{calorias : {[Op.lte]: kcal}}});
    }

    static async obtenerIngredientesDeReceta(idR : string){
        console.log("ID RECETA EN CONTROLLER: " + idR);
        let ingredientes : number[] = [];
        let cantidades : number[] = [];
        let ingredientesData : {nombre : string, cantidad : number}[] = [];

        const respIngredientes = await RecetaIngredienteModel.findAll({where: {recetaId : parseInt(idR)}})
        
        for (let i = 0; i < respIngredientes.length; i++) {
            ingredientes.push(respIngredientes[i].ingredienteId)
            cantidades.push(respIngredientes[i].cantidad)
        }

        for (let i = 0; i < ingredientes.length; i++) {
            const infoIngrediente = await IngredienteModel.findOne({where: {codigo: ingredientes[i]}})
            if (infoIngrediente) {
                ingredientesData.push({nombre: infoIngrediente.nombre, cantidad: cantidades[i]})
            }
        }

        return ingredientesData;
    }

    static async obtenerRecetaDelDia(){
        const recetas = await ModeloReceta.findAll();
        const indiceAleatorio = Math.floor(Math.random() * recetas.length);
        return recetas[indiceAleatorio];
    }


    static async editarReceta(idReceta : number, body : any, authHeader: string){

        let mail =await controllerUsuario.mailPorToken(authHeader as string);

        const receta = await ModeloReceta.findOne({where: {id : idReceta, usuarioCreadorId : mail }})

        if(receta){
            await ModeloReceta.update(body, {where: {id : idReceta}})
            return "Receta actualizada correctamente";
        }
        else {
            throw new Error("No tienes permiso para editar esta receta");
        }

    }

}