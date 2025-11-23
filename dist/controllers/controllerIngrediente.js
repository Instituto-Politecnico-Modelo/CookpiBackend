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
exports.controllerIngrediente = void 0;
const sequelize_1 = require("sequelize");
const ModeloIngrediente_1 = __importDefault(require("../models/ModeloIngrediente"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_decode_1 = require("jwt-decode");
class controllerIngrediente {
    static crearIngrediente(body, authHeader) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authHeader) {
                const token = authHeader && authHeader.split(' ')[1];
                console.log(token);
                console.log(jsonwebtoken_1.default.verify(token, this.secretKey));
                console.log("TOKEN: " + (0, jwt_decode_1.jwtDecode)(token));
            }
            const ingrediente = yield ModeloIngrediente_1.default.create(body);
            return ingrediente;
        });
    }
    static updateIngrediente(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const ingrediente = yield ModeloIngrediente_1.default.update(body, { where: { id: body.id } });
            return ingrediente;
        });
    }
    static deleteIngrediente(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ModeloIngrediente_1.default.destroy({ where: { id: id } });
        });
    }
    static leerIngredientes(pagina, busqueda, buscar) {
        return __awaiter(this, void 0, void 0, function* () {
            if (buscar) {
                return yield ModeloIngrediente_1.default.findAll({ limit: 5, offset: pagina * 5, where: { nombre: { [sequelize_1.Op.like]: "%" + busqueda + "%" } } });
            }
            if (pagina == -1) {
                return yield ModeloIngrediente_1.default.findAll();
            }
            else {
                return yield ModeloIngrediente_1.default.findAll({ limit: 5, offset: pagina * 5 });
            }
        });
    }
    static obtenerAlimentosPopulares() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = 'https://ar.openfoodfacts.org/products.json?sort_by=popularity';
            try {
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error(`Error en la respuesta: ${response.status}`);
                }
                const data = yield response.json();
                const productos = data.products;
                const lista = productos
                    .filter((p) => p.product_name && p.code)
                    .map((p) => ({
                    nombre: p.product_name,
                    codigo: p.code
                }));
                lista.forEach((producto) => {
                    ModeloIngrediente_1.default.create({
                        nombre: producto.nombre,
                        codigo: producto.codigo
                    });
                });
                console.log(lista);
                return lista;
            }
            catch (error) {
                console.error('Error al obtener alimentos populares:', error);
                throw new Error('No se pudieron obtener los alimentos populares');
            }
        });
    }
    static existenIngredientes() {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield ModeloIngrediente_1.default.findOne()) == null) {
                return false;
            }
            else {
                return true;
            }
        });
    }
    static obtenerCaloriasPorBarcode(barcode) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
            try {
                const response = yield fetch(url);
                if (!response.ok)
                    throw new Error(`Error al consultar el producto: ${response.status}`);
                const data = yield response.json();
                if (!((_a = data.product) === null || _a === void 0 ? void 0 : _a.nutriments) || data.status === 0) {
                    console.warn('Producto no encontrado o sin datos nutricionales.');
                    return null;
                }
                const calorias = (_b = data.product.nutriments['energy-kcal_100g']) !== null && _b !== void 0 ? _b : null;
                console.log(data);
                return calorias;
            }
            catch (error) {
                console.error(`Error al obtener calorías del producto ${barcode}:`, error);
                return null;
            }
        });
    }
    static obtenerCarbohidratosPorBarcode(barcode) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
            try {
                const response = yield fetch(url);
                console.log("B A R C O D E ::::::: " + barcode);
                if (!response.ok) {
                    throw new Error(`Error al consultar el producto: ${response.status}`);
                }
                const data = yield response.json();
                if (!data.product || !data.product.nutriments || data.status === 0) {
                    console.warn('Producto no encontrado o sin datos nutricionales.');
                    return null;
                }
                const carbohidratos = (_a = data.product.nutriments['carbohydrates_100g']) !== null && _a !== void 0 ? _a : null;
                return carbohidratos;
            }
            catch (error) {
                console.error(`Error al obtener carbohidratos del producto ${barcode}:`, error);
                return null;
            }
        });
    }
    static obtenerProteinasPorBarcode(barcode) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
            console.log("B A R C O D E ::::::: " + barcode);
            try {
                console.log("B A R C O D E ::::::: " + barcode);
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error(`Error al consultar el producto: ${response.status}`);
                }
                const data = yield response.json();
                if (!data.product || !data.product.nutriments || data.status === 0) {
                    console.warn('Producto no encontrado o sin datos nutricionales.');
                    return null;
                }
                const proteinas = (_a = data.product.nutriments['proteins_100g']) !== null && _a !== void 0 ? _a : null;
                return proteinas;
            }
            catch (error) {
                console.error(`Error al obtener proteínas del producto ${barcode}:`, error);
                return null;
            }
        });
    }
    static obtenerGrasasPorBarcode(barcode) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
            try {
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error(`Error al consultar el producto: ${response.status}`);
                }
                const data = yield response.json();
                if (!data.product || !data.product.nutriments || data.status === 0) {
                    console.warn('Producto no encontrado o sin datos nutricionales.');
                    return null;
                }
                const grasas = (_a = data.product.nutriments['fat_100g']) !== null && _a !== void 0 ? _a : null;
                return grasas;
            }
            catch (error) {
                console.error(`Error al obtener grasas del producto ${barcode}:`, error);
                return null;
            }
        });
    }
}
exports.controllerIngrediente = controllerIngrediente;
controllerIngrediente.secretKey = "Ensaladardamal";
//# sourceMappingURL=controllerIngrediente.js.map