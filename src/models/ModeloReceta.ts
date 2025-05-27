import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class ModeloIngrediente extends Model {
    public nombre!: string;
    public descripcion!: string;
    public cantEstrellas!: number;
    public procedimiento!: string;
    public imagen!: string;
    public tiempo!: number;
    public carbohidratos!: number;
    public proteinas!: number;
    public grasas!: number;
    public ingredientes!: 

}
