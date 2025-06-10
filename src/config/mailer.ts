import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
 
dotenv.config();
 
const transporter = nodemailer.createTransport({
 
  service: 'gmail',
  auth: {
    user: "cookpioficial@gmail.com",
    pass: "bjskqrupdubvaglj",
  },
});

export const sendConfirmationEmail = async (to: string, token: string): Promise<void> => {
  const url = `http://localhost:3000/signUp/confirmar/${token}`;
  
  console.log(to)

  await transporter.sendMail({
    from: `"Cookpi" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Confirma tu cuenta',
    html: `
      <h3>¡Gracias por registrarte!</h3>
      <p>Haz clic en el siguiente enlace para confirmar tu cuenta:</p>
      <a href="${url}">${url}</a>
    `,
  });
};
 

export const sendPasswordResetEmail = async (to: string, token: string): Promise<void> => {
  const url = `http://localhost:4200/recuperarPassword/${token}`;
  
  console.log(to)

  await transporter.sendMail({
    from: `"Cookpi" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Recupera tu contraseña',
    html: `
      <h3>¿Olvidaste tu contraseña?</h3>
      <p>Haz clic en el siguiente enlace para establecer una nueva contraseña:</p>
      <a href="${url}">${url}</a>
    `,
  });
};