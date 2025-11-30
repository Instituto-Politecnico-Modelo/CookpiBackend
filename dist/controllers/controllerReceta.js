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
exports.controllerReceta = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ModeloReceta_1 = __importDefault(require("../models/ModeloReceta"));
const controllerIngrediente_1 = require("./controllerIngrediente");
const RecetaIngredienteModel_1 = __importDefault(require("../models/RecetaIngredienteModel"));
const LibroReceta_1 = __importDefault(require("../models/LibroReceta"));
const sequelize_1 = require("sequelize");
const ModeloIngrediente_1 = __importDefault(require("../models/ModeloIngrediente"));
const controllerUsuario_1 = require("./controllerUsuario");
class controllerReceta {
    static crearReceta(body, authHeader) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            let usuarioMail = "";
            const token = authHeader && authHeader.split(' ')[1];
            try {
                const decoded = jsonwebtoken_1.default.verify(token, this.secretKey);
                usuarioMail = decoded.mail || decoded.sub;
                console.log("Usuario creador:", usuarioMail);
                console.log("###############");
                body["calorias"] = 0;
                body["proteinas"] = 0;
                body["grasas"] = 0;
                body["carbohidratos"] = 0;
                body["usuarioCreadorId"] = usuarioMail;
                for (const ingrediente of body.ingredientes) {
                    const calorias = (_a = yield controllerIngrediente_1.controllerIngrediente.obtenerCaloriasPorBarcode(ingrediente.codigo)) !== null && _a !== void 0 ? _a : 0;
                    const proteinas = (_b = yield controllerIngrediente_1.controllerIngrediente.obtenerProteinasPorBarcode(ingrediente.codigo)) !== null && _b !== void 0 ? _b : 0;
                    const grasas = (_c = yield controllerIngrediente_1.controllerIngrediente.obtenerGrasasPorBarcode(ingrediente.codigo)) !== null && _c !== void 0 ? _c : 0;
                    const carbohidratos = (_d = yield controllerIngrediente_1.controllerIngrediente.obtenerCarbohidratosPorBarcode(ingrediente.codigo)) !== null && _d !== void 0 ? _d : 0;
                    body.calorias += calorias * ingrediente.cantidad / 100;
                    body.proteinas += proteinas * ingrediente.cantidad / 100;
                    body.grasas += grasas * ingrediente.cantidad / 100;
                    body.carbohidratos += carbohidratos * ingrediente.cantidad / 100;
                }
                const receta = yield ModeloReceta_1.default.create(body);
                let tablaIntermedia = { "recetaId": receta.id, ingredienteId: "", cantidad: 0 };
                for (const ingrediente of body.ingredientes) {
                    tablaIntermedia.ingredienteId = ingrediente.codigo;
                    tablaIntermedia.cantidad = ingrediente.cantidad;
                    RecetaIngredienteModel_1.default.create(tablaIntermedia);
                }
                return receta.id;
            }
            catch (error) {
                console.error("Error al crear la receta:", error);
            }
        });
    }
    static obtenerRecetasPorLibro(idL) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield LibroReceta_1.default.findAll({ where: { idLibro: idL } });
        });
    }
    static obtenerReceta(idR) {
        return __awaiter(this, void 0, void 0, function* () {
            const receta = yield ModeloReceta_1.default.findOne({ where: { id: parseInt(idR) } });
            console.log("YA LO SE   " + (receta === null || receta === void 0 ? void 0 : receta.procedimiento));
            return receta;
        });
    }
    static obtenerRecetas(pagina, busqueda, buscar, filtro) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log("pipupipu" + " " + pagina + " " + busqueda + " " + filtro +  " " + buscar)
            if (buscar) {
                if (filtro == "") {
                    return yield ModeloReceta_1.default.findAll({ limit: 6, offset: pagina * 6, where: { nombre: { [sequelize_1.Op.like]: "%" + busqueda + "%" } } });
                }
                else {
                    return yield ModeloReceta_1.default.findAll({ limit: 6, offset: pagina * 6, where: { nombre: { [sequelize_1.Op.like]: "%" + busqueda + "%" }, dieta: filtro } });
                }
            }
            if (pagina == -1) {
                return yield ModeloReceta_1.default.findAll();
            }
            else {
                if (filtro == "") {
                    return yield ModeloReceta_1.default.findAll({ limit: 6, offset: pagina * 6 });
                }
                else {
                    return yield ModeloReceta_1.default.findAll({ limit: 6, offset: pagina * 6, where: { dieta: filtro } });
                }
            }
        });
    }
    static obtenerRecomendaciones(kcal, pagina) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ModeloReceta_1.default.findAll({ limit: 6, offset: pagina * 6, where: { calorias: { [sequelize_1.Op.lte]: kcal } } });
        });
    }
    static obtenerIngredientesDeReceta(idR) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("ID RECETA EN CONTROLLER: " + idR);
            let ingredientes = [];
            let cantidades = [];
            let ingredientesData = [];
            const respIngredientes = yield RecetaIngredienteModel_1.default.findAll({ where: { recetaId: parseInt(idR) } });
            for (let i = 0; i < respIngredientes.length; i++) {
                ingredientes.push(respIngredientes[i].ingredienteId);
                cantidades.push(respIngredientes[i].cantidad);
            }
            for (let i = 0; i < ingredientes.length; i++) {
                const infoIngrediente = yield ModeloIngrediente_1.default.findOne({ where: { codigo: ingredientes[i] } });
                if (infoIngrediente) {
                    ingredientesData.push({ nombre: infoIngrediente.nombre, cantidad: cantidades[i] });
                }
            }
            return ingredientesData;
        });
    }
    static obtenerRecetaDelDia() {
        return __awaiter(this, void 0, void 0, function* () {
            const recetas = yield ModeloReceta_1.default.findAll();
            const indiceAleatorio = Math.floor(Math.random() * recetas.length);
            return recetas[indiceAleatorio];
        });
    }
    static editarReceta(idReceta, body, authHeader) {
        return __awaiter(this, void 0, void 0, function* () {
            let mail = yield controllerUsuario_1.controllerUsuario.mailPorToken(authHeader);
            const receta = yield ModeloReceta_1.default.findOne({ where: { id: idReceta, usuarioCreadorId: mail } });
            if (receta) {
                yield ModeloReceta_1.default.update(body, { where: { id: idReceta } });
                return "Receta actualizada correctamente";
            }
            else {
                throw new Error("No tienes permiso para editar esta receta");
            }
        });
    }
}
exports.controllerReceta = controllerReceta;
controllerReceta.secretKey = "Ensaladardamal";
//# sourceMappingURL=controllerReceta.js.map