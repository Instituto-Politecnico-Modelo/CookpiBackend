import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import ModeloReceta from './ModeloReceta';
import { Mode } from 'fs';
import ModeloUsuario from './ModeloUsuario';

class ModeloLibro extends Model {

    public nombre!: string;
    public recetas! : ModeloReceta[];
    public descripcion!: string;
    public usuario!: ModeloUsuario;
    
}