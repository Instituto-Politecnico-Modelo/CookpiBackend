"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const ModeloIngrediente_1 = __importDefault(require("./ModeloIngrediente"));
const RecetaIngredienteModel_1 = __importDefault(require("./RecetaIngredienteModel"));
class ModeloReceta extends sequelize_1.Model {
}
ModeloReceta.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    procedimiento: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    calorias: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    proteinas: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    carbohidratos: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    grasas: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    dieta: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    tiempo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    cantLikes: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    momentoDelDia: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    mailUsuario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'usuario',
            key: 'mail'
        },
    }
}, {
    sequelize: database_1.default,
    modelName: 'Receta',
});
ModeloReceta.belongsToMany(ModeloIngrediente_1.default, {
    through: RecetaIngredienteModel_1.default,
    foreignKey: 'recetaId',
    otherKey: 'ingredienteId',
});
ModeloIngrediente_1.default.belongsToMany(ModeloReceta, {
    through: RecetaIngredienteModel_1.default,
    foreignKey: 'ingredienteId',
    otherKey: 'recetaId',
});
exports.default = ModeloReceta;
//# sourceMappingURL=ModeloReceta.js.map