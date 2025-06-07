import express, { Request, Response } from 'express';
import sequelize from './config/database';
 
import { loginRouter } from './routes/LogInRouter';
import { signUpRouter } from './routes/rutasSignUp';
import { recuperarContraseñaRouter } from './routes/rutasRecuperarContraseña';
import { ingredienteRouter } from './routes/rutasIngrediente';

const app = express();
const PORT = process.env.PORT || 3000;



const Sequelize = require("sequelize");
const cors = require("cors");

app.use(express.json());

app.use("/logIn", loginRouter);
app.use('/logIn', cors());

app.use("/signUp", cors())
app.use("/signUp", signUpRouter)

app.use("/recuperarPassword", cors())
app.use("/recuperarPassword", recuperarContraseñaRouter)

app.use("/ingrediente", cors())
app.use("/ingrediente", ingredienteRouter)


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

(async () => {
  try {
    await sequelize.sync();
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
  }
})();