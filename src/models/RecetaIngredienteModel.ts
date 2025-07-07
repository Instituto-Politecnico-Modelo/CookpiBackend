import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import ModeloIngrediente from './ModeloIngrediente';
import ModeloReceta from './ModeloReceta';

class RecetaIngredienteModel extends Model {
  public recetaId!: number;

  public ingredienteId!: number;

  public cantidad!: number;

}

RecetaIngredienteModel.init(
  {
    recetaId: {

      type: DataTypes.INTEGER,

      allowNull: false,

      primaryKey: true,

    },
    ingredienteId: {

      type: DataTypes.INTEGER,

      allowNull: false,

      primaryKey: true,

    },
    cantidad: {

      type: DataTypes.FLOAT,

      allowNull: false,

    },
  },
  {
    sequelize,

    modelName: 'RecetaIngrediente',

    tableName: 'receta_ingredientes',

    timestamps: false,
    
  }
);

export default RecetaIngredienteModel;
