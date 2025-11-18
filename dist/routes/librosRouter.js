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
exports.LibroRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllerLibroReceta_1 = require("../controllers/controllerLibroReceta");
const ModeloLibroReceta_1 = __importDefault(require("../models/ModeloLibroReceta"));
exports.LibroRouter = express_1.default.Router();
exports.LibroRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield controllerLibroReceta_1.controllerLibro.crearLibro(req.body, req.headers['authorization']));
    }
    catch (error) {
        console.error("Error al crear libro:", error);
        res.status(500).send("Error al crear libro");
    }
}));
exports.LibroRouter.get('/porid/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield ModeloLibroReceta_1.default.findOne({ where: { id: req.params.id } }));
    }
    catch (error) {
        res.status(500).send("Error al obtener libro por ID");
    }
}));
exports.LibroRouter.get('/recetas/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield controllerLibroReceta_1.controllerLibro.recetasDeLibro(req.params.id));
    }
    catch (error) {
        res.status(500).send("Error al obtener recetas de libro");
    }
}));
exports.LibroRouter.get('/pormail/:mail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield ModeloLibroReceta_1.default.findAll({ where: { mail: req.params.mail + "@gmail.com" } }));
    }
    catch (error) {
        res.status(500).send("Error al obtener libros por mail");
    }
}));
exports.LibroRouter.post('/agregarReceta', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield controllerLibroReceta_1.controllerLibro.agregarReceta(req.body));
    }
    catch (error) {
        console.error("Error al agregar receta al libro:", error);
        res.status(500).send("Error al agregar receta al libro");
    }
}));
exports.LibroRouter.delete('/eliminarReceta/:idLibro/:idReceta', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield controllerLibroReceta_1.controllerLibro.eliminarReceta(+req.params.idLibro, +req.params.idReceta));
    }
    catch (error) {
        console.error("Error al eliminar receta del libro:", error);
        res.status(500).send(error);
    }
}));
exports.LibroRouter.delete('/:idLibro', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield controllerLibroReceta_1.controllerLibro.eliminarLibro(+req.params.idLibro));
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
//# sourceMappingURL=librosRouter.js.map