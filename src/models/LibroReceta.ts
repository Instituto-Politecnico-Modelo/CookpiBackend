
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class LibroRecetaModel extends Model {
  public libroId!: number;
  public recetaId!: number;
}

LibroRecetaModel.init(
  {
    libroId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
      model: 'Libros',
      key: 'id',       
  }
    },
    recetaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
      model: 'Receta',
      key: 'id',       
  }
    },
  },
  {
    sequelize,
    tableName: 'LibroReceta',
    modelName: 'LibroReceta',
    timestamps: false,
  }
);

export default LibroRecetaModel;