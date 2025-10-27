import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import ModeloReceta from './ModeloReceta';
import UsuarioRecetaModel from './ModeloUsuarioReceta';
import LikeModel from './ModeloLike';

class ModeloUsuario extends Model {

    public nombre!: string;

    public password! : string;

    public recetas?: ModeloReceta[];

    public confirmado?: boolean;

    public mail!: string;

    public descripcion?: string;

    public tokenConfirmacion?:string;

    public peso!: number;

    public altura!: number;

    public reqCalorico! : number;

    public edad! : number;

    public genero!: number;
}

ModeloUsuario.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    confirmado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    tokenConfirmacion: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    altura: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    reqCalorico: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    objetivo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    genero: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuario',
    timestamps: true,
  }
  
);

ModeloReceta.belongsToMany(ModeloUsuario, {
    through: UsuarioRecetaModel,
    foreignKey: 'recetaId',
    otherKey: 'mail',
});

ModeloUsuario.belongsToMany(ModeloReceta, {
  through: UsuarioRecetaModel,
  foreignKey: 'mail',
  otherKey: 'recetaId',         
});

ModeloUsuario.belongsToMany(ModeloReceta, {
  through: LikeModel,
  foreignKey: 'mail',
  otherKey: 'recetaId',         
});



export default ModeloUsuario;