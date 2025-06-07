import ModeloIngrediente from '../models/ModeloIngrediente';

export  class controllerIngrediente{

    static async crearIngrediente(body : any){
        
        const ingrediente = await ModeloIngrediente.create(
            body
        );
        return ingrediente;
    }

    static async updateIngrediente(body : any){
        const ingrediente = await ModeloIngrediente.update(body, { where : {nombre : body.nombre}})
        return ingrediente;
    }


    static async deleteIngrediente(body : any){
        return await ModeloIngrediente.destroy({ where : {nombre : body.nombre}})
    
    }


}
