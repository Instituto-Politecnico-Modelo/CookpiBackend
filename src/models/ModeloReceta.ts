

import { BelongsToMany, DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import ModeloLibro from './ModeloLibroReceta';
import ModeloIngrediente from './ModeloIngrediente';
import ModeloCategoria from './Dieta';
import Dieta from './Dieta';
import RecetaIngredienteModel from './RecetaIngredienteModel';

class ModeloReceta extends Model {

    public id!: number;

    public nombre!: string;

    //public cantEstrellas!: number;

    public descripcion!: string;

    public procedimiento!: string;

    //public imagen!: string;

    //public tiempo!: number;

    public calorias!: number;
    
    public carbohidratos!: number;

    public proteinas!: number;

    public grasas!: number;

    public momentoDelDia!: string;

    //public dieta!: Dieta;

}


ModeloReceta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    procedimiento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calorias: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    proteinas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    carbohidratos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    grasas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    momentoDelDia: {
      type: DataTypes.STRING,
      allowNull: true,  
    }

  },
  {
    sequelize,
    modelName: 'Receta',
  }
);


ModeloReceta.belongsToMany(ModeloIngrediente, {

    through: RecetaIngredienteModel,

    foreignKey: 'recetaId',

    otherKey: 'ingredienteId',

});

ModeloIngrediente.belongsToMany(ModeloReceta, {
  through: RecetaIngredienteModel,
  foreignKey: 'ingredienteId',
  otherKey: 'recetaId',
});




export default ModeloReceta;