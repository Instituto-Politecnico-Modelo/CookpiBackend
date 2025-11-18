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
exports.sendPasswordResetEmail = exports.sendConfirmationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.PASSWORDMAIL,
    },
});
const sendConfirmationEmail = (to, token) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${process.env.URL}/signUp/confirmar/${token}`;
    console.log(to);
    yield transporter.sendMail({
        from: `"Cookpi" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Confirma tu cuenta',
        html: `
      <h3>¡Gracias por registrarte!</h3>
      <p>Haz clic en el siguiente enlace para confirmar tu cuenta:</p>
      <a href = "${url}">${url}</a>
    `,
    });
});
exports.sendConfirmationEmail = sendConfirmationEmail;
const sendPasswordResetEmail = (to, token) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${process.env.URLFRONT}/recuperarPassword/${token}`;
    console.log(to);
    yield transporter.sendMail({
        from: `"Cookpi" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Recupera tu contraseña',
        html: `
      <h3>¿Olvidaste tu contraseña?</h3>
      <p>Haz clic en el siguiente enlace para establecer una nueva contraseña:</p>
      <a href="${url}">${url}</a>
    `,
    });
});
exports.sendPasswordResetEmail = sendPasswordResetEmail;
//# sourceMappingURL=mailer.js.map