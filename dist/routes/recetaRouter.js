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
exports.RecetaRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllerReceta_1 = require("../controllers/controllerReceta");
const controllerUsuario_1 = require("../controllers/controllerUsuario");
exports.RecetaRouter = express_1.default.Router();
exports.RecetaRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    res.send(yield controllerReceta_1.controllerReceta.crearReceta(req.body, req.headers['authorization']));
}));
exports.RecetaRouter.get('/recetasPorLibro/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const respuestaBack = yield controllerReceta_1.controllerReceta.obtenerRecetasPorLibro(req.params.id);
    if (respuestaBack != null) {
        res.send(respuestaBack);
    }
    else {
        res.send("");
    }
}));
exports.RecetaRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const respuestaBack = yield controllerReceta_1.controllerReceta.obtenerReceta(req.params.id);
    if (respuestaBack != null) {
        res.send(respuestaBack);
    }
    else {
        res.status(405).send("Receta no encontrada");
    }
}));
exports.RecetaRouter.get('/pag/:pagina/:busqueda', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const respuestaBack = yield controllerReceta_1.controllerReceta.obtenerRecetas(+req.params.pagina, req.params.busqueda, true, "");
    res.send(respuestaBack);
}));
exports.RecetaRouter.get('/pag/:pagina', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const respuestaBack = yield controllerReceta_1.controllerReceta.obtenerRecetas(+req.params.pagina, "", false, "");
    res.send(respuestaBack);
}));
exports.RecetaRouter.post('/like', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    controllerUsuario_1.controllerUsuario.like(req.body.mail, req.body.recetaId);
}));
exports.RecetaRouter.get('/pag/:pagina/:busqueda/:filtro', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const respuestaBack = yield controllerReceta_1.controllerReceta.obtenerRecetas(+req.params.pagina, req.params.busqueda, true, req.params.filtro);
    res.send(respuestaBack);
}));
exports.RecetaRouter.get('/pagf/:pagina/:filtro', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const respuestaBack = yield controllerReceta_1.controllerReceta.obtenerRecetas(+req.params.pagina, "", false, req.params.filtro);
    res.send(respuestaBack);
}));
exports.RecetaRouter.get('/pagr/:kcal/:pagina', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const respuestaBack = yield controllerReceta_1.controllerReceta.obtenerRecomendaciones(+req.params.kcal, +req.params.pagina);
    res.send(respuestaBack);
}));
exports.RecetaRouter.get("/ingredientes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const respuestaBack = yield controllerReceta_1.controllerReceta.obtenerIngredientesDeReceta(req.params.id);
    res.send(respuestaBack);
}));
exports.RecetaRouter.get("/del/dia", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respuestaBack = yield controllerReceta_1.controllerReceta.obtenerRecetaDelDia();
        res.send(respuestaBack);
    }
    catch (error) {
        console.error("Error al obtener la receta del día:", error);
        res.status(500).send("Error al obtener la receta del día");
    }
}));
exports.RecetaRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respuestaBack = yield controllerReceta_1.controllerReceta.editarReceta(+req.params.id, req.body, req.headers['authorization']);
        res.send(respuestaBack);
    }
    catch (error) {
        console.error("Error al editar la receta:", error);
        res.status(500).send("Error al editar la receta: " + error);
    }
}));
//# sourceMappingURL=recetaRouter.js.map