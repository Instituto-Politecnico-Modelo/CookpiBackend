"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class RecetaIngredienteModel extends sequelize_1.Model {
}
RecetaIngredienteModel.init({
    recetaId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Receta',
            key: 'id',
        }
    },
    ingredienteId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Ingrediente',
            key: 'codigo',
        }
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    sequelize: database_1.default,
    modelName: 'RecetaIngrediente',
    tableName: 'receta_ingredientes',
    timestamps: false,
});
exports.default = RecetaIngredienteModel;
//# sourceMappingURL=RecetaIngredienteModel.js.map