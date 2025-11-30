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
exports.consumoRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllerUsuario_1 = require("../controllers/controllerUsuario");
const middleware_1 = require("../middleware/middleware");
exports.consumoRouter = express_1.default.Router();
exports.consumoRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield controllerUsuario_1.controllerUsuario.cargarConsumo(req.body.idReceta, req.headers['authorization']);
        res.sendStatus(200);
        console.log(req.body);
    }
    catch (error) {
        console.error("Error al cargar consumo:", error);
        res.status(500).send("Error al cargar consumo");
    }
}));
exports.consumoRouter.get('/', middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield controllerUsuario_1.controllerUsuario.consumoUsuario(req.headers['authorization']));
    }
    catch (error) {
        console.error("Error al obtener consumo del usuario:", error);
        res.status(500).send("Error al obtener consumo del usuario");
    }
}));
exports.consumoRouter.delete('/:idReceta', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield controllerUsuario_1.controllerUsuario.eliminarConsumo(req.headers['authorization'], +req.params.idReceta));
    }
    catch (error) {
        console.error("Error al eliminar consumo:", error);
        res.status(500).send("Error al eliminar consumo");
    }
}));
exports.consumoRouter.delete('/:mail/:idReceta', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield controllerUsuario_1.controllerUsuario.eliminarConsumo(req.params.mail, +req.params.idReceta));
    }
    catch (error) {
        console.error("Error al eliminar consumo:", error);
        res.status(500).send("Error al eliminar consumo");
    }
}));
//# sourceMappingURL=ConsumoRouter.js.map