

import { BelongsToMany, DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

import ModeloIngrediente from './ModeloIngrediente';
import ModeloCategoria from './Dieta';
import MomentoDelDia from './MomentoDelDia';
import Dieta from './Dieta';
import RecetaIngredienteModel from './RecetaIngredienteModel';

class ModeloReceta extends Model {

    public nombre!: string;

    //public cantEstrellas!: number;

    public descripcion!: string;

    public procedimiento!: string;

    //public imagen!: string;

    //public tiempo!: number;

    //public carbohidratos!: number;

    //public proteinas!: number;

    //public grasas!: number;

    //public momentoDelDia!: MomentoDelDia;

    //public dieta!: Dieta;

}


ModeloReceta.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,

    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    procedimiento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Receta',

  }
);




/*
ModeloReceta.belongsToMany(ModeloIngrediente, {

    through: RecetaIngredienteModel,

    foreignKey: 'recetaId',

    otherKey: 'ingredienteId',

});
*/
export default ModeloReceta;