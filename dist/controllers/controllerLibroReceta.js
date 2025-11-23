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
exports.controllerLibro = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_decode_1 = require("jwt-decode");
const ModeloReceta_1 = __importDefault(require("../models/ModeloReceta"));
const ModeloLibroReceta_1 = __importDefault(require("../models/ModeloLibroReceta"));
const LibroReceta_1 = __importDefault(require("../models/LibroReceta"));
class controllerLibro {
    static crearLibro(body, authHeader) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authHeader) {
                const token = authHeader && authHeader.split(' ')[1];
                console.log(token);
                console.log(jsonwebtoken_1.default.verify(token, this.secretKey));
                console.log("TOKEN: " + (0, jwt_decode_1.jwtDecode)(token));
            }
            const payload = jsonwebtoken_1.default.verify(body.token, this.secretKey);
            const mail = payload.mail;
            body["mail"] = mail;
            const Libro = yield ModeloLibroReceta_1.default.create(body);
            return Libro.id;
        });
    }
    static agregarReceta(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const vinculoAnterior = yield LibroReceta_1.default.findOne({ where: { libroId: body.libroId, recetaId: body.recetaId } });
            console.log(vinculoAnterior);
            if (vinculoAnterior == null) {
                LibroReceta_1.default.create(body);
            }
        });
    }
    static recetasDeLibro(idLibro) {
        return __awaiter(this, void 0, void 0, function* () {
            let recetas = [];
            let recetasData = [];
            const respReceta = yield LibroReceta_1.default.findAll({ where: { libroId: idLibro } });
            for (let i = 0; i < respReceta.length; i++) {
                recetas.push(respReceta[i].recetaId);
            }
            for (let i = 0; i < recetas.length; i++) {
                let infoReceta = yield ModeloReceta_1.default.findOne({ where: { id: recetas[i] } });
                if (infoReceta != null) {
                    recetasData[i] = { id: infoReceta.id, nombre: infoReceta.nombre, descripcion: infoReceta.descripcion };
                }
            }
            return recetasData;
        });
    }
    static eliminarReceta(idLibro, idReceta) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield LibroReceta_1.default.destroy({ where: { libroId: idLibro, recetaId: idReceta } });
        });
    }
    static eliminarLibro(idLibro) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield LibroReceta_1.default.destroy({ where: { libroId: idLibro } });
                const resp = yield ModeloLibroReceta_1.default.destroy({ where: { id: idLibro } });
                return resp;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.controllerLibro = controllerLibro;
controllerLibro.secretKey = "Ensaladardamal";
//# sourceMappingURL=controllerLibroReceta.js.map