import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

enum Metodo {

    Herbido, Frito, Ahumado, Salteado, Horneado, AlVapor, Airfrier, Microondas

}

export default Metodo;