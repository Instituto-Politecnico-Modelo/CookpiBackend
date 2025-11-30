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
exports.recuperarContraseñaRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.recuperarContraseñaRouter = express_1.default.Router();
const controllerUsuario_1 = require("../controllers/controllerUsuario");
exports.recuperarContraseñaRouter.post('/cambiar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        res.send(yield controllerUsuario_1.controllerUsuario.actuaiizarContraseña(req.body.token, req.body.password));
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error al cambiar contraseña");
    }
}));
exports.recuperarContraseñaRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield controllerUsuario_1.controllerUsuario.enivarCorreoPassword(req.body.mail);
        res.send(resp);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
//# sourceMappingURL=rutasRecuperarContrase%C3%B1a.js.map