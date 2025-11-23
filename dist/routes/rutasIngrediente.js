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
exports.ingredienteRouter = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware/middleware");
const controllerIngrediente_1 = require("../controllers/controllerIngrediente");
exports.ingredienteRouter = express_1.default.Router();
exports.ingredienteRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield controllerIngrediente_1.controllerIngrediente.crearIngrediente(req.body, req.headers['authorization']));
    }
    catch (error) {
        console.error("Error al crear ingrediente:", error);
        res.status(500).send("Error al crear ingrediente");
    }
}));
exports.ingredienteRouter.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield controllerIngrediente_1.controllerIngrediente.updateIngrediente(req.body));
    }
    catch (error) {
        console.error("Error al actualizar ingrediente:", error);
        res.status(500).send("Error al actualizar ingrediente");
    }
}));
exports.ingredienteRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield controllerIngrediente_1.controllerIngrediente.deleteIngrediente(req.params.id));
    }
    catch (error) {
        console.error("Error al eliminar ingrediente:", error);
        res.status(500).send("Error al eliminar ingrediente");
    }
}));
exports.ingredienteRouter.get('/:pagina/:busqueda', middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield controllerIngrediente_1.controllerIngrediente.leerIngredientes(+req.params.pagina, req.params.busqueda, true));
    }
    catch (error) {
        console.error("Error al leer ingredientes:", error);
        res.status(500).send("Error al leer ingredientes");
    }
}));
exports.ingredienteRouter.get('/:pagina', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield controllerIngrediente_1.controllerIngrediente.leerIngredientes(+req.params.pagina, "nada", false));
    }
    catch (error) {
        console.error("Error al leer ingredientes:", error);
        res.status(500).send("Error al leer ingredientes");
    }
}));
exports.ingredienteRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield controllerIngrediente_1.controllerIngrediente.leerIngredientes(-1, "nada", false));
    }
    catch (error) {
        console.error("Error al leer ingredientes:", error);
        res.status(500).send("Error al leer ingredientes");
    }
}));
//# sourceMappingURL=rutasIngrediente.js.map