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
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const LogInRouter_1 = require("./routes/LogInRouter");
const rutasSignUp_1 = require("./routes/rutasSignUp");
const rutasRecuperarContrase_a_1 = require("./routes/rutasRecuperarContrase\u00F1a");
const rutasIngrediente_1 = require("./routes/rutasIngrediente");
const CheckLogin_1 = require("./routes/CheckLogin");
const recetaRouter_1 = require("./routes/recetaRouter");
const librosRouter_1 = require("./routes/librosRouter");
const ConsumoRouter_1 = require("./routes/ConsumoRouter");
const UsuarioRouter_1 = require("./routes/UsuarioRouter");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";
const Sequelize = require("sequelize");
const cors = require("cors");
app.use(express_1.default.json());
app.use(cors());
app.use('/logIn', cors());
app.use("/logIn", LogInRouter_1.loginRouter);
/*🪿🪿🪿🪿🪿🪿🪿🪿🪿🪿🪿🪿🪿🪿🪿🪿🪿*/
app.use('/checkLogIn', cors());
app.use("/checkLogIn", CheckLogin_1.checkLoginRouter);
app.use("/signUp", cors());
app.use("/signUp", rutasSignUp_1.signUpRouter);
app.use("/recuperarPassword", cors());
app.use("/recuperarPassword", rutasRecuperarContrase_a_1.recuperarContraseñaRouter);
app.use("/ingrediente", cors());
app.use("/ingrediente", rutasIngrediente_1.ingredienteRouter);
app.use("/receta", cors());
app.use("/receta", recetaRouter_1.RecetaRouter);
app.use("/libro", cors());
app.use("/libro", librosRouter_1.LibroRouter);
app.use("/consumo", cors());
app.use("/consumo", ConsumoRouter_1.consumoRouter);
app.use("/usuario", cors());
app.use("/usuario", UsuarioRouter_1.usuarioRouter);
app.get('/', (req, res) => {
    res.send('Hello, TypeScript Express!');
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("pre db");
        yield database_1.default.sync();
        console.log('Base de datos sincronizada');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Error conectando a la base de datos:', error);
    }
}))();
//# sourceMappingURL=server.js.map