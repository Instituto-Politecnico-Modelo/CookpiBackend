"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const ModeloUsuario_1 = __importDefault(require("./ModeloUsuario"));
class ModeloLibro extends sequelize_1.Model {
}
ModeloLibro.init({
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
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    mail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'usuario',
            key: 'mail',
        },
    },
}, {
    sequelize: database_1.default,
    tableName: 'Libros',
    modelName: 'Libro',
});
ModeloLibro.belongsTo(ModeloUsuario_1.default, {
    foreignKey: 'mail',
    targetKey: 'mail',
    as: 'usuario',
});
exports.default = ModeloLibro;
//# sourceMappingURL=ModeloLibroReceta.js.map