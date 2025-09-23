import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import ModeloReceta from './ModeloReceta';

class ModeloUsuario extends Model {

    public nombre!: string;

    public password! : string;

    public recetas?: ModeloReceta[];

    public confirmado?: boolean;

    public mail!: string;

    public descripcion?: string;

    public tokenConfirmacion?:string;

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
      primaryKey: true,
      allowNull: false,
      unique: true

    },
    descripcion: {

      type: DataTypes.TEXT,

      allowNull: true

    },
    confirmado: {

      type: DataTypes.BOOLEAN,

      allowNull: true

    },
    tokenConfirmacion: {

      type: DataTypes.STRING,

      allowNull: true,

      unique:true

    },
  },
  {
    sequelize,

    modelName: 'Usuario',

    tableName: 'usuario',
    
    timestamps: true
  }
);



export default ModeloUsuario;