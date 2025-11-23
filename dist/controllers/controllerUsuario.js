"use strict";
//import fs from 'fs';
//import ModeloReceta from '../models/ModeloReceta';
//import { forEachChild } from 'typescript';
//import nodemailer from 'nodemailer';
//import dotenv from 'dotenv';
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
exports.controllerUsuario = void 0;
const jwt_decode_1 = require("jwt-decode");
const ModeloUsuario_1 = __importDefault(require("../models/ModeloUsuario"));
const crypto_1 = require("crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailer_1 = require("../config/mailer");
const sequelize_1 = require("sequelize");
const ModeloUsuarioReceta_1 = __importDefault(require("../models/ModeloUsuarioReceta"));
const crypto_2 = __importDefault(require("crypto"));
const ModeloReceta_1 = __importDefault(require("../models/ModeloReceta"));
const ModeloLike_1 = __importDefault(require("../models/ModeloLike"));
class controllerUsuario {
    static hashSHA256(data) {
        return (0, crypto_1.createHash)('sha256').update(data).digest('hex');
    }
    static generarJWT(payload) {
        const token = jsonwebtoken_1.default.sign(payload, controllerUsuario.secretKey);
        return token;
    }
    static enivarCorreoPassword(mail) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield ModeloUsuario_1.default.findOne({ where: { mail: mail } });
            if (usuario) {
                const token = usuario.tokenConfirmacion;
                if (token != undefined) {
                    controllerUsuario.recuperarContraseña(mail, token);
                }
            }
        });
    }
    static crearUsuario(body) {
        return __awaiter(this, void 0, void 0, function* () {
            body.password = controllerUsuario.hashSHA256(body.password);
            const usuario = yield ModeloUsuario_1.default.create(body);
            return usuario;
        });
    }
    static signUp(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let respuesta = { "error": false, "mensaje": "" };
            const usuarioAnt = yield ModeloUsuario_1.default.findOne({ where: { mail: body.mail } });
            if (!usuarioAnt) {
                const tokenConfirmacion = crypto_2.default.randomBytes(32).toString('hex').slice(0, 32);
                body.reqCalorico = (body.peso * 10) + (6.25 * body.altura) - 5 * body.edad - 161;
                switch (body.objetivo) {
                    case "3":
                        body.reqCalorico = body.reqCalorico - body.reqCalorico * 0.20;
                        break;
                    case "2":
                        body.reqCalorico = body.reqCalorico;
                        break;
                    case "1":
                        body.reqCalorico = body.reqCalorico + body.reqCalorico * 0.15;
                        break;
                }
                body.reqCalorico = Math.round(body.reqCalorico);
                body.tokenConfirmacion = tokenConfirmacion;
                const usuario = yield controllerUsuario.crearUsuario(body);
                const payload = {
                    "mail": usuario.mail
                };
                (0, mailer_1.sendConfirmationEmail)(body.mail, tokenConfirmacion);
                respuesta.mensaje = controllerUsuario.generarJWT(payload);
                return respuesta;
            }
            else {
                respuesta.error = true;
                respuesta.mensaje = "Ya existe un usuario con ese correo electrónico.";
                return respuesta;
            }
        });
    }
    static login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let respuesta = { "error": false, "mensaje": "" };
            const usuario = yield ModeloUsuario_1.default.findOne({ where: { nombre: body.nombre } });
            if (usuario) {
                if (controllerUsuario.hashSHA256(body.password) == usuario.password) {
                    const payload = {
                        "mail": usuario.mail
                    };
                    respuesta.mensaje = controllerUsuario.generarJWT(payload);
                    return respuesta;
                }
                else {
                    respuesta.error = true;
                    respuesta.mensaje = "Contraseña incorrecta";
                    return respuesta;
                }
            }
            else {
                respuesta.error = true;
                respuesta.mensaje = "Ese usuario no existe";
                return respuesta;
            }
        });
    }
    static autenticar(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let payload = null;
            try {
                payload = jsonwebtoken_1.default.verify(token, this.secretKey);
            }
            catch (_a) {
                return false;
            }
            const usuario = yield ModeloUsuario_1.default.findOne({ where: { mail: payload.mail } });
            if (usuario) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    static updateUsuario(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const libro = yield ModeloUsuario_1.default.update(body, { where: { id: body.id } });
            return libro;
        });
    }
    static deleteUsuario(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const libro = yield ModeloUsuario_1.default.destroy({ where: { id: body.id } });
            return libro;
        });
    }
    static recuperarContraseña(mail, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield ModeloUsuario_1.default.findOne({ where: { mail } });
            if (usuario) {
                const tokenRecuperacion = usuario.tokenConfirmacion;
                (0, mailer_1.sendPasswordResetEmail)(mail, token);
            }
        });
    }
    static actuaiizarContraseña(token, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield ModeloUsuario_1.default.findOne({ where: { tokenConfirmacion: token } });
            if (usuario) {
                const payload = {
                    "mail": usuario.mail
                };
                const hashedPassword = controllerUsuario.hashSHA256(password);
                yield ModeloUsuario_1.default.update({ password: hashedPassword, tokenConfirmacion: this.generarJWT(payload) }, { where: { tokenConfirmacion: token } });
            }
        });
    }
    static mailPorToken(authHeader) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = "";
            if (authHeader) {
                token = authHeader && authHeader.split(' ')[1];
                console.log(token);
                console.log(jsonwebtoken_1.default.verify(token, this.secretKey));
                console.log("TOKEN: " + (0, jwt_decode_1.jwtDecode)(token));
            }
            const payload = jsonwebtoken_1.default.verify(token, this.secretKey);
            const mailPre = payload.mail;
            const mail = mailPre.split("@")[0];
            return mail;
        });
    }
    static usuarioPorMail(mail) {
        return __awaiter(this, void 0, void 0, function* () {
            mail = mail + "@gmail.com";
            return yield ModeloUsuario_1.default.findOne({ where: { mail: mail } });
        });
    }
    static cargarConsumo(body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield ModeloUsuarioReceta_1.default.findOne({ where: { mail: body.mail + "@gmail.com", recetaId: body.idReceta } })) {
                let consumoActual = yield ModeloUsuarioReceta_1.default.findOne({ where: { mail: body.mail + "@gmail.com", recetaId: body.idReceta } });
                consumoActual.cantidad = consumoActual.cantidad + 1;
                yield ModeloUsuarioReceta_1.default.update({ cantidad: consumoActual.cantidad }, { where: { mail: body.mail + "@gmail.com", recetaId: body.idReceta } });
            }
            else {
                ModeloUsuarioReceta_1.default.create({ recetaId: body.idReceta, mail: body.mail + "@gmail.com", cantidad: 1 });
            }
        });
    }
    static eliminarConsumo(mail, idReceta) {
        return __awaiter(this, void 0, void 0, function* () {
            const consumo = yield ModeloUsuarioReceta_1.default.findOne({ where: { mail: mail + "@gmail.com", recetaId: idReceta } });
            if (consumo) {
                if (consumo.cantidad > 1) {
                    consumo.cantidad = consumo.cantidad - 1;
                    yield ModeloUsuarioReceta_1.default.update({ cantidad: consumo.cantidad }, { where: { mail: mail + "@gmail.com", recetaId: idReceta } });
                }
                else {
                    yield ModeloUsuarioReceta_1.default.destroy({ where: { mail: mail + "@gmail.com", recetaId: idReceta } });
                }
            }
        });
    }
    static consumoUsuario(mail) {
        return __awaiter(this, void 0, void 0, function* () {
            mail = mail + "@gmail.com";
            let consumos = [];
            let cantidades = [];
            const respConsumo = yield ModeloUsuarioReceta_1.default.findAll({ where: { mail: mail } });
            for (let i = 0; i < respConsumo.length; i++) {
                consumos.push(respConsumo[i].recetaId);
                cantidades.push(respConsumo[i].cantidad);
            }
            let recetasData = [];
            for (let i = 0; i < consumos.length; i++) {
                let infoReceta = yield ModeloReceta_1.default.findOne({ where: { id: consumos[i] } });
                if (infoReceta != null) {
                    recetasData[i] = { id: infoReceta.id, nombre: infoReceta.nombre, momentoDelDia: infoReceta.momentoDelDia, calorias: infoReceta.calorias, cantidad: cantidades[i] };
                }
            }
            return recetasData;
        });
    }
    static like(mail, recetaId) {
        return __awaiter(this, void 0, void 0, function* () {
            mail = mail + "@gmail.com";
            ModeloLike_1.default.create({ mail: mail, recetaId: recetaId });
            ModeloReceta_1.default.update({ cantLikes: sequelize_1.Sequelize.literal("cantLikes + 1") }, { where: { id: recetaId } });
        });
    }
    static isYaLikeada(mail, recetaId) {
        return __awaiter(this, void 0, void 0, function* () {
            mail = mail + "@gmail.com";
            const like = yield ModeloLike_1.default.findOne({ where: { mail: mail, recetaId: recetaId } });
            if (like != null) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    static borrarLike(mail, recetaId) {
        return __awaiter(this, void 0, void 0, function* () {
            mail = mail + "@gmail.com";
            ModeloLike_1.default.destroy({ where: { mail: mail, recetaId: recetaId } });
            ModeloReceta_1.default.update({ cantLikes: sequelize_1.Sequelize.literal("cantLikes - 1") }, { where: { id: recetaId } });
        });
    }
}
exports.controllerUsuario = controllerUsuario;
controllerUsuario.secretKey = "Ensaladardamal";
//# sourceMappingURL=controllerUsuario.js.map