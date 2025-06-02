import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import ModeloUsuario from './ModeloUsuario';

class ModeloPerfilFit extends Model{

    public usuario!: ModeloUsuario;
    public genero!: string;
    public peso !: number;
    public altura !: number;
    public numeroActividad !: number;
    public proteinas !: number;
    public carbohidratos !: number;
    public grasa !: number;
    
}
