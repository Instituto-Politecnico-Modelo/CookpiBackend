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
exports.loginRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.loginRouter = express_1.default.Router();
const controllerUsuario_1 = require("../controllers/controllerUsuario");
const controllerIngrediente_1 = require("../controllers/controllerIngrediente");
exports.loginRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const respuestaBack = yield controllerUsuario_1.controllerUsuario.login(req.body);
    if (!(yield controllerIngrediente_1.controllerIngrediente.existenIngredientes())) {
        controllerIngrediente_1.controllerIngrediente.obtenerAlimentosPopulares();
    }
    if (respuestaBack.error) {
        res.status(405).send(respuestaBack.mensaje);
    }
    else {
        res.status(200).send(respuestaBack.mensaje);
    }
}));
exports.loginRouter.get('/mail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield controllerUsuario_1.controllerUsuario.mailPorToken(req.headers['authorization']));
    }
    catch (error) {
        console.error("Error al obtener mail por token:", error);
        res.status(500).send("Error al obtener mail por token");
    }
}));
//# sourceMappingURL=LogInRouter.js.map