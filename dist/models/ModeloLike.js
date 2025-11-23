"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class LikeModel extends sequelize_1.Model {
}
LikeModel.init({
    recetaId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Receta',
            key: 'id',
        }
    },
    mail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Usuario',
            key: 'mail',
        }
    },
}, {
    sequelize: database_1.default,
    tableName: 'Likes',
    modelName: 'Likes',
    timestamps: false,
});
exports.default = LikeModel;
//# sourceMappingURL=ModeloLike.js.map