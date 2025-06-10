import { Model } from 'sequelize';
import ModeloIngrediente from '../models/ModeloIngrediente';

export  class controllerIngrediente{

    static async crearIngrediente(body : any){
        
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


    static async leerIngredientes(pagina : number){
        console .log("Leyendo ingredientes")
        console.log(ModeloIngrediente.findAll({limit : 10}))
        return await ModeloIngrediente.findAll({limit : 5, offset : pagina * 5});    
    }


}
