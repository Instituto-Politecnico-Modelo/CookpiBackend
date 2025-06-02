import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import ModeloReceta from './ModeloReceta';

class ModeloUsuario extends Model {

    public nombre!: string;
    public password! : string;
    public recetas!: ModeloReceta[];
    public mail!: string;
    public descripcion!: string;
}


ModeloUsuario.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'Usuario',
      tableName: 'usuario',
      timestamps: true
    }
  );

export default ModeloUsuario;