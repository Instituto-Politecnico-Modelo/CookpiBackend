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
exports.signUpRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllerIngrediente_1 = require("../controllers/controllerIngrediente");
exports.signUpRouter = express_1.default.Router();
const controllerUsuario_1 = require("../controllers/controllerUsuario");
const ModeloUsuario_1 = __importDefault(require("../models/ModeloUsuario"));
exports.signUpRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield controllerIngrediente_1.controllerIngrediente.existenIngredientes())) {
        controllerIngrediente_1.controllerIngrediente.obtenerAlimentosPopulares();
    }
    console.log(req.body);
    const respuestaBack = yield controllerUsuario_1.controllerUsuario.signUp(req.body);
    if (respuestaBack.error) {
        res.status(405).send(respuestaBack.mensaje);
    }
    else {
        res.send(respuestaBack.mensaje);
    }
}));
exports.signUpRouter.get('/confirmar/:token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.params.token;
        yield ModeloUsuario_1.default.update({ confirmado: true }, { where: { tokenConfirmacion: token } });
        res.send("Usuario confirmado");
    }
    catch (error) {
        console.error("Error al confirmar usuario:", error);
        res.status(500).send("Error al confirmar usuario");
    }
}));
//# sourceMappingURL=rutasSignUp.js.map