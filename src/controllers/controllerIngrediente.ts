import { Model, Op } from 'sequelize';

import ModeloIngrediente from '../models/ModeloIngrediente';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { link } from 'fs';
import { jwtDecode } from "jwt-decode";
import { any } from '@tensorflow/tfjs';

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







    static async obtenerAlimentosPopulares(): Promise<{ nombre: string, codigo: string }[]> {
    const url = 'https://ar.openfoodfacts.org/products.json?sort_by=popularity';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error en la respuesta: ${response.status}`);
        }

        const data = await response.json();
        const productos = data.products;

        const lista = productos
            .filter((p: any) => p.product_name && p.code) // asegurarse de que tengan nombre y código
            .map((p: any) => ({
                nombre: p.product_name,
                codigo: p.code
            }));


lista.forEach((producto: {nombre:string, codigo: string}) => {
    ModeloIngrediente.create({
        nombre: producto.nombre,
        codigo: producto.codigo
    });
});



            console.log(lista);

        return lista;
    } catch (error) {
        console.error('Error al obtener alimentos populares:', error);
        throw new Error('No se pudieron obtener los alimentos populares');
    }
}














static async obtenerCaloriasPorBarcode(barcode: string): Promise<number | null> {
  const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error al consultar el producto: ${response.status}`);
    }

    const data = await response.json();

    if (!data.product || !data.product.nutriments || data.status === 0) {
      console.warn('Producto no encontrado o sin datos nutricionales.');
      return null;
    }

    const calorias = data.product.nutriments['energy-kcal'] ?? null;

    return calorias;
  } catch (error) {
    console.error(`Error al obtener calorías del producto ${barcode}:`, error);
    return null;
  }
}



}
