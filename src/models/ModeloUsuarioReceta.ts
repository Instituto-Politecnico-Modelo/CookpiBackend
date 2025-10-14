
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class UsuarioRecetaModel extends Model {
  public mail!: string;
  public recetaId!: number;
}

UsuarioRecetaModel.init(
  {
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
      model: 'Usuario',
      key: 'mail',       
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
    tableName: 'usuarioReceta',
    modelName: 'usuarioReceta',
    timestamps: false,
  }
);

export default UsuarioRecetaModel;