"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const ModeloReceta_1 = __importDefault(require("./ModeloReceta"));
const ModeloUsuarioReceta_1 = __importDefault(require("./ModeloUsuarioReceta"));
const ModeloLike_1 = __importDefault(require("./ModeloLike"));
class ModeloUsuario extends sequelize_1.Model {
}
ModeloUsuario.init({
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    mail: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    confirmado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    tokenConfirmacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    peso: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    altura: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    reqCalorico: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    objetivo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    edad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    genero: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Usuario',
    tableName: 'usuario',
    timestamps: true,
});
ModeloReceta_1.default.belongsToMany(ModeloUsuario, {
    through: ModeloUsuarioReceta_1.default,
    foreignKey: 'recetaId',
    otherKey: 'mail',
});
ModeloUsuario.belongsToMany(ModeloReceta_1.default, {
    through: ModeloUsuarioReceta_1.default,
    foreignKey: 'mail',
    otherKey: 'recetaId',
});
ModeloUsuario.belongsToMany(ModeloReceta_1.default, {
    through: ModeloLike_1.default,
    foreignKey: 'mail',
    otherKey: 'recetaId',
});
exports.default = ModeloUsuario;
//# sourceMappingURL=ModeloUsuario.js.map