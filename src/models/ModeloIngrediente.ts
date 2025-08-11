import { BelongsToMany, DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import RecetaIngredienteModel from './RecetaIngredienteModel';
import ModeloReceta from './ModeloReceta';
import ModeloUsuario from './ModeloUsuario';

class ModeloIngrediente extends Model {

    public nombre!: string;
    public calorias! : number;
    public carbohidratos!: number;
    public grasas!: number;
    public proteinas!: number;
    public usuarioId!: number | null; 
}   

ModeloIngrediente.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calorias: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    carbohidratos: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    grasas: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    proteinas: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: true, 

      references: {
        model: 'usuario', 
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Ingrediente',

  }
  );
  
  ModeloIngrediente.belongsTo(ModeloUsuario, {
    foreignKey: 'usuarioId',
    as: 'usuario', 
  });
/*
ModeloIngrediente.belongsToMany(ModeloReceta, {
  through: RecetaIngredienteModel,
  foreignKey: 'ingredienteId',
  otherKey: 'recetaId',
});
*/

  export default ModeloIngrediente;