"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class LibroRecetaModel extends sequelize_1.Model {
}
LibroRecetaModel.init({
    libroId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Libros',
            key: 'id',
        }
    },
    recetaId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Receta',
            key: 'id',
        }
    },
}, {
    sequelize: database_1.default,
    tableName: 'LibroReceta',
    modelName: 'LibroReceta',
    timestamps: false,
});
exports.default = LibroRecetaModel;
//# sourceMappingURL=LibroReceta.js.map