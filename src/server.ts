import express, { Request, Response } from 'express';
import sequelize from './config/database';
import { loginRouter } from './routes/LogInRouter';
import { signUpRouter } from './routes/rutasSignUp';
import { recuperarContraseñaRouter } from './routes/rutasRecuperarContraseña';
import { ingredienteRouter } from './routes/rutasIngrediente';
import { checkLoginRouter } from './routes/CheckLogin';
import { RecetaRouter } from './routes/recetaRouter';
import { LibroRouter } from './routes/librosRouter';
import { consumoRouter } from './routes/ConsumoRouter';
import { usuarioRouter } from './routes/UsuarioRouter';

const app = express();

const PORT = process.env.PORT || 3000;

const Sequelize = require("sequelize");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use('/logIn', cors());
app.use("/logIn", loginRouter);

/*🪿🪿🪿🪿🪿🪿🪿🪿🪿🪿🪿🪿🪿🪿🪿🪿🪿*/

app.use('/checkLogIn', cors());
app.use("/checkLogIn", checkLoginRouter);

app.use("/signUp", cors())
app.use("/signUp", signUpRouter)

app.use("/recuperarPassword", cors())
app.use("/recuperarPassword", recuperarContraseñaRouter)

app.use("/ingrediente", cors())
app.use("/ingrediente", ingredienteRouter)

app.use("/receta", cors())
app.use("/receta", RecetaRouter)

app.use("/libro", cors())
app.use("/libro", LibroRouter)

app.use("/consumo", cors())
app.use("/consumo", consumoRouter)

app.use("/usuario", cors())
app.use("/usuario", usuarioRouter)

app.get('/', (req: Request, res: Response) => {

  res.send('Hello, TypeScript Express!');

});

(async () => {

  try {

    console.log("pre db")

    await sequelize.sync();

    console.log('Base de datos sincronizada');

    app.listen(PORT, () => {

      console.log(`Servidor corriendo en http://localhost:${PORT}`);

    });

  } catch (error) {

    console.error('Error conectando a la base de datos:', error);
    
  }
})();