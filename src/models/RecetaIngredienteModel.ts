import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class RecetaIngredienteModel extends Model {}

RecetaIngredienteModel.init(
  {
    recetaId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
      model: 'Receta',
      key: 'id',       
  }
    },
    ingredienteId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
      model: 'Ingrediente',
      key: 'codigo',       
    }
    },
    cantidad: {
      type: DataTypes.INTEGER,
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
