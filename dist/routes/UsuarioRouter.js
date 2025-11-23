"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllerUsuario_1 = require("../controllers/controllerUsuario");
const middleware_1 = require("../middleware/middleware");
exports.usuarioRouter = express_1.default.Router();
exports.usuarioRouter.get('/:mail', middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield controllerUsuario_1.controllerUsuario.usuarioPorMail(req.params.mail));
    }
    catch (error) {
        console.error("Error al obtener usuario por mail:", error);
        res.status(500).send("Error al obtener usuario por mail");
    }
}));
exports.usuarioRouter.post('/like', middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield controllerUsuario_1.controllerUsuario.like(req.body.mail, req.body.recetaId));
    }
    catch (error) {
        console.error("Error al dar like a la receta:", error);
        res.status(500).send("Error al dar like a la receta");
    }
}));
exports.usuarioRouter.delete('/like/:recetaId/:mail', middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield controllerUsuario_1.controllerUsuario.borrarLike(req.params.mail, +req.params.recetaId));
    }
    catch (error) {
        console.error("Error al borrar el like de la receta:", error);
        res.status(200).send("Error al borrar el like de la receta:");
    }
}));
exports.usuarioRouter.get('/like/:mail/:recetaId', middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield controllerUsuario_1.controllerUsuario.isYaLikeada(req.params.mail, +req.params.recetaId));
    }
    catch (error) {
        console.error("Error al verificar si la receta ya fue likeada:", error);
        res.status(500).send("Error al verificar si la receta ya fue likeada");
    }
}));
//# sourceMappingURL=UsuarioRouter.js.map