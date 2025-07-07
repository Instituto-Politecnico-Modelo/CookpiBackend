import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
 
dotenv.config();
 
const transporter = nodemailer.createTransport({
 
  service: 'gmail',

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.PASSWORDMAIL,
  },

});

export const sendConfirmationEmail = async (to: string, token: string): Promise<void> => {

  const url = `${process.env.URL}/signUp/confirmar/${token}`;
  
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

  const url = `${process.env.URLFRONT}/recuperarPassword/${token}`;
  
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