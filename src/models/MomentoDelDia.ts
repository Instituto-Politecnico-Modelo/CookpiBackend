import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

enum MomentoDelDia {

Desayuno, Almuerzo, Snack, Cena

}

export default MomentoDelDia;