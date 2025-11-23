"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(403).json({ mensaje: 'Token no proporcionado' });
        return;
    }
    try {
        const secretKey = 'Ensaladardamal';
        jsonwebtoken_1.default.verify(token, secretKey);
        next();
    }
    catch (error) {
        res.status(403).json({ mensaje: 'Token inválido o expirado' });
        return;
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=middleware.js.map