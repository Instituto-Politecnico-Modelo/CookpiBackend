import { BelongsToMany, DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import RecetaIngredienteModel from './RecetaIngredienteModel';
//import ModeloReceta from './ModeloReceta';
import ModeloUsuario from './ModeloUsuario';

class ModeloIngrediente extends Model {

    public nombre!: string;
    public codigo! : string;
}   

ModeloIngrediente.init(
  {
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,

    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
  {
    sequelize,
    modelName: 'Ingrediente',

  }
);
  


export default ModeloIngrediente;