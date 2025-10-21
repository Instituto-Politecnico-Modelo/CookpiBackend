import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class LikeModel extends Model {
  public mail!: string;
  public recetaId!: number;
}

LikeModel.init(
  {
    recetaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
      model: 'Receta',
      key: 'id',       
        }
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
      model: 'Usuario',
      key: 'mail',       
  }
    },
  },
  {
    sequelize,
    tableName: 'Likes',
    modelName: 'Likes',
    timestamps: false,
  }
);

export default LikeModel;