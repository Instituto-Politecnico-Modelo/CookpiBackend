import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

enum Dieta{

    Carnivora, Keto, Vegana, Vegetariana, AptoCeliacos, Sibo
    
}

export default Dieta;