import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import ModeloReceta from './ModeloReceta';
import LibroRecetaModel from './LibroReceta';
import { Mode } from 'fs';
import ModeloUsuario from './ModeloUsuario';

class ModeloLibro extends Model {

    public nombre!: string;
    public descripcion!: string;
    public usuario!: ModeloUsuario;
    
}

ModeloLibro.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    usuarioId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'mail',
      },
    },
  },
  {
    sequelize,
    tableName: 'Libros', 
    modelName: 'Libro',  
  }
);

ModeloLibro.belongsTo(ModeloUsuario, {
  foreignKey: 'usuarioId',
  as: 'usuario',
});

ModeloLibro.belongsToMany(ModeloReceta, {
  through: 'LibroReceta',
  foreignKey: 'libroId',
  otherKey: 'recetaId',
  as: 'recetas',
});
ModeloReceta.belongsToMany(ModeloLibro, {
  through: 'LibroReceta',
  foreignKey: 'recetaId',
  otherKey: 'libroId',
  as: 'libros',
});



export default ModeloLibro;


